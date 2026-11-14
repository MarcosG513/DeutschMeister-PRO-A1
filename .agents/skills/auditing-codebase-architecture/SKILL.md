---
name: auditing-codebase-architecture
description: Guía de auditoría integral de arquitectura, rendimiento, seguridad, resiliencia serverless, Android Auto y pedagogía para DeutschMeister PRO A1 (v2.0).
---

# Guía de Auditoría de Arquitectura del Código — DeutschMeister PRO A1 (v2.0)

Esta skill proporciona las directrices, procedimientos paso a paso y listas de comprobación técnicas para auditar la base de código de **DeutschMeister PRO A1**, abarcando desde el frontend React 19 y Capacitor Android hasta el backend de Cloud Functions v2, las reglas de Firestore y la integración con Android Auto.

---

## 🎯 Protocolo de Auditoría: Review-Driven Development (RDD)

Antes de modificar cualquier archivo durante una auditoría:
1. **Modo Estricto de Sólo Lectura Inicial:** Escanear archivos, dependencias y flujos sin alterar código hasta presentar un diagnóstico claro.
2. **Ambiente Local Aislado:** Si se requiere iniciar el servidor de desarrollo Vite para pruebas, crear un `.env.local` con `PORT=5174` y `VITE_PORT=5174` para evitar conflictos con el puerto 5173 del entorno IDE.
3. **Validación de Build Continua:** Todo cambio debe verificarse con `npm.cmd run build` (cero errores en Vite).
4. **Commits Atómicos Temáticos:** Dividir los hallazgos e implementaciones en fases y commits atómicos con prefijos convencionales (`sec:`, `perf:`, `fix:`, `feat:`, `refactor:`).

---

## 🔍 FRENTE 1: Frontend, Bundle & Arquitectura UI (`src/`)

### 1. Desacoplamiento y Carga Perezosa (Code-Splitting)
- **Monolito `App.jsx`:** Verificar que `src/App.jsx` permanezca limpio, delegando configuraciones a `src/config/firebase.js` y hooks específicos (`usePWAInstall.js`, `useAudio`).
- **React.lazy & Suspense:**
  - Inspeccionar `src/data/chapters.jsx`: los 21 módulos interactivos y exámenes (`OfficialFormExam`, `VoiceExaminer`, `GoetheHorenExam`, `GoetheLesenExam`, etc.) deben cargarse mediante `React.lazy(() => import(...))`.
  - Inspeccionar `src/components/PresentationViewer.jsx`: todo contenedor de slide interactivo debe contar con un `<Suspense fallback={...}>` envolvente para evitar fallos de renderizado al cambiar de diapositiva.
  - Verificar que el bundle principal de Vite se mantenga optimizado y sin chunks monolíticos innecesarios.

### 2. Viewport Móvil y Teclados Virtuales en Android
- **Contenedores de Pantalla Completa:**
  - Revisar componentes interactivos como `EmailSimulator.jsx`, `RoleplaySimulator.jsx`, `DynamicQuiz.jsx`, `PresentationViewer.jsx` y `DrivingMode.jsx`.
  - Asegurar el uso de `min-h-[100dvh]` (Dynamic Viewport Height) en lugar de `100vh` estático.
  - Verificar que los campos `<input>` y `<textarea>` cuenten con manejador `onFocus` que ejecute `scrollIntoView({ behavior: 'smooth', block: 'center' })` para que el teclado virtual de Android no cubra el contenido.

### 3. Integridad de Métricas y Almacenamiento Local
- **Persistencia en `src/utils/helpers.js`:**
  - Auditar funciones como `recordPedagogyProgress`, `loadPedagogyProgress`, `getDailyStreak` y `incrementCardsStudied`.
  - Asegurar que las escrituras en `localforage` (IndexedDB) estén protegidas contra condiciones de carrera mediante promesas o colas de serialización.
  - Comprobar la sincronización con Firestore en `/artifacts/{appId}/users/{uid}/pedagogy/progress`.
  - **Invariabilidad de `w.de`:** Verificar que ningún cambio altere la clave textual de las tarjetas en `src/data/chapters.jsx` para no corromper la caché de audios o imágenes en `global_flashcards`.

---

## 🔍 FRENTE 2: Fahrmodus, Android Auto & Mutex de Audio

### 1. Algoritmo de 4 Olas (Highway Workout)
- Inspeccionar `src/utils/highwayWorkoutBuilder.js` y `src/data/drivingAcademyCurriculum.js`:
  - **Ola 1:** Bloques sintácticos base y reglas con micro-tips.
  - **Ola 2:** Algoritmo de repetición espaciada intra-trayecto (`+2` y `+5`).
  - **Ola 3:** Fuego rápido sin pistas con inversión par/impar para romper memorización lineal.
  - **Ola 4:** Simulación conversacional (Ping-Pong) y sellado final.
- Garantizar que los identificadores y textos coincidan exactamente para mantener el 100% Cache Hit.

