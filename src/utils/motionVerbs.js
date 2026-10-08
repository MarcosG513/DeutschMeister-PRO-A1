// src/utils/motionVerbs.js

/**
 * Catálogo exclusivo de verbos de locomoción espacial y mecánicas físicas ambiguas
 * donde el movimiento visual continuo es indispensable para el aprendizaje A1/A2.
 */
export const MOTION_AND_KINETIC_VERBS = new Set([
  // 1. Locomoción y desplazamiento espacial (Wo -> Wohin)
  "gehen", "laufen", "rennen", "springen", "steigen", "fallen",
  "fliegen", "schwimmen", "wandern", "fahren", "abbiegen",
  "aufstehen", "umsteigen", "einsteigen", "aussteigen", "mitkommen",

  // 2. Fuerzas dinámicas opuestas y física mecánica
  "ziehen", "drücken", "schieben", "werfen", "fangen",

  // 3. Conducción vehicular y maniobras
  "bremsen", "beschleunigen", "gas geben", "blinken", "abschleppen",

  // 4. Manipulación física manual de objetos
  "einpacken", "auspacken", "abtrocknen", "abgeben"
]);

/**
 * Evalúa si una palabra es un verbo estrictamente elegible para video cinético.
 * @param {Object} wordObj - Objeto lexical de chapters.jsx
 * @returns {boolean}
 */
export function isMotionVideoEligible(wordObj) {
  if (!wordObj || !wordObj.de) return false;

  // Debe ser gramaticalmente un verbo
  const type = (wordObj.type || "").toLowerCase();
  const isVerb = type.includes("verbo") || type.includes("verb");
  if (!isVerb) return false;

  // Limpieza de prefijos separables (ab|geben -> abgeben), reflexivos (sich beeilen -> beeilen) y espacios
  const cleanDe = wordObj.de
    .replace(/\|/g, "")
    .replace(/^sich\s+/i, "")
    .trim()
    .toLowerCase();

  // Verificación por coincidencia exacta o categoría explícita de movimiento
  return (
    MOTION_AND_KINETIC_VERBS.has(cleanDe) ||
    (wordObj.category && wordObj.category.toLowerCase() === "bewegung")
  );
}
