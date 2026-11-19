/**
 * Buffered Server-Sent Events (SSE) JSON stream reader.
 * Handles multi-chunk UTF-8/line boundaries, explicit server error frames,
 * and AbortSignal cancellation without swallowing stream corruption.
 */
export async function readSseJsonStream(response, { signal = null, onEvent, onParseError = null } = {}) {
  if (!response?.body) {
    throw new Error('La respuesta del servidor no contiene flujo de datos.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  const processLine = async (rawLine) => {
    const trimmed = rawLine.replace(/\r$/, '');
    if (!trimmed.startsWith('data: ')) return;
    const payload = trimmed.slice(6).trim();
    if (!payload || payload === '[DONE]') return;

    let parsed;
    try {
      parsed = JSON.parse(payload);
    } catch (err) {
      if (typeof onParseError === 'function') {
        onParseError(err, payload);
      }
      return;
    }

    if (parsed && typeof parsed.error === 'string' && parsed.error.trim()) {
      throw new Error(parsed.error);
    }
    if (parsed && parsed.error && typeof parsed.error?.message === 'string') {
      throw new Error(parsed.error.message);
    }

    if (typeof onEvent === 'function') {
      await onEvent(parsed);
    }
  };

  try {
    while (true) {
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (signal?.aborted) {
          throw new DOMException('Aborted', 'AbortError');
        }
        await processLine(line);
      }
    }

    buffer += decoder.decode();
    if (buffer.trim()) {
      for (const tailLine of buffer.split('\n')) {
        if (signal?.aborted) break;
        await processLine(tailLine);
      }
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      // Lector ya cerrado
    }
  }
}
