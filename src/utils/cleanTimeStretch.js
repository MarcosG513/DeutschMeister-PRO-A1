/**
 * Motor DSP de estiramiento temporal limpio (Time-Stretching sin alteración de tono)
 * basado en Web Audio API + Phase Vocoder con ventana Hann de 2048 muestras y 75 % de solapamiento.
 *
 * Elimina el efecto metálico / entrecortado del WSOLA nativo de Android WebView sobre WAVs de 24 kHz
 * al reproducir pronunciaciones, lecturas o cuentos a 0.75x.
 */

const FFT_SIZE = 2048;
const HALF_FFT = FFT_SIZE >> 1; // 1024
const HOP_ANALYSIS = 512; // 75 % de solapamiento (2048 / 4)
const TWO_PI = Math.PI * 2;
const DEFAULT_SAMPLE_RATE = 24000;
const MAX_LRU_ENTRIES = 40;

// Caché LRU en memoria (hasta 40 entradas indexadas por `${cacheKey}_0.75`)
const stretchedBlobCache = new Map();
// Registro de ObjectURLs producidos por el Phase Vocoder (ya vienen estirados -> playbackRate = 1.0)
const stretchedObjectUrls = new Set();

let sharedOfflineCtxSampleRate = 0;

// Tablas DSP precalculadas de forma perezosa (FFT Radix-2 + ventana Hann)
let dspTables = null;

function getDspTables() {
  if (dspTables) return dspTables;

  const hannWindow = new Float32Array(FFT_SIZE);
  for (let n = 0; n < FFT_SIZE; n++) {
    hannWindow[n] = 0.5 * (1 - Math.cos((TWO_PI * n) / FFT_SIZE));
  }

  const bitRev = new Uint16Array(FFT_SIZE);
  const bits = Math.log2(FFT_SIZE) | 0;
  for (let i = 0; i < FFT_SIZE; i++) {
    let x = i;
    let r = 0;
    for (let b = 0; b < bits; b++) {
      r = (r << 1) | (x & 1);
      x >>= 1;
    }
    bitRev[i] = r;
  }

  const cosTable = new Float32Array(HALF_FFT);
  const sinTable = new Float32Array(HALF_FFT);
  for (let i = 0; i < HALF_FFT; i++) {
    const angle = (-TWO_PI * i) / FFT_SIZE;
    cosTable[i] = Math.cos(angle);
    sinTable[i] = Math.sin(angle);
  }

  dspTables = { hannWindow, bitRev, cosTable, sinTable };
  return dspTables;
}

/**
 * FFT/IFFT iterativa Radix-2 Cooley-Tukey in-place de 2048 puntos.
 */
function runFftInPlace(re, im, inverse = false) {
  const { bitRev, cosTable, sinTable } = getDspTables();

  for (let i = 0; i < FFT_SIZE; i++) {
    const j = bitRev[i];
    if (i < j) {
      const tr = re[i];
      const ti = im[i];
      re[i] = re[j];
      im[i] = im[j];
      re[j] = tr;
      im[j] = ti;
    }
  }

  const invSign = inverse ? -1 : 1;

  for (let size = 2; size <= FFT_SIZE; size <<= 1) {
    const halfSize = size >> 1;
    const tableStep = FFT_SIZE / size;
    for (let start = 0; start < FFT_SIZE; start += size) {
      for (let k = 0, twIdx = 0; k < halfSize; k++, twIdx += tableStep) {
        const wr = cosTable[twIdx];
        const wi = invSign * sinTable[twIdx];
        const evenIdx = start + k;
        const oddIdx = evenIdx + halfSize;
        const tre = re[oddIdx] * wr - im[oddIdx] * wi;
        const tim = re[oddIdx] * wi + im[oddIdx] * wr;
        re[oddIdx] = re[evenIdx] - tre;
        im[oddIdx] = im[evenIdx] - tim;
        re[evenIdx] += tre;
        im[evenIdx] += tim;
      }
    }
  }

  if (inverse) {
    const scale = 1 / FFT_SIZE;
    for (let i = 0; i < FFT_SIZE; i++) {
      re[i] *= scale;
      im[i] *= scale;
    }
  }
}

