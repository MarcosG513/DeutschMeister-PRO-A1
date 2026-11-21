# DeutschMeister PRO A1–B1 (v3.1) — Reglas Canónicas de Arquitectura

> **Estado del Sistema:** Producción Activa v3.1 (`HEAD` `7a13840` en `main` — Evolución A1 → Puente A2/DTZ → B1 & Laboratorios SRS)  
> **Hosting / Despliegue Activo:** `https://deutschmeister-pro.web.app` (`firestore:rules`, 12 Cloud Functions v2, Hosting)  
> **Package / App ID:** `com.deutschmeister.app` (APK Release firmado: `DeutschMeister-PRO-A1-B1-v3.1-release.apk`, `11.92 MB`)  
> **Plataformas:** Web (Vite + React 19 PWA), Android (Capacitor 8 + Android Auto), Backend (Firebase Cloud Functions v2)

Este documento define la arquitectura canónica, las restricciones operativas y los guardrails obligatorios para cualquier agente de Antigravity o desarrollador trabajando en este repositorio. **Prohibido violar estas reglas para evitar regresiones críticas en producción.**

---

## 1. Identidad Android, Compilación y Firma Release

- **Identidad de la Aplicación:**
  - El `applicationId` y `namespace` canónico es **`com.deutschmeister.app`** en `android/app/build.gradle` y `capacitor.config.json` (nombre comercial corto `"Deutsch B1"`).
  - Versionado actual: `versionCode 3`, `versionName "3.0"` (artefacto Release v3.1 generado: `DeutschMeister-PRO-A1-B1-v3.1-release.apk`, `11.92 MB`).
- **Firma de Producción (Release Signing):**
  - Configurada en `android/app/build.gradle` leyendo `android/keystore.properties` y `android/app/deutschmeister-release.jks`.
  - **GUARDRAIL CRÍTICO DE SEGURIDAD:** Estos archivos están explícitamente ignorados en `.gitignore` (`*.jks`, `*.keystore`, `keystore.properties`). Está **ESTRICTAMENTE PROHIBIDO** eliminarlos, renombrarlos o subirlos al control de versiones (Git).
- **Servicios de Google:**
  - `android/app/google-services.json` enlaza la app Android con el proyecto Firebase de producción. Contiene las credenciales y huellas SHA-1/SHA-256 de depuración y producción.

---

## 2. Fahrmodus & Android Auto (Modo Conducción v2.0)

- **Currículo de 4 Olas (Highway Workout):**
  - Definido en `src/data/drivingAcademyCurriculum.js` y orquestado en `src/utils/highwayWorkoutBuilder.js` para sesiones de conducción prolongada (2-3 horas) con 100% Cache Hit en audio:
    1. **Ola 1 (Bloques y Reglas):** Presentación conceptual guiada, micro-tips gramaticales y encadenamiento sintáctico (*Chaining*).
    2. **Ola 2 (Repetición Espaciada Intra-Trayecto):** Algoritmo de refuerzo intercalado `+2` y `+5` posiciones atrás para consolidar la memoria de trabajo.
    3. **Ola 3 (Fuego Rápido sin Pistas):** Recuerdo activo rápido en orden alternado par/impar para quebrar la memorización secuencial.
    4. **Ola 4 (Simulación y Sellado):** Ping-Pong conversacional con diálogos interactivos y sellado final.
- **Teleprompter y Visualización en Vehículo:**
  - `android/app/src/main/java/com/deutschmeister/app/DeutschMeisterAutoService.java`: `MediaBrowserServiceCompat` nativo con soporte oficial para Android Auto.
  - Blindado contra `TransactionTooLargeException`: teleprompter generado dinámicamente en bitmap de 480x480 px (formato `RGB_565` = ~450 KB) con bloques de color semánticos por artículo (`der` azul, `die` rojo, `das` verde, `den` ámbar).
  - Manejo integral de excepciones con `try/catch(Throwable)` para evitar cuelgues o cierres inesperados en la consola del automóvil.
- **Bridge Capacitor & Cola SRS Manos Libres:**
  - `android/app/src/main/java/com/deutschmeister/app/AndroidAutoPlugin.java` y `src/services/androidAutoBridge.js` comunican en tiempo real los eventos de audio, saltos de frase y estado de la cola entre la pantalla del coche y la app React.
  - `buildSrsReviewWorkoutQueue` en `src/utils/highwayWorkoutBuilder.js` (y la ruta `Repaso SRS Vencido` en `src/components/DrivingMode.jsx`) permite repasar tarjetas vencidas y errores gramaticales del mazo SRS en modo manos libres.
