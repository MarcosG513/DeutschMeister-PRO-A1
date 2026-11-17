import { encodeSrsSafeId } from './srsMath';

/**
 * quizEngine.js - Motor de Evaluación Pedagógica A1 para DeutschMeister PRO
 * Genera preguntas balanceadas (Reto de Artículos, Hören a Ciegas, Bimodal y Cloze)
 * garantizando homogeneidad sintáctica en distractores y 0 ms de latencia.
 */

/**
 * Mezclado aleatorio estándar Fisher-Yates
 */
export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Clasifica una palabra en categorías gramaticales principales para distractores homogéneos
 */
export function getWordGrammaticalType(word) {
  if (!word) return 'general';
  const type = (word.type || '').toLowerCase();
  const de = (word.de || '').trim();

  if (type.includes('sust') || /^(der|die|das)\s+[a-zäöü]/i.test(de)) return 'noun';
  if (type.includes('verb') || type.includes('verbo')) return 'verb';
  if (type.includes('adj') || type.includes('adjetivo')) return 'adj';
  if (type.includes('número') || type.includes('numero') || type.includes('zahl') || type.includes('ordinal')) return 'number';
  if (type.includes('letra') || type.includes('alphabet')) return 'letter';
  if (type.includes('frase') || type.includes('pregunta') || type.includes('redemittel')) return 'phrase';
  return 'general';
}

/**
 * Detecta si una palabra es un sustantivo y extrae su artículo determinado (der, die, das) y raíz
 */
export function getNounArticle(word) {
  if (!word) return null;
  const de = (word.de || '').trim();
  const m = de.match(/^(der|die|das)\s+(.+)$/i);
  if (m) {
    return { article: m[1].toLowerCase(), root: m[2].trim() };
  }
  const type = word.type || '';
  if (type.includes('(Masc)')) return { article: 'der', root: de };
  if (type.includes('(Fem)')) return { article: 'die', root: de };
  if (type.includes('(Neut)')) return { article: 'das', root: de };
  if (type.includes('(Plural)')) return { article: 'die', root: de };
  return null;
}

/**
 * Selecciona distractores que pertenezcan a la misma categoría gramatical
 */
export function getHomogeneousDistractors(targetWord, pool = [], count = 3, key = 'es') {
  if (!targetWord || !pool || pool.length === 0) return [];
  const targetVal = (targetWord[key] || '').trim().toLowerCase();
  const targetType = getWordGrammaticalType(targetWord);

  // 1. Prioridad: Misma categoría gramatical
  let candidates = pool.filter(w => {
    const val = (w[key] || '').trim().toLowerCase();
    if (!val || val === targetVal) return false;
    return getWordGrammaticalType(w) === targetType;
  });

  // 2. Si no hay suficientes candidatos de la misma categoría, completar con el pool general
  if (candidates.length < count) {
    const generalCandidates = pool.filter(w => {
      const val = (w[key] || '').trim().toLowerCase();
      return val && val !== targetVal;
    });
    candidates = Array.from(new Set([...candidates, ...generalCandidates]));
  }

  const shuffled = shuffleArray(candidates);
  const selected = [];
  const seenValues = new Set([targetVal]);

  for (const c of shuffled) {
    const val = (c[key] || '').trim();
    const valLower = val.toLowerCase();
    if (val && !seenValues.has(valLower)) {
      seenValues.add(valLower);
      selected.push(val);
      if (selected.length >= count) break;
    }
  }

  return selected;
}

/**
 * Genera preguntas balanceadas para el nivel Goethe A1 cubriendo las 4 tipologías
 */
