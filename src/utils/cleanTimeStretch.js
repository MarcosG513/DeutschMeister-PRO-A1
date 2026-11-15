/**
 * Motor DSP de estiramiento temporal limpio (Time-Stretching sin alteración de tono)
 * basado en WSOLA (Waveform Similarity Overlap-Add) calibrado para voz humana (Charon 24 kHz).
 *
 * Empalma cada ciclo glótico en fase mediante Correlación Cruzada Normalizada (NCC) en el dominio
 * del tiempo con ventana Hann simétrica al 50 %, eliminando el eco metálico del Phase Vocoder
 * y los artefactos de Android WebView a velocidad 0.75x.
 */

const TWO_PI = Math.PI * 2;
const DEFAULT_SAMPLE_RATE = 24000;
const MAX_LRU_ENTRIES = 40;

// Caché LRU en memoria (hasta 40 entradas indexadas por `${cacheKey}_0.75`)
const stretchedBlobCache = new Map();
// Registro de ObjectURLs producidos por el procesador WSOLA (ya vienen estirados -> playbackRate = 1.0)
const stretchedObjectUrls = new Set();

let sharedOfflineCtxSampleRate = 0;
let sharedUnlockAudioCtx = null;

/**
 * Desbloquea el motor Web Audio de WebKit/Safari iOS tras la primera interacción táctil o clic.
 */
export function unlockWebKitAudioContext() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedUnlockAudioCtx || sharedUnlockAudioCtx.state === "closed") {
      sharedUnlockAudioCtx = new AudioCtx();
    }
    if (sharedUnlockAudioCtx.state === "suspended") {
      sharedUnlockAudioCtx.resume().catch(() => {});
    }
    const buf = sharedUnlockAudioCtx.createBuffer(1, 1, 22050);
    const src = sharedUnlockAudioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(sharedUnlockAudioCtx.destination);
    src.start(0);
  } catch {
    // Ignorar en entornos sin Web Audio
  }
}

if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  const handleFirstGesture = () => {
    unlockWebKitAudioContext();
  };
  window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
  window.addEventListener("click", handleFirstGesture, { once: true, passive: true });
}

// Cache de ventanas Hann por tamaño de ventana para evitar recomputación
const hannWindowCache = new Map();

function getSymmetricHannWindow(winLen) {
  let win = hannWindowCache.get(winLen);
  if (win) return win;

  win = new Float32Array(winLen);
  for (let n = 0; n < winLen; n++) {
    win[n] = 0.5 * (1 - Math.cos((TWO_PI * n) / winLen));
  }
  hannWindowCache.set(winLen, win);
  return win;
}

/**
 * Estira un canal PCM en el dominio del tiempo mediante WSOLA calibrado para voz humana:
 * - Ventana de 24 ms (576 muestras a 24 kHz), hopOut = 50 % (288 muestras), COLA exacto = 1.0.
 * - Radio de búsqueda de 11 ms (264 muestras a 24 kHz) cubriendo ciclos glóticos de 90–400 Hz.
 * - Alineación de fase por Correlación Cruzada Normalizada (NCC) + normalización RMS suave.
 *
 * @param {Float32Array} samples
 * @param {number} sampleRate
 * @param {number} speed
 * @returns {Promise<Float32Array>}
 */