### 2. Android Auto (`DeutschMeisterAutoService.java`)
- Verificar que las carátulas/teleprompters generados para la pantalla del vehículo:
  - Mantengan resolución de 480x480 px en formato `RGB_565` (~450 KB).
  - Estén estrictamente protegidos contra `TransactionTooLargeException`.
  - Cuenten con bloques `try/catch(Throwable)` que eviten cierres abruptos de la UI automotriz.

### 3. Concurrencia de Audio & Mutex (`src/services/aiAudioService.js`)
- Auditar `playGermanAudio` y `playAudioSource`:
  - Confirmar el uso de `latestPlaybackRequestId` para descartar solicitudes obsoletas.
  - Verificar que se acepte `signal` (`AbortSignal`) y que se cancelen reproducciones previas de forma limpia al saltar o pausar.
  - Asegurar la revocación de Object URLs creados con `URL.createObjectURL(blob)` en `onended`, `onerror`, `play()` catch y `stopCurrentAudio()`.

---

## 🔍 FRENTE 3: Backend Serverless & Resiliencia de IA (`functions/`)

### 1. Seguridad de Endpoints (Auth & Origin Validation)
- En `functions/index.js`:
  - Los 6 endpoints `onCall` deben invocar `await verifyRequestAuth(request)`.
  - Endpoints que alteran o regeneran contenido global (`regenerateCardMedia`, `generateCardImage`) deben validar que la solicitud provenga del emulador local (`process.env.FUNCTIONS_EMULATOR === "true"`), dominios locales autorizados (`http://localhost:5173`, `http://localhost:5174`) o un administrador (`request.auth.token.admin === true`).

### 2. Pool de API Keys & Circuit Breaker (`geminiClient.js`)
- **Gestión de Errores y Cooldowns:**
  - `60_000 ms` para errores transitorios de concurrencia (`429 RPM`, `503 Overloaded`).
  - `3_600_000 ms` (1 hora) para cuota diaria agotada (`429 RPD`, `402 Insufficient Quota`).
  - Fallback inmediato de modelo (`gemini-3.8-flash` a `gemini-2.5-flash`) en la misma llave ante un `429` antes de inhabilitar la llave.
- **Streams SSE:**
  - Endpoints de streaming (`sendTutorChatMessage`, `runRoleplaySimulator`, `generateStory`) deben escuchar `req.on("close")` para abortar llamadas LLM en curso.
- **Secret Manager vs Variables de Entorno (.env):**
  - **REGLA ESTRICTA:** Las llaves `GEMINI_PAID_KEY_2`, `GEMINI_PAID_KEY_3` y `GEMINI_PAID_KEY_4` residen en `functions/.env` y se leen mediante `process.env`.
  - **NUNCA** incluirlas en el array `ALL_AI_SECRETS` ni invocarlas con `defineSecret` para evitar errores HTTP 400 en Cloud Run.

---

## 🔍 FRENTE 4: Reglas de Firestore & Secretos (`firestore.rules`)

### 1. Reglas de Seguridad
- Verificar que las reglas protejan los datos personales bajo `/artifacts/{appId}/users/{uid}/**` permitiendo acceso solo a su dueño (`request.auth.uid == uid`).
- Comprobar que se permita la eliminación de documentos por parte del usuario para garantizar control de privacidad.
- Limitar el tamaño de payload (`request.resource.data.size() <= 200`) para evitar abusos de almacenamiento.
- Asegurar que colecciones maestras (`global_flashcards`, `global_audio_pronunciations`, `system_prompts`) tengan escritura restringida (`allow write: if false`), gestionadas únicamente por el Admin SDK en Cloud Functions.

### 2. Escaneo de Secretos (CWE-798)
- Confirmar que ningún archivo en control de versiones exponga API keys en texto claro.
- `.env.example` debe contener solo placeholders vacíos o documentales.
- Archivos `.env`, `.env.local`, `keystore.properties` y certificados `*.jks` deben estar estrictamente listados en `.gitignore`.

---

## 🔍 FRENTE 5: Android Build & Firma Release

### 1. Configuración Gradle
- En `android/app/build.gradle`:
  - `applicationId`: `com.deutschmeister.app`
  - `signingConfigs.release`: debe cargar dinámicamente `keystorePropertiesFile` y verificar la existencia de `deutschmeister-release.jks`.
  - Configuración Proguard / R8 adecuada para compilaciones de producción.

---

## 📋 Lista de Comprobación Rápida de Verificación (Checklist)

```bash
# 1. Comprobar estado de Git
git status

# 2. Validar sintaxis en Backend
node -c functions/index.js
node -c functions/services/geminiClient.js

# 3. Validar build de Vite (Frontend)
npm.cmd run build

# 4. Probar verificación de bloques en catálogo (Kapitel 22)
node --input-type=module -e "import { redemittelChapter } from './src/data/redemittelBegegnungen.js'; console.log('Total:', redemittelChapter.words.length);"
```