- **Mutex de Audio & AbortSignal:**
  - Implementado en `src/services/aiAudioService.js` (`playGermanAudio` y `playAudioSource`):
  - Utiliza `latestPlaybackRequestId`, `AbortSignal` y cleanup callbacks para asegurar que al pausar, saltar de frase o salir del visor no queden llamadas fantasma, solapamientos ni fugas de memoria por `ObjectURL` huérfanos.

---

## 3. Frontend Modular & Experiencia de Usuario (UI/UX)

- **Configuración Centralizada de Firebase:**
  - Todo el SDK de Firebase (`app`, `auth`, `db`, `functions`, `appId`) se inicializa exclusivamente en `src/config/firebase.js`.
  - Queda prohibida la reinicialización duplicada en componentes; se debe importar directamente desde `src/config/firebase.js`.
- **Code-Splitting, Bundling Vite & Caché Offline PWA v3.1:**
  - Los componentes interactivos se importan mediante `React.lazy()` en `src/data/studyPlanModules.jsx` y `src/data/goetheModules.jsx`, y las vistas secundarias o modales (`Profile`, `DrivingMode`, `OnboardingModal`, `StoryModal`, `VerbPrepositionTrainer`, `SyntaxTransformLab`, `MicroPodcastPlayer`, `PhraseDialogueTrainer`, `RoleplaySimulator`, `ReadingComprehension`, `DynamicQuiz`, `PresentationViewer`, `TutorChat`) mediante `React.lazy()` + `<Suspense>` en `src/App.jsx` (montando `TutorChat`, `StoryModal` y `OnboardingModal` condicionalmente solo cuando están abiertos).
  - **Streaming SSE Unificado & Resiliencia Local:** `src/utils/sseStreamReader.js` (`readSseJsonStream`) centraliza el parseo SSE con `AbortController`, guardia de concurrencia `isChatLoadingRef.current` frente a ecos `onSnapshot`, sanitización de `deutschmeister_unlocked` (sin URLs `data:` ni `> 2048` chars) y aislamiento de caché (`resetLocalUserCaches`, `resetSrsLocalCache`) ante cambios de UID.
  - **Chunking (`vite.config.js`):** Separa `vendor-firebase`, `vendor-react`, `vendor-markdown`, `vendor-lucide`, `vendor-native-storage`, y divide los catálogos en `data-chapters-core` (`chaptersCore.jsx` K1–K10), `data-chapters-extended` (`chaptersExtended.jsx` K11–K21), `data-studyplan-curriculum` (`studyPlanModules.jsx` `20` módulos: `sp_1..sp_12` A1 + `sp_a2_1..sp_a2_4` A2 + `sp_13..sp_16` B1), `data-goethe-curriculum` (`goetheModules.jsx`), `data-stories-curriculum`, `data-redemittel-curriculum` y `data-driving-curriculum` (0 warnings de Vite `< 950 kB`, 0 warnings de importación dinámica), emitiendo `dist/precache-manifest.json`.
  - **Service Worker (`public/sw.js` `dm-pwa-v3.0` / `dm-assets-v3.0`):** Precachea `/precache-manifest.json` en instalación y sirve los chunks `/assets/*.js|css` con estrategia Cache-First para garantizar que todos los módulos lazy abran sin conexión (Modo Avión).
  - **Deduplicación IndexedDB & Packs Offline (`src/services/aiAudioService.js` + `src/services/syncMediaService.js`):** Almacena cada binario `Blob` de audio una sola vez en `audioStore` (`sha256Id`) y guarda punteros ligeros en `audioAliasStore`; `syncPodcastEpisodeOffline` (`podcastPackStore`) y `syncDialoguePackOffline` (`phrasePackStore`) cachean líneas curadas de catálogo sin escribir turnos efímeros en `global_audio_pronunciations`.
  - **GUARDRAIL:** Toda diapositiva o vista interactiva en `src/components/PresentationViewer.jsx` y `src/App.jsx` debe estar envuelta en un contenedor `<Suspense fallback={...}>` para evitar pantallas blancas durante la navegación.
