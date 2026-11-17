---
name: injecting-cefr-vocabulary
description: Parses, deduplicates via getSafeId and AST, and injects German A1-B1 vocabulary lists (Goethe, DTZ, technical solar/automotive manuals) into src/data/chapters.jsx, redemittelBegegnungen.js, and vocabulario_completo.json. Use whenever adding new German words, flashcards, or master tables.
---

# Injecting CEFR Vocabulary — DeutschMeister PRO

Esta skill automatiza la ingesta determinista, higienizada y libre de duplicados de nuevos lotes léxicos (Goethe A1/A2/B1, DTZ y manuales técnicos) dentro del currículo maestro de **DeutschMeister PRO**, garantizando compatibilidad absoluta con el caché multimedia de Firestore (`global_flashcards` / `global_audio_pronunciations`), las tarjetas SRS (`dm_srs_deck_v1`), los renderizadores React y `vocabulario_completo.json` (`init_db.js`).

---

## 1. Mapeo Canónico de Capítulos Vigentes (Base 1)

> **REGLA CRÍTICA DE IDs:** Todo script o subagente DEBE mapear por **título canónico y el `id` secuencial vigente (`1..18` + `22`)** inspeccionado por AST en `src/data/chapters.jsx` y `src/data/redemittelBegegnungen.js`. **NUNCA** uses los IDs históricos pre-reorden de documentos antiguos (`0, 14, 15, 13, 16`).

| `id` en código | Título Canónico | Destino en Código | Uso Principal |
|---:|---|---|---|
| `1` | `Kapitel 1: Alphabet & Zahlen` | `src/data/chapters.jsx` | Alfabeto, cifras, abreviaturas (`Abkürzungen`) |
| `2` | `Kapitel 2: Zeit & Datum` | `src/data/chapters.jsx` | Horarios, fechas, festivos (`Feiertage`, `Zeitangaben`) |
| `3` | `Kapitel 3: Personen & Kontakte` | `src/data/chapters.jsx` | Familia, países, idiomas, trámites personales |
| `4` | `Kapitel 4: Basisverben & Adjektive` | `src/data/chapters.jsx` | Verbos base, abstracciones y adjetivos clave |
| `5` | `Kapitel 5: Adverbien & Fragewörter` | `src/data/chapters.jsx` | Adverbios, partículas modales e interrogativos |
| `6` | `Kapitel 6: Grammatik: Konnektoren` | `src/data/chapters.jsx` | Conjunciones coordinantes y subordinantes |
| `7` | `Kapitel 7: Wohnen` | `src/data/chapters.jsx` | Vivienda, alquiler, hogar y mobiliario |
| `8` | `Kapitel 8: Essen & Trinken` | `src/data/chapters.jsx` | Alimentos, bebidas y gastronomía |
| `9` | `Kapitel 9: Kleidung` | `src/data/chapters.jsx` | Ropa y accesorios |
| `10` | `Kapitel 10: Einkaufen` | `src/data/chapters.jsx` | Compras, tiendas, consumo y dinero |
| `11` | `Kapitel 11: Freizeit` | `src/data/chapters.jsx` | Ocio, cultura, deportes, medios y mascotas |
| `12` | `Kapitel 12: Reisen & Verkehr` | `src/data/chapters.jsx` | Viajes, ciudad, clima y transporte general |
| `13` | `Kapitel 13: Fahrschuldeutsch: Auto` | `src/data/chapters.jsx` | Auto, tablero (`Dashboard`), luces y `Verkehrsregeln` |
| `14` | `Kapitel 14: Post & Bank` | `src/data/chapters.jsx` | Correo, banco, gestiones y telefonía |
| `15` | `Kapitel 15: Gesundheit` | `src/data/chapters.jsx` | Cuerpo humano (`Körperteile`), síntomas y médico |
| `16` | `Kapitel 16: Schule & Beruf` | `src/data/chapters.jsx` | Profesiones, trabajo, asignaturas (`Schulfächer`) y examen (`Prüfung`) |
| `17` | `Kapitel 17: Digitale Welt & IT` | `src/data/chapters.jsx` | Hardware, software, internet y comunicación digital |
| `18` | `Kapitel 18: Elektrotechnik & Solar` | `src/data/chapters.jsx` | Herramientas, electricidad y fotovoltaica (**solo indoor Enpal**) |
| `22` | `Kapitel 22: Redemittel & Alltagskommunikation` | `src/data/redemittelBegegnungen.js` | Bloques comunicativos y diálogo social/laboral (`isRedemittel: true`) |

*Capítulos fuera de inyección general salvo indicación explícita:* `id: 19` (*Pronomen & Deklinationen*), `id: 20` (*Werkzeuge & Material (Elektro & PV)*) e `id: 21` (*Verkehrszeichen & Vorschriften (StVO)*, único capítulo con `categoryFilter` estático). Sus palabras **sí** forman parte del índice global `getSafeId` para impedir colisiones entre capítulos.

---

## 2. Reglas Obligatorias de Esquema e Higiene