export function generateLocalQuizQuestions(wordsPool = [], count = 10, globalFallbackPool = []) {
  if (!Array.isArray(wordsPool) || wordsPool.length === 0) {
    wordsPool = globalFallbackPool;
  }
  if (!wordsPool || wordsPool.length === 0) return [];

  const effectivePool = wordsPool.length < 5 && globalFallbackPool.length >= 5 
    ? globalFallbackPool 
    : wordsPool;
  const distractorPool = globalFallbackPool.length > effectivePool.length 
    ? globalFallbackPool 
    : effectivePool;

  const shuffledWords = shuffleArray(effectivePool);
  const questions = [];

  // Distribución rotativa de modalidades pedagógicas
  const typesDistribution = ['artikel', 'hoeren', 'bimodal_de_es', 'bimodal_es_de', 'cloze'];

  let poolIdx = 0;
  for (let i = 0; i < count; i++) {
    const word = shuffledWords[poolIdx % shuffledWords.length];
    poolIdx++;

    const desiredType = typesDistribution[i % typesDistribution.length];
    let q = null;

    // 1. RETO DE ARTÍCULOS (der, die, das)
    if (desiredType === 'artikel') {
      const artInfo = getNounArticle(word);
      if (artInfo && ['der', 'die', 'das'].includes(artInfo.article)) {
        q = {
          id: `q_art_${i}_${Date.now()}`,
          type: 'artikel',
          questionText: artInfo.root,
          subText: `¿Cuál es el artículo determinado de "${word.es}"?`,
          targetWord: word,
          correctAnswer: artInfo.article,
          options: ['der', 'die', 'das'],
          explanation: `En alemán es "${word.de}" (${word.es}). Los sustantivos en ${
            artInfo.article === 'der' 
              ? 'masculino llevan el artículo azul "der"' 
              : artInfo.article === 'die' 
                ? 'femenino llevan el artículo rojo "die"' 
                : 'neutro llevan el artículo verde "das"'
          }.`,
          audioText: word.de,
          audioType: 'vocab'
        };
      }
    }

    // 2. CLOZE TEST EN CONTEXTO (Oración con hueco)
    if (!q && desiredType === 'cloze' && word.exampleSentenceDe && word.exampleSentenceDe.length > 5) {
      const deWord = (word.de || '').trim();
      const artInfo = getNounArticle(word);
      const rootWord = artInfo ? artInfo.root : deWord;
      
      const sent = word.exampleSentenceDe;
      const cleanRoot = rootWord.replace(/[\(\)]/g, '').trim();
      const regex = new RegExp(`\\b${cleanRoot}\\b`, 'i');

      if (cleanRoot.length >= 2 && regex.test(sent)) {
        const masked = sent.replace(regex, '_____');
        const rawDistractors = getHomogeneousDistractors(word, distractorPool, 3, 'de');
        const distractors = rawDistractors.map(d => {
          const a = getNounArticle({ de: d });
          return a ? a.root : d;
        }).filter(d => d.toLowerCase() !== cleanRoot.toLowerCase());

        q = {
          id: `q_cloze_${i}_${Date.now()}`,
          type: 'cloze',
          questionText: masked,
          subText: word.exampleSentenceEs ? `"${word.exampleSentenceEs}"` : 'Completa la oración con la palabra correcta:',
          targetWord: word,
          correctAnswer: cleanRoot,
          options: shuffleArray([cleanRoot, ...distractors.slice(0, 3)]),
          explanation: `Oración completa: "${word.exampleSentenceDe}" (${word.exampleSentenceEs || word.es}).`,
          audioText: word.exampleSentenceDe,
          audioType: 'sentence'
        };
      }
    }

    // 3. HÖREN A CIEGAS (Comprensión Auditiva con voz Charon)
    if (!q && (desiredType === 'hoeren' || desiredType === 'artikel')) {
      const distractors = getHomogeneousDistractors(word, distractorPool, 3, 'es');
      q = {
        id: `q_hoeren_${i}_${Date.now()}`,
        type: 'hoeren',
        questionText: '🎧 Escucha con atención',
        subText: 'Reproduciendo con voz oficial Charon. ¿Qué palabra escuchas?',
        targetWord: word,
        correctAnswer: word.es,
        options: shuffleArray([word.es, ...distractors]),
        explanation: `La palabra es "${word.de}" y significa "${word.es}". ${word.pron ? `Pronunciación: [${word.pron}].` : ''}`,
        audioText: word.de,
        audioType: 'vocab'
      };
    }

    // 4. PRODUCCIÓN ACTIVA (Español -> Alemán)
    if (!q && desiredType === 'bimodal_es_de') {
      const distractors = getHomogeneousDistractors(word, distractorPool, 3, 'de');
      q = {
        id: `q_es_de_${i}_${Date.now()}`,
        type: 'bimodal_es_de',
        questionText: word.es,
        subText: '¿Cómo se dice en alemán?',
        targetWord: word,
        correctAnswer: word.de,
        options: shuffleArray([word.de, ...distractors]),
        explanation: `"${word.es}" en alemán es "${word.de}". ${word.pron ? `[${word.pron}].` : ''}`,
        audioText: word.de,
        audioType: 'vocab'
      };
    }

    // 5. RECONOCIMIENTO PASIVO (Alemán -> Español - Garantizado)
    if (!q) {
      const distractors = getHomogeneousDistractors(word, distractorPool, 3, 'es');
      q = {
        id: `q_de_es_${i}_${Date.now()}`,
        type: 'bimodal_de_es',
        questionText: word.de,
        subText: 'Selecciona la traducción correcta al español:',
        targetWord: word,
        correctAnswer: word.es,
        options: shuffleArray([word.es, ...distractors]),
        explanation: `"${word.de}" significa "${word.es}".`,
        audioText: word.de,
        audioType: 'vocab'
      };
    }

    questions.push(q);
  }

  return questions;
}