- **Puente A2/DTZ, Laboratorios Gramaticales & Nuevos Modos Prácticos (v3.1):**
  - **Plan de Estudios de 20 Clases Magistrales (`src/data/studyPlanModules.jsx`):** `12` módulos A1 (`sp_1..sp_12`) → `4` módulos puente explícito A2/DTZ (`sp_a2_1` Verbos+Preposición & `da-/wo-`, `sp_a2_2` Preguntas indirectas & Modales en *Präteritum*, `sp_a2_3` Doble objeto Dativ/Akkusativ & conectores, `sp_a2_4` Trámites DTZ & comunicación técnica indoor) → `4` módulos B1 (`sp_13..sp_16`), cada uno con `cefrLevel`, `stageOrder`, `prerequisites` DAG acíclico y `recommendedChapters` (`1..22`).
  - **Laboratorios SRS (`VerbPrepositionTrainer.jsx` & `SyntaxTransformLab.jsx`):** Datos puros en `src/data/pedagogicalToolsData.js` (`18` ítems de rección/`da-`/`wo-` en `general`/`survival`/`work`, `12` transformaciones sintácticas en 6 categorías B1/A2) y evaluadores deterministas en `src/utils/pedagogicalToolEvaluators.js` (`deterministicShuffle`, detección precisa de `wrong_preposition`, `wrong_case_ending`, `missing_epenthetic_r`, `verb_not_final`, `missing_v2_inversion`, `missing_passive_aux`), capturando errores con `source: 'grammar_lab'` en `srsBridgeService.js`.
  - **Simulacros Goethe + Puente A2/DTZ:** `src/data/goetheModules.jsx` conserva los 4 IDs (`g_horen..g_sprechen`) añadiendo diapositivas puente A2/DTZ; `src/data/goetheWritingScenarios.js` expone `FORM_SCENARIOS` (`6` formularios: 1–4 A1 + 2 DTZ/A2 `buergeramt_anmeldung` y `hausarzt_au`), respetando `Bar` en Escenario 1.
  - **Datasets aislados por lazy chunk (`src/data/`):** `microPodcasts.js` (`6` episodios con marcas temporales monótonas, glosario y `3` preguntas de comprensión), `structuredDialogues.js` (`10` ejercicios *Satzklammer* para Modo Frase + `6` diálogos guiados de `3` turnos con variantes aceptadas) y `roleplayScenarios.js` (conectado a `RoleplaySimulator.jsx`, estrictamente indoor para entornos Enpal: `Keller`, `Technikraum`, `Zählerschrank`, `Wechselrichter`, `Speicher`, `Smart Meter`, `Wallbox`, `Duspol`, `5 VDE-Regeln`).
  - **Módulos Interactivos (Fase 2 y Fase 3):** `src/components/MicroPodcastPlayer.jsx` (karaoke sincronizado, WSOLA `0.75x/0.85x/1.0x`, descarga offline, glosario SRS y test de 3 preguntas con `recordSkillActivity('listening', ...)`), `src/components/PhraseDialogueTrainer.jsx` (pestañas accesibles Modo Frase + Modo Diálogo, evaluación determinista `src/utils/dialogueEval.js`, `useSpeechRecognition('de-DE')` tolerante a iOS PWA y guardado de reglas/vocabulario en SRS) y `src/components/StoryModal.jsx` (modal desacoplado para Cuentos IA con karaoke y WSOLA).
- **Modo Llamada Hands-Free (`initialMode="call"` en `RoleplaySimulator.jsx` + `src/components/chat/CallModeStage.jsx` + `src/hooks/useCallSpeechCapture.js`):**
  - Captura multiplataforma sin diálogo bloqueante en Android APK (`popup: false`, `partialResults: true`, debounce de silencio configurable `1200–2500 ms`), `WebSpeech` continuo en Desktop y fallback iOS Safari PWA standalone (`getUserMedia` + `AnalyserNode` RMS + `MediaRecorder` `audio/mp4`, liberando explícitamente cada pista con `track.stop()` antes de pasar turno a audio).
  - Un único `HTMLAudioElement` pre-calentado dentro del gesto de usuario (*Iniciar Llamada*, `createPrewarmedCallAudioElement`, `playsInline=true`), bloqueo strict *half-duplex*, guardia anti-eco de `300 ms` e interrupción (*barge-in*) al tocar el avatar OLED.
  - Los turnos efímeros se sintetizan vía `playTextOnPrewarmedAudio` -> `synthesizeGermanSpeech({ ephemeral: true })` (devolviendo `audioBase64` inline sin escribir nunca turnos de llamada en `global_audio_pronunciations` ni en `audioStore`) y el botón rojo **«Colgar y Evaluar»** abre `SessionDiagnosticCard` -> `srsBridgeService.js`.
