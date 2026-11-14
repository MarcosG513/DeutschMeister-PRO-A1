# DeutschMeister PRO A1 (v2.0) — Reglas Canónicas de Arquitectura

> **Estado del Sistema:** Producción Estable v2.0  
> **Package / App ID:** `com.deutschmeister.app`  
> **Plataformas:** Web (Vite + React 19 PWA), Android (Capacitor 7 + Android Auto), Backend (Firebase Cloud Functions v2)

Este documento define la arquitectura canónica, las restricciones operativas y los guardrails obligatorios para cualquier agente de Antigravity o desarrollador trabajando en este repositorio. **Prohibido violar estas reglas para evitar regresiones críticas en producción.**

---

## 1. Identidad Android, Compilación y Firma Release

- **Identidad de la Aplicación:**
  - El `applicationId` y `namespace` canónico es **`com.deutschmeister.app`** en `android/app/build.gradle` y `capacitor.config.json`.
  - Versionado actual: `versionCode 2`, `versionName "2.0"`.
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
- **Bridge Capacitor:**
  - `android/app/src/main/java/com/deutschmeister/app/AndroidAutoPlugin.java` y `src/services/androidAutoBridge.js` comunican en tiempo real los eventos de audio, saltos de frase y estado de la cola entre la pantalla del coche y la app React.
- **Mutex de Audio & AbortSignal:**
  - Implementado en `src/services/aiAudioService.js` (`playGermanAudio` y `playAudioSource`):
  - Utiliza `latestPlaybackRequestId`, `AbortSignal` y cleanup callbacks para asegurar que al pausar, saltar de frase o salir del visor no queden llamadas fantasma, solapamientos ni fugas de memoria por `ObjectURL` huérfanos.

---

## 3. Frontend Modular & Experiencia de Usuario (UI/UX)

- **Configuración Centralizada de Firebase:**
  - Todo el SDK de Firebase (`app`, `auth`, `db`, `functions`, `appId`) se inicializa exclusivamente en `src/config/firebase.js`.
  - Queda prohibida la reinicialización duplicada en componentes; se debe importar directamente desde `src/config/firebase.js`.
- **Code-Splitting y Carga Perezosa (Lazy Loading):**
  - Los 21 componentes de exámenes y módulos interactivos (`OfficialFormExam`, `VoiceExaminer`, `GoetheHorenExam`, `GoetheLesenExam`, `GoetheWritingForm`, `GoetheSprechenExam`, `DraggableSentenceBuilder`, `LiveEvaluator`, `AcousticRadar`, etc.) se importan mediante `React.lazy()` en la cabecera de `src/data/chapters.jsx`.
  - **GUARDRAIL:** Toda diapositiva o vista interactiva en `src/components/PresentationViewer.jsx` debe estar envuelta en un contenedor `<Suspense fallback={...}>` para evitar pantallas blancas durante la navegación.
- **Viewport Móvil y Teclados Virtuales (Capacitor & Web):**
  - Los contenedores principales (`EmailSimulator.jsx`, `RoleplaySimulator.jsx`, `DynamicQuiz.jsx`, `PresentationViewer.jsx`, `DrivingMode.jsx`) deben emplear `min-h-[100dvh]` y manejar `onFocus` con `scrollIntoView({ behavior: 'smooth', block: 'center' })` para que los teclados virtuales de Android no ocluyan los campos de texto ni causen saltos de layout.
- **Integridad y Serialización de Métricas Pedagógicas:**
  - Las operaciones de progreso del usuario en `src/utils/helpers.js` (`recordPedagogyProgress`, `loadPedagogyProgress`, `getDailyStreak`, `incrementCardsStudied`) se ejecutan mediante colas y locks atómicos sobre `localforage`.
  - Se sincronizan automáticamente con Firestore en la colección canónica:
    `/artifacts/{appId}/users/{uid}/pedagogy/progress`
  - La clave de consulta para audios e imágenes en `global_flashcards` depende del campo exacto `w.de`. **NUNCA** modificar los textos en alemán de `src/data/chapters.jsx` agregando sufijos entre paréntesis (`die Maus (PC)`), ya que invalida el almacenamiento multimedia existente.

---

## 4. Backend Serverless & Resiliencia de IA (`functions/`)

- **Funciones Cloud v2 Activas (9 endpoints):**
  1. `sendTutorChatMessage` (Tutor socrático en streaming SSE)
  2. `runRoleplaySimulator` (Simulador de roles A1 en streaming SSE)
  3. `evaluateEmail` (Evaluador de redacción oficial Goethe A1)
  4. `generateStory` (Generador de historias graduadas en streaming SSE)
  5. `generateDynamicQuiz` (Generador de evaluaciones dinámicas)
  6. `generateReadingTest` (Comprensión lectora A1)
  7. `synthesizeGermanSpeech` (Síntesis de voz neural de alta calidad)
  8. `regenerateCardMedia` (Mantenimiento y regeneración de audios/imágenes)
  9. `generateCardImage` (Generación de ilustraciones didácticas)
- **Autenticación Obligatoria:**
  - Los 6 endpoints de tipo `onCall` (`evaluateEmail`, `generateCardImage`, `generateReadingTest`, `generateDynamicQuiz`, `synthesizeGermanSpeech`, `regenerateCardMedia`) ejecutan obligatoriamente `await verifyRequestAuth(request)`.
  - Las escrituras en `global_flashcards` (`regenerateCardMedia` y `generateCardImage`) requieren validación de origen en servidor: sólo permitidas bajo emulador (`process.env.FUNCTIONS_EMULATOR === "true"`), dominios locales autorizados (`http://localhost:5173`, `http://localhost:5174`) o usuarios con claim `request.auth.token.admin === true`.
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

## 5. Reglas de Seguridad en Base de Datos (`firestore.rules`)

- **Principio de Mínimo Privilegio:**
  - Colección de progreso de usuario (`/artifacts/{appId}/users/{uid}/**`): acceso exclusivo para el usuario autenticado (`request.auth.uid == uid`).
  - Límite de tamaño en payloads para prevenir saturación de almacenamiento (`request.resource.data.size() <= 200`).
  - Permitida la eliminación (`allow delete: if request.auth.uid == uid`) para permitir reseteos de cuenta y cumplimiento de privacidad.
- **Colecciones Globales (`global_flashcards`, `global_audio_pronunciations`, `system_prompts`):**
  - Lectura pública autorizada para estudiantes autenticados o anónimos.
  - Escritura bloqueada desde el cliente web (`allow write: if false`), gestionada exclusivamente por Cloud Functions v2 mediante Firebase Admin SDK.