/**
 * Prioriza tarjetas vencidas del mazo SRS antes de completar un quiz local.
 */
export function selectSrsPrioritizedPool(wordsPool = [], dueSrsCards = []) {
  if (!Array.isArray(dueSrsCards) || dueSrsCards.length === 0) {
    return wordsPool;
  }
  const byId = new Map();
  for (const w of wordsPool || []) {
    if (w?.de) {
      byId.set(encodeSrsSafeId(w.de), w);
    }
  }
  const prioritized = [];
  const seen = new Set();
  for (const card of dueSrsCards) {
    if (!card?.id) continue;
    const matched = byId.get(card.id);
    if (matched && !seen.has(card.id)) {
      prioritized.push(matched);
      seen.add(card.id);
    }
  }
  for (const w of wordsPool || []) {
    if (!w?.de) continue;
    const id = encodeSrsSafeId(w.de);
    if (!seen.has(id)) {
      prioritized.push(w);
      seen.add(id);
    }
  }
  return prioritized;
}

/**
 * Genera preguntas específicas a partir de tarjetas vencidas del mazo SRS (errores + vocabulario).
 */
export function generateSrsQuizQuestions(dueSrsCards = [], globalPool = [], count = 10) {
  if (!Array.isArray(dueSrsCards) || dueSrsCards.length === 0) return [];

  const byId = new Map();
  for (const w of globalPool || []) {
    if (w?.de) {
      byId.set(encodeSrsSafeId(w.de), w);
    }
  }

  const slice = dueSrsCards.slice(0, count);
  const questions = [];

  slice.forEach((card, idx) => {
    if (card.cardType === 'grammar_error') {
      const userAttempt = card.grammarErrorMeta?.userUtteranceDe || '';
      const explanation =
        card.grammarErrorMeta?.explanationEs ||
        card.translationEs ||
        'Refuerza esta estructura gramatical detectada en tu práctica.';
      const distractorsPool = (globalPool || [])
        .filter((w) => w?.exampleSentenceDe && w.exampleSentenceDe !== card.termDe)
        .slice(0, 20);
      const rawDist = shuffleArray(distractorsPool)
        .slice(0, 3)
        .map((w) => w.exampleSentenceDe);
      const fallbacks = [
        userAttempt && userAttempt !== card.termDe ? userAttempt : 'Ich habe das nicht gemacht heute.',
        'Er gehen heute nach Hause.',
        'Wir brauchen ein Kaffee bitte.',
      ];
      const uniqueDistractors = Array.from(
        new Set([...rawDist, ...fallbacks].filter((opt) => opt && opt !== card.termDe))
      ).slice(0, 3);

      questions.push({
        id: `q_srs_err_${idx}_${Date.now()}`,
        type: 'srs_error',
        srsCardId: card.id,
        questionText: userAttempt
          ? `Corrige: «${userAttempt}»`
          : 'Elige la frase correcta en alemán:',
        subText: card.grammarErrorMeta?.errorCategory
          ? `Repaso SRS · Error frecuente (${card.grammarErrorMeta.errorCategory})`
          : 'Repaso SRS de conversación',
        targetWord: { de: card.termDe, es: card.translationEs || explanation },
        correctAnswer: card.termDe,
        options: shuffleArray([card.termDe, ...uniqueDistractors]),
        explanation,
        audioText: card.audioDe || card.termDe,
        audioType: 'sentence',
      });
      return;
    }

    const matchedWord = byId.get(card.id) || {
      de: card.termDe,
      es: card.translationEs || 'Término capturado en sesión',
      type: 'Vocabulario SRS',
      exampleSentenceDe: card.audioDe || card.termDe,
    };

    const singleList = generateLocalQuizQuestions([matchedWord], 1, globalPool);
    if (singleList.length > 0) {
      questions.push({
        ...singleList[0],
        id: `q_srs_voc_${idx}_${Date.now()}`,
        srsCardId: card.id,
        subText: `Repaso SRS · ${singleList[0].subText || 'Vocabulario capturado'}`,
      });
    }
  });

  return questions;
}