- **Modo Foto Multimodal (`initialMode="photo"` en `TutorChat.jsx` + `src/components/chat/PhotoPracticePanel.jsx` + `src/utils/imageCompressor.js`):**
  - Compresión 100 % nativa en cliente (`createImageBitmap` + `<canvas>`, `<= 768px` JPEG calidad `<= 0.78`, `0 KB` de dependencias externas), descripción oral o escrita en alemán, evaluación multimodal y captura de 1 toque de `sceneVocabulary[]` y errores hacia `srsBridgeService.js`.
- **Viewport Móvil y Teclados Virtuales (Capacitor & Web):**
  - Los contenedores principales (`EmailSimulator.jsx`, `RoleplaySimulator.jsx`, `DynamicQuiz.jsx`, `PresentationViewer.jsx`, `DrivingMode.jsx`) deben emplear `min-h-[100dvh]` y manejar `onFocus` con `scrollIntoView({ behavior: 'smooth', block: 'center' })` para que los teclados virtuales de Android no ocluyan los campos de texto ni causen saltos de layout.
- **Integridad, Telemetría Real (4 Habilidades + Racha) y Puente SRS (`src/services/srsBridgeService.js`):**
  - Las operaciones de progreso del usuario en `src/utils/helpers.js` (`recordDailyStudyActivity`, `recordSkillActivity`, `getStreakSummary`, `getSkillProgressSummary`, `syncPedagogyProgressFromCloud`) se ejecutan mediante colas y locks atómicos sobre `localforage`, disparándose únicamente ante acciones reales de estudio (nunca por navegación pasiva) y sincronizando `/artifacts/{appId}/users/{uid}/pedagogy/progress` (`studyDates`, `todayActionsCount`, `skillPoints`).
  - El **Puente Conversación → SRS** (`src/utils/srsMath.js` + `src/services/srsBridgeService.js`) aplica SM-2 ligero sobre vocabulario y errores gramaticales capturados desde `TutorChat.jsx`, `RoleplaySimulator.jsx` (`Modo Frase` / `Roleplay`) y `DynamicQuiz.jsx` mediante componentes compartidos en `src/components/chat/` (`SuggestionBar`, `ConversationThread`, `ComposerBar`, `SessionDiagnosticCard`), persistiendo en `localforage` (`dm_srs_deck_v1`) y sincronizando la subcolección `/artifacts/{appId}/users/{uid}/srsCards/{cardId}`.
  - La clave de consulta para audios e imágenes en `global_flashcards` depende del campo exacto `w.de`. **NUNCA** modificar los textos en alemán de `src/data/chapters.jsx` agregando sufijos entre paréntesis (`die Maus (PC)`), ya que invalida el almacenamiento multimedia existente.
- **Audio DSP (Voice-Tuned WSOLA para `0.75x`) y Selector de Velocidad Global:**
  - El estiramiento temporal limpio de voz en `src/utils/cleanTimeStretch.js` (`wsolaSpeechStretch`, `getCleanSpeedAudioResult`, `getCleanSpeedAudioUrl`) utiliza **WSOLA en el dominio del tiempo** calibrado para habla humana (ventana Hann simétrica de `24 ms`, solapamiento del `50 %` con `COLA = 1.0`, alineación por Correlación Cruzada Normalizada NCC en un radio de `±11 ms`), reemplazando al Phase Vocoder FFT para evitar eco metálico en voces graves a `0.75x`.
  - Mantiene caché LRU en memoria (`40` entradas) y fallback seguro a `playbackRate = 0.75` si el decodificador falla.
  - El selector global (`dm_voice_speed` en `localStorage`, sincronizado vía evento `dm-speed-changed`) opera estrictamente con **`0.75x` y `1.0x`** en `src/components/Profile.jsx`, `src/App.jsx` (Cuentos IA) y `src/components/ReadingComprehension.jsx` (Leselabor); nunca usar `playbackRate = 0.75` sobre un `ObjectURL` ya estirado por WSOLA (`isCleanStretchedUrl(...)` → `playbackRate = 1.0`).