export async function wsolaSpeechStretch(samples, sampleRate = DEFAULT_SAMPLE_RATE, speed = 0.75) {
  if (!samples || samples.length === 0 || speed >= 0.98 || speed <= 0.1) {
    return samples;
  }

  const len = samples.length;
  const safeRate = sampleRate >= 8000 && sampleRate <= 96000 ? sampleRate : DEFAULT_SAMPLE_RATE;

  let winLen = Math.max(64, Math.round(safeRate * 0.024));
  if (winLen % 2 !== 0) winLen += 1; // Garantiza hopOut = winLen / 2 exacto (suma Hann = 1.0)

  if (len <= winLen) {
    return samples;
  }

  const hopOut = winLen >> 1; // 50 % de solapamiento (288 muestras a 24 kHz)
  const hopIn = Math.max(1, Math.round(hopOut * speed)); // Para 0.75x => 216 muestras
  const searchRadius = Math.max(16, Math.round(safeRate * 0.011)); // 11 ms => 264 muestras a 24 kHz
  const hann = getSymmetricHannWindow(winLen);

  const stretchRatio = hopOut / hopIn;
  const targetLen = Math.max(1, Math.round(len * stretchRatio));
  const numFrames = Math.max(1, Math.ceil((targetLen - winLen) / hopOut) + 1);
  const outputBuf = new Float32Array((numFrames - 1) * hopOut + winLen);

  // Frame 0: primera mitad sin atenuación de entrada, segunda mitad con cola Hann para solapar en frame 1
  for (let n = 0; n < hopOut; n++) {
    outputBuf[n] = samples[n];
  }
  for (let n = hopOut; n < winLen; n++) {
    outputBuf[n] = samples[n] * hann[n];
  }

  const maxStart = len - winLen;

  for (let k = 1; k < numFrames; k++) {
    const outPos = k * hopOut;
    const nominalIn = Math.min(maxStart, k * hopIn);

    const deltaMin = Math.max(-searchRadius, -nominalIn);
    const deltaMax = Math.min(searchRadius, maxStart - nominalIn);

    // Energía de la cola ya sintetizada en [outPos .. outPos + hopOut)
    let energyRef = 0;
    for (let n = 0; n < hopOut; n++) {
      const r = outputBuf[outPos + n];
      energyRef += r * r;
    }

    let bestDelta = 0;
    if (energyRef > 1e-8) {
      let bestScore = -Infinity;
      for (let delta = deltaMin; delta <= deltaMax; delta++) {
        const candStart = nominalIn + delta;
        let dot = 0;
        let energyCand = 0;
        for (let n = 0; n < hopOut; n++) {
          const r = outputBuf[outPos + n];
          const c = samples[candStart + n];
          dot += r * c;
          energyCand += c * c;
        }
        const score = dot / Math.sqrt(energyRef * energyCand + 1e-12);
        if (score > bestScore) {
          bestScore = score;
          bestDelta = delta;
        }
      }
    }

    const inPos = nominalIn + bestDelta;
    for (let n = 0; n < winLen; n++) {
      outputBuf[outPos + n] += samples[inPos + n] * hann[n];
    }

    if (k % 600 === 0 && numFrames > 800) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  // Conservación suave de RMS original + limitador blando en 0.98
  let sumSqIn = 0;
  for (let i = 0; i < len; i++) {
    const s = samples[i];
    sumSqIn += s * s;
  }
  const rmsIn = Math.sqrt(sumSqIn / len);

  let sumSqOut = 0;
  for (let i = 0; i < targetLen; i++) {
    const s = outputBuf[i];
    sumSqOut += s * s;
  }
  const rmsOut = Math.sqrt(sumSqOut / targetLen);

  const rmsGain =
    rmsIn > 1e-6 && rmsOut > 1e-6
      ? Math.min(1.35, Math.max(0.75, rmsIn / rmsOut))
      : 1.0;

  const finalOut = new Float32Array(targetLen);
  for (let i = 0; i < targetLen; i++) {
    let s = outputBuf[i] * rmsGain;
    const absS = Math.abs(s);
    if (absS > 0.98) {
      s = Math.sign(s) * (0.98 + 0.019 * Math.tanh((absS - 0.98) / 0.02));
    }
    finalOut[i] = s;
  }

  return finalOut;
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
      if (ctx.state === "suspended" && typeof ctx.resume === "function") {
        await ctx.resume().catch(() => {});
      }
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
      stretchedChannels.push(await wsolaSpeechStretch(channels[ch], sampleRate, targetSpeed));
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
