/**
 * pedagogicalToolEvaluators.js — Evaluadores puros y deterministas (ESM, sin DOM/React)
 * para detectar errores sintácticos específicos (A2–B1) y generar códigos SRS precisos.
 */

export function normalizeGermanComparison(raw = '') {
  return String(raw || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s+([,?.!])/g, '$1')
    .toLowerCase();
}

/**
 * Mezclado determinista puro (Fisher-Yates con LCG basado en semilla de cadena).
 * Evita usar Math.random() dentro de render o useMemo manteniendo variedad por ítem.
 */
export function deterministicShuffle(items = [], seedKey = '') {
  const arr = Array.isArray(items) ? [...items] : [];
  let hash = 2166136261;
  const seed = String(seedKey || 'dm_seed');
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (Math.imul(hash, 1664525) + 1013904223) >>> 0;
    const j = hash % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function stripPunctuationForCompare(raw = '') {
  return normalizeGermanComparison(raw).replace(/[,?.!;]/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Evalúa un intento en VerbPrepositionTrainer (prep_case o pronominal_adverb).
 *
 * @param {Object} item
 * @param {string} rawAttempt
 * @returns {{
 *   isCorrect: boolean,
 *   errorCode: string | null,
 *   feedbackEs: string,
 *   expectedPhrase: string,
 *   correctedSentenceDe: string,
 *   srsErrorCategory: string
 * }}
 */
export function evaluateVerbPrepositionAttempt(item, rawAttempt) {
  const attempt = String(rawAttempt || '').trim().replace(/\s+/g, ' ');
  const normAttempt = attempt.toLowerCase();

  if (!item || !attempt) {
    return {
      isCorrect: false,
      errorCode: 'empty_attempt',
      feedbackEs: 'Escribe o elige una respuesta antes de comprobar.',
      expectedPhrase: item?.expectedPhrase || '',
      correctedSentenceDe: item?.fullSentenceDe || '',
      srsErrorCategory: item?.srsErrorCategory || 'preposition',
    };
  }

  const validTargets = [item.expectedPhrase, ...(item.acceptedAnswers || [])]
    .filter(Boolean)
    .map((v) => String(v).trim().toLowerCase());

  if (validTargets.includes(normAttempt)) {
    return {
      isCorrect: true,
      errorCode: null,
      feedbackEs: item.explanationEs,
      expectedPhrase: item.expectedPhrase,
      correctedSentenceDe: item.fullSentenceDe,
      srsErrorCategory: item.srsErrorCategory || 'preposition',
    };
  }

  if (item.mode === 'pronominal_adverb') {
    const missingRVariants = ['daauf', 'woauf', 'daan', 'woan', 'daüber', 'woüber', 'daum', 'woum', 'daus', 'wous'];
    if (missingRVariants.some((v) => normAttempt === v)) {
      return {
        isCorrect: false,
        errorCode: 'missing_epenthetic_r',
        feedbackEs: `Falta la -r- intermedia ante vocal: usa «${item.expectedPhrase}». ${item.explanationEs}`,
        expectedPhrase: item.expectedPhrase,
        correctedSentenceDe: item.fullSentenceDe,
        srsErrorCategory: 'preposition',
      };
    }

    if (
      normAttempt.includes('wem') ||
      normAttempt.includes('wen') ||
      normAttempt.includes('was')
    ) {
      return {
        isCorrect: false,
        errorCode: 'wrong_person_vs_thing',
        feedbackEs: `Cuando nos referimos a cosas o conceptos se usa la forma compuesta «${item.expectedPhrase}», no un pronombre de persona o «was». ${item.explanationEs}`,
        expectedPhrase: item.expectedPhrase,
        correctedSentenceDe: item.fullSentenceDe,
        srsErrorCategory: 'preposition',
      };
    }

    return {
      isCorrect: false,
      errorCode: 'wrong_pronominal_adverb',
      feedbackEs: `Se esperaba «${item.expectedPhrase}». ${item.explanationEs}`,
      expectedPhrase: item.expectedPhrase,
      correctedSentenceDe: item.fullSentenceDe,
      srsErrorCategory: 'preposition',
    };
  }

  // Modo prep_case: comprobar si falló la preposición o el caso gramatical
  const expectedPrep = String(item.preposition || '').toLowerCase();
  const attemptTokens = normAttempt.split(' ');
  const firstToken = attemptTokens[0] || '';

  const contractedMatchMap = {
    am: 'an',
    im: 'in',
    vom: 'von',
    beim: 'bei',
    zum: 'zu',
    zur: 'zu',
    ans: 'an',
    ins: 'in',
  };
  const resolvedPrep = contractedMatchMap[firstToken] || firstToken;

  if (resolvedPrep !== expectedPrep) {
    return {
      isCorrect: false,
      errorCode: 'wrong_preposition',
      feedbackEs: `El verbo «${item.verb}» rige la preposición «${item.preposition}» (+ ${item.targetCase}), no «${firstToken}». Respuesta esperada: «${item.expectedPhrase}».`,
      expectedPhrase: item.expectedPhrase,
      correctedSentenceDe: item.fullSentenceDe,
      srsErrorCategory: 'preposition',
    };
  }

  return {
    isCorrect: false,
    errorCode: 'wrong_case_ending',
    feedbackEs: `La preposición «${item.preposition}» es correcta, pero aquí exige ${item.targetCase} («${item.expectedPhrase}»). ${item.explanationEs}`,
    expectedPhrase: item.expectedPhrase,
    correctedSentenceDe: item.fullSentenceDe,
    srsErrorCategory: 'case_error',
  };
}

/**
 * Evalúa un intento de transformación sintáctica (bloques o escritura libre).
 *
 * @param {Object} item
 * @param {string} rawAttempt
 * @returns {{
 *   isCorrect: boolean,
 *   errorCode: string | null,
 *   feedbackEs: string,
 *   correctedSentenceDe: string,
 *   srsErrorCategory: string
 * }}
 */
export function evaluateSyntaxTransformAttempt(item, rawAttempt) {
  const attempt = String(rawAttempt || '').trim().replace(/\s+/g, ' ');
  const normAttempt = normalizeGermanComparison(attempt);

  if (!item || !attempt) {
    return {
      isCorrect: false,
      errorCode: 'empty_attempt',
      feedbackEs: 'Construye o escribe la oración completa antes de validar.',
      correctedSentenceDe: item?.targetDe || '',
      srsErrorCategory: item?.srsErrorCategory || 'word_order',
    };
  }

  const validTargets = [item.targetDe, ...(item.altAcceptedDe || [])]
    .filter(Boolean)
    .map((t) => normalizeGermanComparison(t));

  if (validTargets.includes(normAttempt)) {
    return {
      isCorrect: true,
      errorCode: null,
      feedbackEs: `¡Excelente! ${item.hintVerbEs}`,
      correctedSentenceDe: item.targetDe,
      srsErrorCategory: item.srsErrorCategory || 'word_order',
    };
  }

  // 1. Verificar si únicamente falta la coma o punto final exacto
  const strippedAttempt = stripPunctuationForCompare(attempt);
  const strippedTargets = validTargets.map((t) => stripPunctuationForCompare(t));
  if (strippedTargets.includes(strippedAttempt)) {
    return {
      isCorrect: false,
      errorCode: 'missing_comma',
      feedbackEs: `Las palabras y el orden están bien, pero falta puntuación obligatoria (coma antes de «${item.connector}» o signo final). Forma correcta: «${item.targetDe}».`,
      correctedSentenceDe: item.targetDe,
      srsErrorCategory: 'punctuation',
    };
  }

  // 2. Modal Präteritum: error de diéresis o forma presente
  if (item.category === 'modal_praeteritum') {
    if (/(müss|könn|muss\b|kann\b)/i.test(attempt)) {
      return {
        isCorrect: false,
        errorCode: 'modal_umlaut_error',
        feedbackEs: `Recuerda: en Präteritum los verbos modales pierden la diéresis (${item.connector}). Forma correcta: «${item.targetDe}».`,
        correctedSentenceDe: item.targetDe,
        srsErrorCategory: 'modal_verb',
      };
    }
  }

  // 3. Voz pasiva: falta auxiliar 'wird'/'werden' o se usó 'ist'
  if (item.category === 'passive_voice') {
    if (!/\bwird\b/i.test(attempt)) {
      return {
        isCorrect: false,
        errorCode: 'missing_passive_aux',
        feedbackEs: `El Vorgangspassiv en presente se construye con «wird» + Partizip II al final (no «ist» ni sin auxiliar). Forma correcta: «${item.targetDe}».`,
        correctedSentenceDe: item.targetDe,
        srsErrorCategory: 'passive_voice',
      };
    }
  }

  // 4. Konjunktionaladverb (deshalb, trotzdem): falta inversión V2
  if (item.category === 'konjunktionaladverb') {
    const conn = String(item.connector || '').toLowerCase();
    const subjVerbAfterConn = new RegExp(`\\b${conn}\\s+(ich|du|er|sie|es|wir|ihr|sie)\\s+`, 'i');
    if (subjVerbAfterConn.test(attempt)) {
      return {
        isCorrect: false,
        errorCode: 'missing_v2_inversion',
        feedbackEs: `Tras «${item.connector}» en Posición 1 va inmediatamente el verbo conjugado, no el sujeto (${item.hintVerbEs}).`,
        correctedSentenceDe: item.targetDe,
        srsErrorCategory: 'word_order',
      };
    }
  }

  // 5. Subordinadas (weil, obwohl, damit) y preguntas indirectas (ob, wo)
  if (item.category === 'subordinate_clause' || item.category === 'indirect_question') {
    const conn = String(item.connector || '').toLowerCase();
    const subjVerbAfterConn = new RegExp(
      `\\b${conn}\\s+(?:ich|du|er|sie|es|wir|ihr|der\\s+bus|das\\s+bürgeramt|alles)\\s+(möchte|kommt|ist|regnet|funktioniert)\\b`,
      'i'
    );
    const verbSubjAfterConn = new RegExp(
      `\\b${conn}\\s+(ist|kommt|hat|kann|muss|wird|funktioniert|regnet)\\s+(?:ich|du|er|sie|es|wir|ihr|der\\s+bus|das\\s+bürgeramt|alles)\\b`,
      'i'
    );
    if (subjVerbAfterConn.test(attempt) || verbSubjAfterConn.test(attempt)) {
      return {
        isCorrect: false,
        errorCode: 'verb_not_final',
        feedbackEs: `Con «${item.connector}» el verbo conjugado debe enviarse al final absoluto de la oración (${item.hintVerbEs}).`,
        correctedSentenceDe: item.targetDe,
        srsErrorCategory: 'word_order',
      };
    }
  }

  // 6. Doble objeto (Dativ/Akkusativ)
  if (item.category === 'double_object') {
    return {
      isCorrect: false,
      errorCode: 'double_object_order',
      feedbackEs: `Revisa el orden Dativ/Akkusativ (${item.hintRuleEs}). Forma correcta: «${item.targetDe}».`,
      correctedSentenceDe: item.targetDe,
      srsErrorCategory: 'word_order',
    };
  }

  return {
    isCorrect: false,
    errorCode: 'word_order_mismatch',
    feedbackEs: `Revisa la estructura (${item.hintVerbEs}). Forma esperada: «${item.targetDe}».`,
    correctedSentenceDe: item.targetDe,
    srsErrorCategory: item.srsErrorCategory || 'word_order',
  };
}