- **Visor Multimedia y Soporte `blob:` / `.mp4` en Vista Ampliada (`fullscreenImage`):**
  - Los medios offline sincronizados desde `mediaBlobStore` (IndexedDB) generan URLs locales `blob:`.
  - El modal `fullscreenImage` en `src/App.jsx` (junto con el disparo de zoom desde `src/components/PresentationVocabCard.jsx`) valida explícitamente los prefijos `blob:`, `http`, `data:` y `/` antes de asumir base64 crudo (`data:image/jpeg;base64,...`), evitando corromper `blob:` URLs locales.
  - Cuando el recurso resuelto contiene `.mp4` o `data:video/`, el visor modal renderiza `<video autoPlay loop muted playsInline>` en lugar de `<img>`, y `App.jsx` difiere la revocación de `blob:` URLs activas en `fullscreenImageRef` hasta cerrar el modal.
- **Onboarding Guiado, Diagnóstico CEFR & Centro de Mando Progresivo (`OnboardingModal.jsx`, `learningPathEngine.js`, `HomeDashboard.jsx`):**
  - Vista de bienvenida predeterminada tras superar `AuthAccessGate` (`isHomeOpen = true` en `src/App.jsx`). En el primer acceso aprobado sin `dm_user_learning_profile` completado/saltado, abre `<OnboardingModal>` (`<dialog closedby="any">` accesible con fallback light-dismiss por `getBoundingClientRect()` para Safari y botón `"Saltar por ahora"`).
  - **Diagnóstico de 5 preguntas & Motor Puro (`src/data/diagnosticQuestions.js` + `src/utils/learningPathEngine.js`):** Evalúa umbrales `0–1 → A1`, `2–3 → A2`, `4–5 → B1`; sanitiza `dm_user_learning_profile` al contrato estricto de 7 claves (`startingLevel`, `goal`, `onboardingCompleted`, `skipped`, `diagnosticScore`, `recommendedLevel`, `updatedAt`); calcula `computeStageProgress` por `cefrLevel` (aislando prefijos ajenos `readle_*` / `g_schreiben_teil1`) y calcula `"Tu Siguiente Paso Recomendado"` (`getRecommendedNextStep` con autopromoción `A1 → A2 → B1` y prioridad SRS cuando `dueNow >= 5`, siempre con `locked: false`).
  - **Jerarquía WCAG & 4 Bloques (`HomeDashboard.jsx` + `Profile.jsx`):** Un único `<h1>` en `App.jsx`; secciones en `HomeDashboard.jsx` con `<h2>` y tarjetas con `<h3>`; pestañas WAI-ARIA (`role="tablist"` / `role="tabpanel"` sin WRAP y con indicador visual no solo por color); botones mínimos `44px`; badges CEFR dinámicos (`mod.cefrLevel`); tarjeta editable **"Mi Ruta y Diagnóstico CEFR"** en `Profile.jsx` (v3.1).
  - Cualquier navegación hacia capítulos, Plan de Estudios, Goethe, vistas especiales (`driving`, `reading`, `roleplay`, `verb_prep_lab`, `syntax_lab`, `quiz`, `profile`) o búsqueda global no vacía cierra `isHomeOpen(false)` y registra `dm_last_activity`; tanto el logo superior como la píldora `🏠 Inicio` (visible cuando `!isHomeOpen`), el acceso superior del Drawer y el botón Back de Android permiten volver a Inicio en 1 toque.