function wrapPhase(phase) {
  return phase - TWO_PI * Math.round(phase / TWO_PI);
}

/**
 * Ejecuta el Phase Vocoder (FFT 2048, hopAnalysis = 512, hopSynthesis = Math.round(512 / speed))
 * con Identity Phase Locking (Laroche & Dolson) para preservar los armónicos de la voz Charon.
 *
 * @param {Float32Array} input
 * @param {number} speed
 * @returns {Promise<Float32Array>}
 */
export async function phaseVocoderStretchChannel(input, speed = 0.75) {
  if (!input || input.length === 0 || speed >= 0.98 || speed <= 0.1) {
    return input;
  }

  const { hannWindow } = getDspTables();
  const hopAnalysis = HOP_ANALYSIS;
  const hopSynthesis = Math.round(hopAnalysis / speed); // Para 0.75x => Math.round(512 / 0.75) = 683
  const stretchRatio = hopSynthesis / hopAnalysis;

  const padLeft = HALF_FFT; // 1024 muestras => alinea t_in=0 con t_out=0 manteniendo solapamiento completo
  const targetLen = Math.max(1, Math.round(input.length * stretchRatio));
  const paddedLen = padLeft + input.length + FFT_SIZE + hopAnalysis;

  const padded = new Float32Array(paddedLen);
  padded.set(input, padLeft);

  const numFrames = Math.floor((paddedLen - FFT_SIZE) / hopAnalysis) + 1;
  const outBufLen = (numFrames - 1) * hopSynthesis + FFT_SIZE + padLeft;
  const outAccum = new Float32Array(outBufLen);
  const normAccum = new Float32Array(outBufLen);

  const re = new Float32Array(FFT_SIZE);
  const im = new Float32Array(FFT_SIZE);
  const mag = new Float32Array(HALF_FFT + 1);
  const phase = new Float32Array(HALF_FFT + 1);
  const prevPhase = new Float32Array(HALF_FFT + 1);
  const synPhase = new Float32Array(HALF_FFT + 1);
  const trueFreq = new Float32Array(HALF_FFT + 1);
  const peaks = new Int16Array(HALF_FFT + 1);

  const omegaStep = TWO_PI / FFT_SIZE;

  for (let frameIdx = 0; frameIdx < numFrames; frameIdx++) {
    const inPos = frameIdx * hopAnalysis;
    const outPos = frameIdx * hopSynthesis;

    // 1. Análisis con ventana Hann normalizada
    for (let n = 0; n < FFT_SIZE; n++) {
      re[n] = padded[inPos + n] * hannWindow[n];
      im[n] = 0;
    }

    runFftInPlace(re, im, false);

    // 2. Magnitud y fase de bins únicos [0 .. HALF_FFT]
    for (let k = 0; k <= HALF_FFT; k++) {
      const r = re[k];
      const ig = im[k];
      mag[k] = Math.hypot(r, ig);
      phase[k] = Math.atan2(ig, r);
    }

    if (frameIdx === 0) {
      synPhase.set(phase);
      prevPhase.set(phase);
    } else {
      // 3. Estimación de frecuencia instantánea por diferencia de fase
      for (let k = 0; k <= HALF_FFT; k++) {
        const expectedAdv = k * omegaStep * hopAnalysis;
        const delta = wrapPhase(phase[k] - prevPhase[k] - expectedAdv);
        trueFreq[k] = k * omegaStep + delta / hopAnalysis;
        prevPhase[k] = phase[k];
      }

      // 4. Identity Phase Locking: detecta picos espectrales locales y bloquea la fase de cada lóbulo
      let peakCount = 0;
      for (let k = 1; k < HALF_FFT; k++) {
        if (mag[k] >= mag[k - 1] && mag[k] >= mag[k + 1] && mag[k] > 1e-8) {
          peaks[peakCount++] = k;
        }
      }

      // DC y Nyquist propagan directamente
      synPhase[0] = wrapPhase(synPhase[0] + trueFreq[0] * hopSynthesis);
      synPhase[HALF_FFT] = wrapPhase(synPhase[HALF_FFT] + trueFreq[HALF_FFT] * hopSynthesis);

      if (peakCount === 0) {
        for (let k = 1; k < HALF_FFT; k++) {
          synPhase[k] = wrapPhase(synPhase[k] + trueFreq[k] * hopSynthesis);
        }
      } else {
        for (let pIdx = 0; pIdx < peakCount; pIdx++) {
          const p = peaks[pIdx];
          synPhase[p] = wrapPhase(synPhase[p] + trueFreq[p] * hopSynthesis);
        }

        let currentPeakIdx = 0;
        for (let k = 1; k < HALF_FFT; k++) {
          while (
            currentPeakIdx + 1 < peakCount &&
            Math.abs(peaks[currentPeakIdx + 1] - k) <= Math.abs(peaks[currentPeakIdx] - k)
          ) {
            currentPeakIdx++;
          }
          const nearestPeak = peaks[currentPeakIdx];
          if (k !== nearestPeak) {
            synPhase[k] = wrapPhase(synPhase[nearestPeak] + (phase[k] - phase[nearestPeak]));
          }
        }
      }
    }

    // 5. Reconstrucción de espectro hermítico (real en dominio temporal)
    re[0] = mag[0] * Math.cos(synPhase[0]);
    im[0] = 0;
    re[HALF_FFT] = mag[HALF_FFT] * Math.cos(synPhase[HALF_FFT]);
    im[HALF_FFT] = 0;

    for (let k = 1; k < HALF_FFT; k++) {
      const yr = mag[k] * Math.cos(synPhase[k]);
      const yi = mag[k] * Math.sin(synPhase[k]);
      re[k] = yr;
      im[k] = yi;
      re[FFT_SIZE - k] = yr;
      im[FFT_SIZE - k] = -yi;
    }

    runFftInPlace(re, im, true);

    // 6. Síntesis Overlap-Add (OLA) con ventana Hann cuadrada normalizada
    for (let n = 0; n < FFT_SIZE; n++) {
      const w = hannWindow[n];
      const idx = outPos + n;
      outAccum[idx] += re[n] * w;
      normAccum[idx] += w * w;
    }

    // Cede brevemente el hilo en audios extensos (cuentos) para no bloquear animaciones UI
    if (frameIdx > 0 && frameIdx % 450 === 0 && numFrames > 600) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  // 7. Extraer el rango exacto [padLeft .. padLeft + targetLen) normalizando por sum(w^2)
  const output = new Float32Array(targetLen);
  for (let i = 0; i < targetLen; i++) {
    const srcIdx = padLeft + i;
    const norm = srcIdx < normAccum.length ? normAccum[srcIdx] : 0;
    output[i] = norm > 1e-4 ? outAccum[srcIdx] / norm : 0;
  }

  return output;
}

/**
 * Codifica canales Float32Array a un Blob PCM WAV válido de 16-bit.
 * Conserva exactamente el sampleRate original (ej. 24000 Hz).
 */
export function encodeFloatChannelsToWavBlob(channels, sampleRate = DEFAULT_SAMPLE_RATE) {
  const numChannels = Math.max(1, channels.length);
  const length = channels[0].length;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = length * blockAlign;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // Tamaño PCM chunk
  view.setUint16(20, 1, true); // Formato PCM sin compresión
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let s = channels[ch][i];
      if (Number.isNaN(s)) s = 0;
      else if (s > 1) s = 1;
      else if (s < -1) s = -1;
      const int16 = s < 0 ? Math.round(s * 0x8000) : Math.round(s * 0x7fff);
      view.setInt16(offset, int16, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
}

/**
 * Inspecciona rápidamente la cabecera RIFF WAV para preservar el sampleRate real (24000 Hz).
 */
function detectWavSampleRate(arrayBuffer) {
  try {
    if (!arrayBuffer || arrayBuffer.byteLength < 44) return DEFAULT_SAMPLE_RATE;
    const view = new DataView(arrayBuffer);
    const riff =
      view.getUint8(0) === 0x52 && // 'R'
      view.getUint8(1) === 0x49 && // 'I'
      view.getUint8(2) === 0x46 && // 'F'
      view.getUint8(3) === 0x46;   // 'F'
    const wave =
      view.getUint8(8) === 0x57 &&  // 'W'
      view.getUint8(9) === 0x41 &&  // 'A'
      view.getUint8(10) === 0x56 && // 'V'
      view.getUint8(11) === 0x45;   // 'E'
    if (!riff || !wave) return DEFAULT_SAMPLE_RATE;
    const rate = view.getUint32(24, true);
    if (rate >= 8000 && rate <= 96000) return rate;
  } catch {
    return DEFAULT_SAMPLE_RATE;
  }
  return DEFAULT_SAMPLE_RATE;
}

/**
 * Decodificador directo de fallback para PCM WAV 16-bit cuando OfflineAudioContext no esté disponible.
 */
function tryDecodePcmWavDirect(arrayBuffer) {
  try {
    if (!arrayBuffer || arrayBuffer.byteLength < 44) return null;
    const view = new DataView(arrayBuffer);
    if (
      view.getUint8(0) !== 0x52 ||
      view.getUint8(1) !== 0x49 ||
      view.getUint8(2) !== 0x46 ||
      view.getUint8(3) !== 0x46 ||
      view.getUint8(8) !== 0x57 ||
      view.getUint8(9) !== 0x41 ||
      view.getUint8(10) !== 0x56 ||
      view.getUint8(11) !== 0x45
    ) {
      return null;
    }

    let offset = 12;
    let audioFormat = 1;
    let numChannels = 1;
    let sampleRate = DEFAULT_SAMPLE_RATE;
    let bitsPerSample = 16;
    let dataOffset = -1;
    let dataSize = 0;

    while (offset + 8 <= arrayBuffer.byteLength) {
      const id =
        String.fromCharCode(
          view.getUint8(offset),
          view.getUint8(offset + 1),
          view.getUint8(offset + 2),
          view.getUint8(offset + 3)
        );
      const chunkSize = view.getUint32(offset + 4, true);
      const chunkStart = offset + 8;

      if (id === "fmt " && chunkStart + 16 <= arrayBuffer.byteLength) {
        audioFormat = view.getUint16(chunkStart, true);
        numChannels = view.getUint16(chunkStart + 2, true);
        sampleRate = view.getUint32(chunkStart + 4, true);
        bitsPerSample = view.getUint16(chunkStart + 14, true);
      } else if (id === "data") {
        dataOffset = chunkStart;
        dataSize = Math.min(chunkSize, arrayBuffer.byteLength - chunkStart);
        break;
      }
      offset = chunkStart + chunkSize + (chunkSize % 2);
    }

    if (audioFormat !== 1 || bitsPerSample !== 16 || dataOffset < 0 || dataSize <= 0) {
      return null;
    }

    const totalFrames = Math.floor(dataSize / (numChannels * 2));
    const channels = Array.from({ length: numChannels }, () => new Float32Array(totalFrames));
    let ptr = dataOffset;
    for (let i = 0; i < totalFrames; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const s = view.getInt16(ptr, true);
        channels[ch][i] = s < 0 ? s / 0x8000 : s / 0x7fff;
        ptr += 2;
      }
    }
    return { sampleRate, channels };
  } catch {
    return null;
  }
}

function extractDecodedChannels(decoded, fallbackSampleRate) {
  const channels = [];
  for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
    channels.push(new Float32Array(decoded.getChannelData(ch)));
  }
  return {
    sampleRate: decoded.sampleRate || fallbackSampleRate,
    channels
  };
}

