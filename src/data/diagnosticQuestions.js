/**
 * diagnosticQuestions.js — Mini-diagnóstico rápido A1–B1 (5 preguntas escaladas)
 * Puro ESM (sin dependencias de React/DOM/Firebase). Zero términos de tejado.
 */

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    targetLevel: 'A1',
    topicLabel: 'Posición V2 y conjugación',
    promptEs: 'Completa respetando la regla V2 del alemán:',
    promptDe: 'Heute ___ ich mit dem Bus nach Berlin.',
    options: ['fahre', 'fährt', 'fahren', 'gefahren'],
    correct: 'fahre',
    explanationEs: 'Tras «Heute» en Posición 1, el verbo conjugado para «ich» va en Posición 2: «fahre».',
  },
  {
    id: 'diag_2',
    targetLevel: 'A1',
    topicLabel: 'Acusativo masculino en Perfekt',
    promptEs: 'Elige el artículo correcto en objeto directo:',
    promptDe: 'Ich habe gestern ___ neuen Kollegen im Büro getroffen.',
    options: ['einen', 'ein', 'einem', 'einer'],
    correct: 'einen',
    explanationEs: '«treffen» rige Acusativo; en masculino singular «ein Kollege» pasa a «einen Kollegen».',
  },
  {
    id: 'diag_3',
    targetLevel: 'A2',
    topicLabel: 'Modal en Präteritum y subordinada',
    promptEs: 'Marca la forma pasada correcta al final de «weil»:',
    promptDe: 'Er konnte gestern nicht kommen, weil er lange arbeiten ___.',
    options: ['musste', 'müsste', 'muss', 'gemusst'],
    correct: 'musste',
    explanationEs: 'En Präteritum «müssen» pierde la diéresis («musste») y viaja al final tras «weil».',
  },
  {
    id: 'diag_4',
    targetLevel: 'A2',
    topicLabel: 'Verbo con preposición y wo(r)-',
    promptEs: 'Pregunta por una cosa/resolución con «warten auf»:',
    promptDe: '___ wartest du? — Auf den Bescheid vom Bürgeramt!',
    options: ['Worauf', 'Auf wen', 'Woauf', 'Für was'],
    correct: 'Worauf',
    explanationEs: 'Para cosas con «auf» (vocal) se intercala -r-: «wo + r + auf = Worauf».',
  },
  {
    id: 'diag_5',
    targetLevel: 'B1',
    topicLabel: 'Vorgangspassiv técnico indoor',
    promptEs: 'Completa la voz pasiva de proceso en presente:',
    promptDe: 'Der Zählerschrank ___ heute vom Elektriker im Keller geprüft.',
    options: ['wird', 'ist', 'hat', 'werde'],
    correct: 'wird',
    explanationEs: 'El Vorgangspassiv en presente se construye con «werden» conjugado («wird») + Partizip II.',
  },
];