- **Inventario Curricular Consolidado A1–B1 & Contadores Dinámicos:**
  - `src/data/chapters.jsx` (`id: 1..21` tras mapeo canónico Base-1) integra **`2,532` entradas** (`2,338` en `K1–K19` + `194` en `K20–K21`), junto con **`155` bloques comunicativos** en `src/data/redemittelBegegnungen.js` (`id: 22`), alcanzando **`2,687` entradas curriculares totales** (`2,659` tarjetas únicas deduplicadas por `getSafeId` mediante `countUniqueVocabularyCards` en `src/utils/helpers.js`) y **`2,387` índices únicos** sincronizados en `vocabulario_completo.json`.
  - Corpus Markdown unificado en `docs/`: `vocabulario_diferencial_a1_b1.md`, `goethe_b1_dtz_lote_1_A_G.md`, `goethe_b1_dtz_lote_2_H_R.md` y `goethe_b1_dtz_lote_3_S_Z.md`.
  - Prohibido fijar denominadores estáticos (`1510`, `1538`, etc.) en componentes (`src/components/Profile.jsx`, `src/components/HomeDashboard.jsx`, `src/utils/helpers.js`): el total de tarjetas se resuelve dinámicamente mediante `countUniqueVocabularyCards(chapters)`.
  - Todo verbo separable añadido conserva `|` en `de` para `checkIsVerb` / `PincerSwitch`, `plural` se almacena sin prefijo `"Pl: "`, `level` CEFR libre de superíndices y los datos técnicos de `Kapitel 18`/`20` respetan estrictamente el entorno indoor de Enpal.
  - **Bóveda Multimedia en Producción (`Firestore CDN` + `Cloud Storage`):**
    - **Imágenes (`global_flashcards`):** `2,190` tarjetas con imagen en caché (`166 / 166` Goethe B1/DTZ en *Soft Matte Clay* completadas al `100 %`).
    - **Audios `Charon` (`global_audio_pronunciations` / `gs://deutschmeister-audio-vault`):** **`6,792 / 6,792` (`100.0 %` de cobertura, `0` pendientes)** — catálogo acústico completo para todas las prioridades (vocabulario, oraciones, clases, podcasts, diálogos y laboratorios A2/B1).
  - **Extractor de Audios & Cierre de Tarea Programada (`7a13840`):** `scripts/pregenerate_all_audios.mjs` extrae `VERB_PREPOSITION_ITEMS`, `SYNTAX_TRANSFORM_ITEMS` (`src/data/pedagogicalToolsData.js`) y todas las frases interactivas v3.1. Tras alcanzar `0` audios pendientes, la tarea recurrente `Charon_Audio_Vault_Pregeneration_0910_CET` (`10 9 * * *`) fue deshabilitada/eliminada en `.agents/schedules.json` (permanece únicamente `QA_Audit_Weekly_Drift_Check`).
  - **Invariantes Estrictos del Sistema:** Prohibido alterar los valores `w.de` existentes (rompe `global_flashcards`, `global_audio_pronunciations` y `dm_cards_studied`), prohibido introducir vocabulario outdoor/tejados en el dominio laboral Enpal, y mantener `GEMINI_PAID_KEY_2..4` fuera de `ALL_AI_SECRETS`.

---

## 4. Backend Serverless & Resiliencia de IA (`functions/`)

- **Funciones Cloud v2 Activas (12 endpoints):**
  1. `sendTutorChatMessage` (Tutor socrático en streaming SSE — `onRequest`, protegida con `assertApprovedUser`)
  2. `runRoleplaySimulator` (Simulador de roles A1/Llamada en streaming SSE con soporte multimodal opcional `audioBase64` iOS PWA — `onRequest`, protegida con `assertApprovedUser`)
  3. `evaluateEmail` (Evaluador de redacción oficial Goethe A1 — `onCall`, protegida con `assertApprovedUser`)
  4. `generateStory` (Generador de historias graduadas en streaming SSE — `onRequest`, protegida con `assertApprovedUser`)
  5. `generateDynamicQuiz` (Generador de evaluaciones dinámicas — `onCall`, protegida con `assertApprovedUser`)
  6. `generateReadingTest` (Comprensión lectora A1 — `onCall`, protegida con `assertApprovedUser`)
  7. `synthesizeGermanSpeech` (Síntesis Charon HD — soporta `ephemeral: true` devolviendo `audioBase64` inline sin escribir turnos efímeros en Storage ni `global_audio_pronunciations` — `onCall`, protegida con `assertApprovedUser`)
  8. `regenerateCardMedia` (Mantenimiento y regeneración de audios/imágenes — `onCall`, protegida con `assertApprovedUser`)
  9. `generateCardImage` (Generación de ilustraciones didácticas — `onCall`, protegida con `assertApprovedUser`)
  10. `verifyOrRequestAccess` (Gate Zero-Trust de auto-registro, validación contra `SUPER_ADMIN_EMAILS`/`authorized_emails` y sincronización de Custom Claims — `onCall`)
  11. `manageUserAccess` (Panel de administración: `list`, `approve`, `revoke`, `preauthorize`, `remove_preauth` — `onCall`, exclusiva para `role === "admin"` vía `assertAdminUser`)
  12. `analyzePhotoDescription` (Análisis visual multimodal A1–A2 — `onCall`, `await assertApprovedUser(request)` en la primera línea, validación de magic bytes JPEG/PNG/WebP `<= 512 KB`, saneamiento en memoria con `sharp` sin guardar fotos en Cloud Storage, cuota diaria transaccional FinOps `photoCount` en `usage/today` y respuesta estricta `PHOTO_ANALYSIS_SCHEMA`)