function createAudioContextForRate(AudioCtx, targetSampleRate) {
  try {
    return new AudioCtx({ sampleRate: targetSampleRate });
  } catch {
    return new AudioCtx();
  }
}

async function decodeBlobWithAudioContext(arrayBuffer) {
  const targetSampleRate = detectWavSampleRate(arrayBuffer);

  // Preferir OfflineAudioContext (sin tocar hardware de audio / Bluetooth ni agotar contextos WebView)
  const OfflineCtx =
    typeof window !== "undefined"
      ? window.OfflineAudioContext || window.webkitOfflineAudioContext
      : null;

  if (OfflineCtx) {
    try {
      const offlineCtx = new OfflineCtx(1, 1, targetSampleRate);
      sharedOfflineCtxSampleRate = offlineCtx.sampleRate;
      const decoded = await offlineCtx.decodeAudioData(arrayBuffer.slice(0));
      return extractDecodedChannels(decoded, sharedOfflineCtxSampleRate);
    } catch {
      // Continuar al fallback de AudioContext estándar o decodificador PCM directo
    }
  }

  const AudioCtx =
    typeof window !== "undefined" ? window.AudioContext || window.webkitAudioContext : null;

  if (AudioCtx) {
    const ctx = createAudioContextForRate(AudioCtx, targetSampleRate);
    try {
      const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));
      return extractDecodedChannels(decoded, targetSampleRate);
    } finally {
      if (ctx && typeof ctx.close === "function") {
        ctx.close().catch(() => {});
      }
    }
  }

  const pcmFallback = tryDecodePcmWavDirect(arrayBuffer);
  if (pcmFallback) return pcmFallback;

  throw new Error("Web Audio API no disponible para decodificar el audio.");
}

