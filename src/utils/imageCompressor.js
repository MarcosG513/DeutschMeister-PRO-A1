/**
 * Compresor de imágenes 100% nativo en cliente (createImageBitmap + <canvas>),
 * 0 KB en dependencias externas, garantizando <= 768px y JPEG <= 512 KB base64.
 */

function loadBitmapFallback(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(fileOrBlob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err || new Error('No se pudo cargar la imagen seleccionada.'));
    };
    img.src = objectUrl;
  });
}

export async function compressImageFileToJpegBase64(
  fileOrBlob,
  { maxDimension = 768, quality = 0.76, maxBase64Bytes = 480_000 } = {}
) {
  if (!fileOrBlob) {
    throw new Error('Selecciona o toma primero una imagen.');
  }

  let source = null;
  let usedBitmap = false;
  try {
    if (typeof createImageBitmap === 'function') {
      source = await createImageBitmap(fileOrBlob);
      usedBitmap = true;
    } else {
      source = await loadBitmapFallback(fileOrBlob);
    }

    const srcWidth = source.width || source.naturalWidth || 768;
    const srcHeight = source.height || source.naturalHeight || 768;
    const scale = Math.min(1, maxDimension / Math.max(srcWidth, srcHeight, 1));
    const targetWidth = Math.max(1, Math.round(srcWidth * scale));
    const targetHeight = Math.max(1, Math.round(srcHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) {
      throw new Error('Contexto gráfico 2D no disponible.');
    }

    // Fondo blanco sólido para evitar transparencia negra en PNGs convertidos a JPEG
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

    const qualities = [Math.min(0.78, quality), 0.66, 0.54, 0.42];
    let bestDataUrl = '';
    for (const q of qualities) {
      bestDataUrl = canvas.toDataURL('image/jpeg', q);
      const rawB64 = bestDataUrl.split(',')[1] || '';
      if (rawB64.length <= maxBase64Bytes) {
        break;
      }
    }

    const base64 = bestDataUrl.split(',')[1] || '';
    if (!base64 || base64.length > 520_000) {
      throw new Error('La imagen sigue siendo demasiado pesada tras comprimirla. Prueba otra foto.');
    }

    return {
      dataUrl: bestDataUrl,
      base64,
      mimeType: 'image/jpeg',
      width: targetWidth,
      height: targetHeight,
      approxBytes: Math.round((base64.length * 3) / 4),
    };
  } finally {
    if (usedBitmap && source && typeof source.close === 'function') {
      try {
        source.close();
      } catch {
        // Cierre seguro de ImageBitmap
      }
    }
  }
}