1. **Inmutabilidad de `w.de` existente y `getSafeId`:**
   - Jamás modificar `w.de` de entradas ya presentes en producción (`getSafeId = btoa(encodeURIComponent(de)).replace(/[/+=]/g, '_')` indexa imágenes, audios Charon y tarjetas estudiadas `dm_cards_studied`).
   - Todo elemento con colisión exacta `getSafeId` en cualquier capítulo (`K1–K22`) se omite automáticamente.
   - Si existe coincidencia de raíz en distinto capítulo con `getSafeId` distinto, validar si es homónimo genuino (p. ej. `das Mal` ≠ `mal`, `der Leiter / die Leiterin` ≠ `die Leiter`) antes de permitir inserción con `--allow-cross-homonyms`.
2. **Verbos separables y `PincerSwitch` (`|`) + `checkIsVerb`:**
   - Toda nueva entrada de verbo separable conserva `|` tras el prefijo en `de` (ej. `ab|lehnen`, `ein|parken`, `ab|stellen`) para activar `checkIsVerb` en `PresentationVocabCard.jsx` y mantener paridad visual con `PincerSwitch`.
3. **Género y colores en Tablas Maestras (`getTypeBadgeClass`):**
   - Sustantivos masculinos: `der ...` y `type: "Sustantivo (Masc)"` (azul).
   - Sustantivos femeninos: `die ...` y `type: "Sustantivo (Fem)"` (rojo).
   - Sustantivos neutros: `das ...` y `type: "Sustantivo (Neutro)"` (verde).
   - Verbos: `type: "Verbo ..."` (amarillo).
4. **Saneamiento de `category`, `level` y `plural`:**
   - **`category`**: Nombre de categoría limpio **sin** sufijos `/ A1`, `/ A2` ni `/ B1` (las píldoras de `K1–K18` se generan dinámicamente en `App.jsx`).
   - **`level`**: Nivel CEFR puro (`A1`, `A1–A2`, `A1–B1`, `A2`, `A2–B1`, `B1`), limpiando superíndices de notas al pie pegados (`B17` -> `B1`, `A218` -> `A2`, `A2–B110` -> `A2–B1`).
   - **`plural`**: **Sin** el prefijo `"Pl: "` (p. ej. `"die Anwälte"`, o cadena vacía `""` para invariables/singulares/no sustantivos), porque `PresentationVocabCard.jsx` antepone literalmente `Pl: `.
5. **Prompt Visual (`en`):**
   - Incluir `en` conciso **únicamente** en sustantivos concretos (objetos, lugares, edificios, vehículos, señales físicas, profesiones) o verbos de acción física dinámica.
   - **Omitir `en`** en términos abstractos, conectores, partículas modales, adverbios, abreviaturas y todo `Kapitel 22`.
6. **Bloques `exampleSentenceDeBlocks` y `audioDe`:**
   - **K1–K18:** Arreglo de objetos `{ text, role, order }` con `role` en `subject | verb_p1 | complement | verb_p2` y `order` consecutivo `1..N`, coherente con el orden alemán **V2 / *Satzklammer*** y que reconstruya `exampleSentenceDe`.
   - **K22 (`redemittelBegegnungen.js`):** Arreglo de cadenas (`string[]`) más campo `audioDe` con habla natural limpia para TTS Charon (sin barras `/`, sin guiones largos `—`, reemplazando `o.k.` -> `okay` y sin paréntesis mudos).
7. **Guardrail de Dominio Enpal (`Kapitel 18` y `Kapitel 20`):**
   - Escenarios estrictamente **indoor** (`Keller`, `Technikraum`, `Zählerschrank`, `Wechselrichter`, `Speicher`, `Wallbox`, `Smart Meter`, `5 VDE-Regeln`). Queda prohibido inyectar ejemplos de montaje en tejado (`Dachmontage`, `Solardach`, `auf dem Dach`).

---

## 3. Flujo CLI para Próximos Lotes (Goethe B1 / DTZ `2.500–3.000` palabras)

Este flujo procesa de forma incremental los bloques alfabéticos restantes (**`B, C, F, G, I, J, K, N–R, U–Z`**) desde archivos `.md`, `.csv` o `.json` generados por subagentes en lotes aislados:

1. **Auditar estado actual sin modificar archivos:**
   ```powershell
   node .agents/skills/injecting-cefr-vocabulary/scripts/dedupe_and_merge.js --audit-only
   ```
2. **Simulación (`--dry-run`) con reporte de colisiones y homónimos:**
   ```powershell
   node .agents/skills/injecting-cefr-vocabulary/scripts/dedupe_and_merge.js --input docs/lote_b1_dtz_b_c.md --dry-run --report-out scratch/lote_report.json
   ```
   - Inspecciona `skipped.crossChapterRoot` en el reporte para decidir si algún homónimo genuino merece re-ejecutarse marcado con `allowHomonym: true` (en JSON) o `--allow-cross-homonyms`.
3. **Inyección AST real + sincronización con `vocabulario_completo.json`:**
   ```powershell
   node .agents/skills/injecting-cefr-vocabulary/scripts/dedupe_and_merge.js --input docs/lote_b1_dtz_b_c.md
   ```
   - El script inserta mediante offsets AST inversos en `src/data/chapters.jsx` / `src/data/redemittelBegegnungen.js`, re-parsea ambos módulos en memoria con `@babel/parser` antes de guardar a disco y sincroniza `vocabulario_completo.json`.
4. **Verificación obligatoria post-inyección:**
   ```powershell
   npx.cmd eslint scripts/ src/data/redemittelBegegnungen.js
   node --test tests/srsMath.test.mjs tests/phase2Data.test.mjs tests/phase3Contracts.test.mjs
   npm.cmd run build
   ```