function computeFastBufferFingerprint(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.length;
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  const step = Math.max(1, Math.floor(len / 96));
  for (let i = 0; i < len; i += step) {
    h1 ^= bytes[i];
    h1 = Math.imul(h1, 0x01000193) >>> 0;
    h2 ^= bytes[len - 1 - i];
    h2 = Math.imul(h2, 0x85ebca6b) >>> 0;
  }
  return `blob_${len}_${h1.toString(16)}_${h2.toString(16)}`;
}

function readLruEntry(lruKey) {
  if (!lruKey || !stretchedBlobCache.has(lruKey)) return null;
  const entry = stretchedBlobCache.get(lruKey);
  stretchedBlobCache.delete(lruKey);
  stretchedBlobCache.set(lruKey, entry);
  return entry;
}

function writeLruEntry(lruKey, stretchedBlob) {
  if (!lruKey || !(stretchedBlob instanceof Blob)) return;
  if (stretchedBlobCache.has(lruKey)) {
    stretchedBlobCache.delete(lruKey);
  } else if (stretchedBlobCache.size >= MAX_LRU_ENTRIES) {
    const oldestKey = stretchedBlobCache.keys().next().value;
    if (oldestKey !== undefined) {
      stretchedBlobCache.delete(oldestKey);
    }
  }
  stretchedBlobCache.set(lruKey, { blob: stretchedBlob });
}

