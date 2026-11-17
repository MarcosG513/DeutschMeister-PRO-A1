/**
 * Normaliza cadenas en alemán para evaluación tolerante a signos, mayúsculas
 * y equivalencias opcionales sin deformar el texto mostrado al estudiante.
 */
export function normalizeGermanPhrase(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:"'„“«»()[\]]+/g, ' ')
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeWords(normalizedText) {
  if (!normalizedText) return [];
  return normalizedText.split(' ').filter(Boolean);
}

/**
 * Evalúa un ejercicio de Modo Frase comparando el intento ensamblado/hablado/escrito
 * contra `targetDe` y `acceptedVariants`, detectando palabras faltantes o fuera de orden.
 */
export function evaluatePhraseAttempt(attemptDe, drill) {
  const normAttempt = normalizeGermanPhrase(attemptDe);
  if (!normAttempt) {
    return {
      isCorrect: false,
      matchType: 'empty',
      score: 0,
      feedbackEs: 'Construye o dicta primero tu frase en alemán.',
      missingTokens: [],
    };
  }

  const candidates = Array.from(
    new Set([drill?.targetDe, ...(drill?.acceptedVariants || [])].filter(Boolean))
  ).map((c) => normalizeGermanPhrase(c));

  if (candidates.includes(normAttempt)) {
    return {
      isCorrect: true,
      matchType: 'exact',
      score: 100,
      feedbackEs: '¡Exacto! Estructura y orden alemán impecables.',
      missingTokens: [],
    };
  }

  const targetNorm = normalizeGermanPhrase(drill?.targetDe || '');
  const targetWords = tokenizeWords(targetNorm);
  const attemptWords = tokenizeWords(normAttempt);

  const missingTokens = targetWords.filter((w) => !attemptWords.includes(w));
  const extraOrDifferent = attemptWords.filter((w) => !targetWords.includes(w));

  // Si contiene exactamente las mismas palabras pero en orden distinto: pista específica de Satzklammer / V2
  if (missingTokens.length === 0 && extraOrDifferent.length === 0 && targetWords.length > 0) {
    return {
      isCorrect: false,
      matchType: 'word_order',
      score: 65,
      feedbackEs:
        'Las palabras son correctas, pero revisa la posición del verbo (V2) o envía el infinitivo/prefijo al final.',
      missingTokens: [],
    };
  }

  const overlapRatio =
    targetWords.length > 0
      ? (targetWords.length - missingTokens.length) / targetWords.length
      : 0;

  return {
    isCorrect: false,
    matchType: overlapRatio >= 0.6 ? 'close' : 'mismatch',
    score: Math.round(overlapRatio * 80),
    feedbackEs:
      missingTokens.length > 0
        ? `Revisa si falta algún elemento clave (${missingTokens.slice(0, 3).join(', ')}).`
        : 'Compara tu frase con el modelo oficial alemán y vuelve a intentarlo.',
    missingTokens,
  };
}

/**
 * Evalúa la respuesta de un turno en Modo Diálogo comparando con
 * `acceptedVariants`, `sampleReplyDe` y `requiredKeywords`.
 */
export function evaluateDialogueTurnAttempt(attemptDe, turn) {
  const normAttempt = normalizeGermanPhrase(attemptDe);
  if (!normAttempt) {
    return {
      isCorrect: false,
      score: 0,
      matchedKeywords: [],
      feedbackEs: 'Responde por voz o texto en alemán para validar este turno.',
    };
  }

  const variants = Array.from(
    new Set([turn?.sampleReplyDe, ...(turn?.acceptedVariants || [])].filter(Boolean))
  ).map((v) => normalizeGermanPhrase(v));

  if (variants.includes(normAttempt)) {
    return {
      isCorrect: true,
      score: 100,
      matchedKeywords: turn?.requiredKeywords || [],
      feedbackEs: '¡Respuesta perfecta y natural!',
    };
  }

  const attemptTokens = tokenizeWords(normAttempt);
  const requiredKeywords = (turn?.requiredKeywords || []).map((k) =>
    normalizeGermanPhrase(k)
  );
  const matchedKeywords = requiredKeywords.filter((kw) =>
    normAttempt.includes(kw) || attemptTokens.includes(kw)
  );

  // Con al menos 1-2 palabras clave del contexto y estructura mínima válida (>= 2 palabras)
  if (matchedKeywords.length >= 2 || (requiredKeywords.length === 1 && matchedKeywords.length === 1 && attemptTokens.length >= 2)) {
    return {
      isCorrect: true,
      score: 90,
      matchedKeywords,
      feedbackEs: '¡Muy bien! Has usado las palabras clave esperadas para responder con éxito.',
    };
  }

  if (matchedKeywords.length === 1 && attemptTokens.length >= 3) {
    return {
      isCorrect: true,
      score: 80,
      matchedKeywords,
      feedbackEs: `¡Bien comunicado! También puedes afinar con: „${turn?.sampleReplyDe}“`,
    };
  }

  return {
    isCorrect: false,
    score: 35,
    matchedKeywords,
    feedbackEs:
      turn?.hintEs ||
      `Intenta incluir términos clave como: ${(turn?.requiredKeywords || []).slice(0, 3).join(', ')}.`,
  };
}