- **Autenticación y Guard Zero-Trust Obligatorio (`assertApprovedUser`):**
  - Toda Cloud Function de IA o medios ejecuta obligatoriamente `await assertApprovedUser(...)` (rechaza peticiones sin auth, rechaza sesiones anónimas `sign_in_provider === "anonymous"` y exige Custom Claim `approved === true`/`admin === true` o estado `status === "approved"` en `access_control/{uid}`, sincronizando claims en segundo plano).
  - Las escrituras en `global_flashcards` (`regenerateCardMedia` y `generateCardImage`) mantienen validación adicional de origen/rol (`isServerAuthorizedMediaWriter`: emulador, Vite dev local o admin aprobado).
- **Pool de API Keys & Circuit Breaker (Resiliencia Multi-Nivel):**
  - Implementado en `functions/services/geminiClient.js` con rotación entre 4 llaves Nivel 1 (`PAID_1` a `PAID_4`) y 2 gratuitas de respaldo (`FREE_1` a `FREE_2`).
  - **Cooldowns Diferenciados:**
    - Errores transitorios de concurrencia o saturación (`429 RPM`, `503 Overloaded`): cooldown de **60 segundos** (`60_000 ms`).
    - Cuota diaria agotada (`429 RPD`, `402 Insufficient Quota`): cooldown de **1 hora** (`3_600_000 ms`).
    - Si `gemini-3.8-flash` devuelve 429 en una llave, conmuta inmediatamente a `gemini-2.5-flash` en la misma llave antes de marcarla como inactiva.
- **Stream SSE & Aborto de Conexiones:**
  - Los endpoints de streaming (`sendTutorChatMessage`, `runRoleplaySimulator`, `generateStory`) escuchan `req.on("close")` para abortar la generación en el cliente LLM y liberar los buffers de memoria de Cloud Run.
- **Caché en Memoria de Prompts:**
  - Los prompts del sistema leídos desde Firestore se almacenan en un mapa en memoria con TTL de 5 minutos, reduciendo drásticamente las lecturas a la base de datos y la latencia.
- **REGLA DE ORO DE CONFIGURACIÓN (Evitar Error HTTP 400 en Cloud Run):**
  - Las llaves adicionales `GEMINI_PAID_KEY_2`, `GEMINI_PAID_KEY_3` y `GEMINI_PAID_KEY_4` se configuran mediante `functions/.env` y se leen vía `process.env`.
  - **PROHIBIDO** declararlas con `defineSecret` o agregarlas a `ALL_AI_SECRETS`, ya que causaría una colisión con Secret Manager que impide el despliegue de Cloud Functions con un error HTTP 400 Bad Request.

---

## 5. Seguridad Zero-Trust, Reglas Firestore (`firestore.rules`) & Approval Gate

- **Arquitectura Zero-Trust en 5 Capas:**
  1. **UI Gate (`src/components/AuthAccessGate.jsx` + `src/App.jsx`):** Eliminado por completo el inicio de sesión anónimo (`signInAnonymously`); sesiones anónimas previas se cierran automáticamente (`signOutUnified`). Ningún listener o consulta a catálogos/progreso en Firestore se ejecuta hasta que `accessStatus === "approved"`.
  2. **Flujo Compartido Google Sign-In Web/Android APK (`src/services/authService.js`):** Reutilizado por `AuthAccessGate.jsx` y `Profile.jsx`, conservando `@capacitor-firebase/authentication` (`signInWithGoogle` + `signInWithCredential`) en Android APK y `signInWithPopup` en Web/PWA.
  3. **Sala de Espera en Tiempo Real & Resiliencia Offline:** Listener `onSnapshot` sobre `access_control/{uid}` que refresca `user.getIdToken(true)` (y sincroniza claims vía `verifyOrRequestAccess`) al instante tras la aprobación/revocación. Caché local `dm_access_approved_${uid}` / `dm_access_role_${uid}` permite abrir la app en Modo Avión tras una aprobación previa, revalidando silenciosamente al recuperar red.
  4. **Panel de Administración Integrado (`src/components/AdminAccessPanel.jsx` en `Profile.jsx`):** Visible exclusivamente para `role === "admin"`, permite aprobar/rechazar solicitudes pendientes, revocar accesos (sin auto-revocación ni bloqueo de Super-Admins) y pre-autorizar correos antes del primer inicio de sesión.
  5. **Reglas de Seguridad (`firestore.rules`) & Custom Claims:**
     - **Cero acceso público o anónimo:** `isAuthenticated()` exige UID válido y `sign_in_provider != 'anonymous'`.
     - **Control de Acceso:** `access_control/{userId}` legible solo por el propietario o `isAdmin()` y escribible solo por `isAdmin()`/Admin SDK; `authorized_emails/{emailId}` accesible solo para `isAdmin()`/Admin SDK.
     - **Catálogos Globales (`global_flashcards`, `global_audio_pronunciations`, `global_stories`, `global_chapter_stories`, `global_podcasts`, `global_dialogs`):** Lectura estrictamente restringida a `isApprovedUser()` (claim `approved`/`admin` o `access_control/{uid}.status == 'approved'`); escritura bloqueada desde cliente (`allow write: if false`).
     - **Datos Privados (`/artifacts/{appId}/users/{userId}/**`):** Exige `isOwner(userId) && isApprovedUser()` con validación estricta de esquema por subcolección (`unlockedCards`, `chat`, `pedagogy` con `isValidLearningProfileMap(learningProfile)`, `srsCards` incluyendo `source: 'grammar_lab'`, `usage` solo lectura en cliente) y denegación por defecto (`match /{document=**} { allow read, write: if false; }`).