function registerStretchedObjectUrl(blob) {
  const objectUrl = URL.createObjectURL(blob);
  stretchedObjectUrls.add(objectUrl);
  return objectUrl;
}

/**
 * Permite consultar y liberar el tracking si un ObjectURL fue generado por el Phase Vocoder
 * (ya está estirado a velocidad 0.75x y debe reproducirse con audio.playbackRate = 1.0).
 */
export function isCleanStretchedUrl(url) {
  return typeof url === "string" && stretchedObjectUrls.has(url);
}

export function unregisterCleanStretchedUrl(url) {
  if (typeof url === "string") {
    stretchedObjectUrls.delete(url);
  }
}

/**
 * Resuelve URL de reproducción limpia y el playbackRate recomendado ({ url, playbackRate, stretched }).
 */
export async function getCleanSpeedAudioResult(sourceBlobOrUrl, speed = 1.0, cacheKey = null) {
  const numericSpeed = Number(speed) || 1.0;
  let sourceBlob = sourceBlobOrUrl instanceof Blob ? sourceBlobOrUrl : null;
  const explicitKey =
    typeof cacheKey === "string" && cacheKey.trim()
      ? cacheKey.trim()
      : typeof sourceBlobOrUrl === "string"
        ? sourceBlobOrUrl
        : "";

  // Velocidad natural 1.0x -> devolver ObjectURL directo sin alterar el WAV original
  if (numericSpeed >= 0.98) {
    if (sourceBlob) {
      return {
        url: URL.createObjectURL(sourceBlob),
        playbackRate: 1.0,
        stretched: false
      };
    }
    if (typeof sourceBlobOrUrl === "string" && sourceBlobOrUrl) {
      if (sourceBlobOrUrl.startsWith("blob:") || sourceBlobOrUrl.startsWith("data:")) {
        return { url: sourceBlobOrUrl, playbackRate: 1.0, stretched: false };
      }
      const resp = await fetch(sourceBlobOrUrl);
      if (resp.ok) {
        const blob = await resp.blob();
        return { url: URL.createObjectURL(blob), playbackRate: 1.0, stretched: false };
      }
      return { url: sourceBlobOrUrl, playbackRate: 1.0, stretched: false };
    }
    throw new Error("Fuente de audio inválida.");
  }

  // Velocidad didáctica 0.75x -> revisar LRU primero antes de decodificar
  const targetSpeed = Math.abs(numericSpeed - 0.75) < 0.05 ? 0.75 : numericSpeed;
  const initialLruKey = explicitKey ? `${explicitKey}_${targetSpeed}` : "";

  if (initialLruKey) {
    const cached = readLruEntry(initialLruKey);
    if (cached?.blob instanceof Blob) {
      return {
        url: registerStretchedObjectUrl(cached.blob),
        playbackRate: 1.0,
        stretched: true
      };
    }
  }

  try {
    if (!sourceBlob) {
      if (typeof sourceBlobOrUrl !== "string" || !sourceBlobOrUrl) {
        throw new Error("URL de audio vacía.");
      }
      const resp = await fetch(sourceBlobOrUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      sourceBlob = await resp.blob();
    }

    const arrayBuffer = await sourceBlob.arrayBuffer();
    const resolvedLruKey = initialLruKey || `${computeFastBufferFingerprint(arrayBuffer)}_${targetSpeed}`;

    if (!initialLruKey) {
      const cachedByFingerprint = readLruEntry(resolvedLruKey);
      if (cachedByFingerprint?.blob instanceof Blob) {
        return {
          url: registerStretchedObjectUrl(cachedByFingerprint.blob),
          playbackRate: 1.0,
          stretched: true
        };
      }
    }

    const { sampleRate, channels } = await decodeBlobWithAudioContext(arrayBuffer);
    const stretchedChannels = [];
    for (let ch = 0; ch < channels.length; ch++) {
      stretchedChannels.push(await phaseVocoderStretchChannel(channels[ch], targetSpeed));
    }

    const stretchedWavBlob = encodeFloatChannelsToWavBlob(stretchedChannels, sampleRate);
    writeLruEntry(resolvedLruKey, stretchedWavBlob);

    return {
      url: registerStretchedObjectUrl(stretchedWavBlob),
      playbackRate: 1.0,
      stretched: true
    };
  } catch (dspError) {
    // Fallback seguro en dispositivos antiguos: devuelve el ObjectURL original para reproducir con preservesPitch = true
    console.warn("[CleanTimeStretch Fallback] Usando playbackRate nativo:", dspError?.message || dspError);
    if (sourceBlob) {
      return {
        url: URL.createObjectURL(sourceBlob),
        playbackRate: targetSpeed,
        stretched: false
      };
    }
    return {
      url: typeof sourceBlobOrUrl === "string" ? sourceBlobOrUrl : "",
      playbackRate: targetSpeed,
      stretched: false
    };
  }
}

/**
 * Devuelve un ObjectURL con estiramiento temporal limpio a `speed` (0.75x o 1.0x).
 * En caso de fallo del procesador DSP, devuelve el ObjectURL original como fallback seguro.
 *
 * @param {Blob|string} sourceBlobOrUrl
 * @param {number} speed
 * @param {string|null} cacheKey
 * @returns {Promise<string>}
 */
export async function getCleanSpeedAudioUrl(sourceBlobOrUrl, speed = 1.0, cacheKey = null) {
  const result = await getCleanSpeedAudioResult(sourceBlobOrUrl, speed, cacheKey);
  return result.url;
}