- **Bootstrap Seguro de Propietario / Super-Admin:**
  - `DEFAULT_SUPER_ADMIN_EMAILS` en `functions/index.js` y `scripts/bootstrap_access_control.mjs` garantizan la auto-aprobación con rol `admin` del propietario (`mgmogollon13@gmail.com`) y de las cuentas `google.com` existentes en el proyecto para evitar bloqueos al activar las reglas.

---

## 6. Agent Skills del Espacio de Trabajo (`.agents/skills/`)

- **`auditing-codebase-architecture` (`.agents/skills/auditing-codebase-architecture/`):** Guía integral de auditoría de arquitectura, rendimiento, seguridad Zero-Trust, resiliencia serverless, Android Auto y pedagogía.
- **`injecting-cefr-vocabulary` (`.agents/skills/injecting-cefr-vocabulary/`):** Pipeline determinista (`SKILL.md` + `scripts/dedupe_and_merge.js`) para parsear lotes Markdown/CSV/JSON (Goethe A1–B1, DTZ y manuales técnicos, cubriendo los bloques restantes `B, C, F, G, I, J, K, N–R, U–Z` hacia `2.500–3.000` entradas), deduplicar globalmente vía `getSafeId` y raíz léxica, validar reglas de esquema (`|`, `category`, `level`, `plural`, `en`, `exampleSentenceDeBlocks`, `audioDe`, guardrail Enpal indoor), e inyectar por AST en `src/data/chapters.jsx`, `src/data/redemittelBegegnungen.js` y `vocabulario_completo.json`.

---

## 7. Contratos QA Automatizados & Gates de Release (`tests/`, `npm test`, ESLint)

- **Ejecución Unificada (`npm test` → `node --test tests/*.test.mjs`):**
  - `tests/srsMath.test.mjs`, `tests/phase2Data.test.mjs`, `tests/phase3Contracts.test.mjs` (invariantes SRS, Fase 2/3, Fahrmodus, seguridad Cloud Functions).
  - `tests/studyPlanContracts.test.mjs`: Auditoría AST (`@babel/parser` + `@babel/traverse`) de las 20 Clases Magistrales (`sp_1..sp_12` → `sp_a2_1..sp_a2_4` → `sp_13..sp_16`), DAG acíclico de `prerequisites`, resolución real de todos los componentes JSX e imports `React.lazy`, cero términos de tejado, invariancia del corpus (`2,687` entradas / `2,387` índices) y paridad de esquema `helpers.js` ↔ `firestore.rules`.
  - `tests/learningPathEngine.test.mjs`: Validación del banco diagnóstico `diag_1..diag_5`, umbrales CEFR `A1/A2/B1`, sanitización estricta de `dm_user_learning_profile`, aislamiento de `readle_*` / `g_schreiben_teil1` y recomendación sin bloqueos (`locked: false`).
  - `tests/pedagogicalTools.test.mjs`: Validación determinista de los `18` ítems de `VerbPrepositionTrainer`, `12` ítems de `SyntaxTransformLab` y `6` formularios de `goetheWritingScenarios.js`.
- **Gates Obligatorios Pre-Merge:**
  - `npx eslint src/ tests/ functions/ vite.config.js` → `0` errores y `0` warnings.
  - `npm test` → `100 %` PASS (`0` skipped).
  - `node .agents/skills/injecting-cefr-vocabulary/scripts/dedupe_and_merge.js --audit-only` → `2,687` / `2,387`.
  - `npm run build` → `0` errores y `0` warnings de chunking (`< 950 kB`).
