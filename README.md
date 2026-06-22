<div align="center">
  
  # 🇩🇪 DeutschMeister PRO A1
  
  **El estándar definitivo para dominar el alemán técnico y prepararte para el Goethe Zertifikat, impulsado por Inteligencia Artificial.**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)](https://deepmind.google/technologies/gemini/)

  <br />
</div>

---

## 🎯 Objetivo del Proyecto

**DeutschMeister PRO A1** no es solo una aplicación de flashcards; es un ecosistema inmersivo de aprendizaje diseñado específicamente para hispanohablantes. Su misión principal es acelerar la adquisición del nivel A1 de alemán, combinando técnicas pedagógicas probadas con la tecnología más vanguardista.

Ya sea que te prepares para el examen **Goethe Zertifikat A1** o necesites vocabulario técnico para integrarte rápidamente en el mercado laboral de la región DACH, DeutschMeister PRO A1 se adapta a tu ritmo, creando un puente directo entre la teoría y la práctica real.

---

## ✨ Características Principales

Nuestra interfaz está diseñada meticulosamente para ofrecer una experiencia de usuario fluida, rápida y sin distracciones:

*   📚 **Diccionario Interactivo Estructurado:** Vocabulario clasificado estratégicamente por capítulos fundamentales (Alfabeto, Tiempo, Transporte, Verbos Modales, etc.).
*   🎧 **Síntesis de Voz Nativa:** Escucha la pronunciación perfecta de cada palabra y frase utilizando tecnologías de Text-to-Speech con acento alemán auténtico.
*   🗂️ **Tarjetas de Memoria (Flashcards) 3D:** Un sistema de repaso visual e interactivo que facilita la retención a largo plazo.
*   📖 **Módulos de Gramática Interactiva:** Explicaciones claras sobre los pilares del alemán (Nominativo, Acusativo, Dativo) con ejemplos aplicados y autoevaluaciones.
*   🔍 **Motor de Búsqueda de Alto Rendimiento:** Encuentra cualquier palabra en español o alemán al instante.
*   ☁️ **Sincronización en la Nube:** Tu progreso, historial de conversaciones y generación de contenido se guardan de forma segura utilizando la arquitectura serverless de Firebase.

---

## 🤖 El Poder de la IA (Google Gemini)

Lo que realmente separa a DeutschMeister PRO A1 del resto es su profunda integración con los modelos generativos de **Google Gemini**. La aplicación actúa como un tutor hiper-personalizado disponible 24/7.

> *La inteligencia artificial no solo corrige; contextualiza, explica y visualiza el idioma.*

*   🖼️ **Generación de Arte para Flashcards:** Si una tarjeta no tiene imagen, la API de Gemini (modelo visual) diseña y renderiza al vuelo una ilustración vectorial representativa de la palabra, ayudando a la asociación visual-memoria.
*   🗣️ **Tutor Conversacional en Tiempo Real:** Un chat interactivo con una personalidad pedagógica experta. Resuelve dudas, explica por qué una estructura gramatical es incorrecta y ofrece ejemplos adaptados a tu nivel.
*   🎭 **Simulador de Rol A1 (Roleplay):** Practica situaciones de la vida real (pedir en un restaurante en Múnich, comprar un billete de tren en Berlín) interactuando con agentes controlados por IA bajo prompts estrictos de nivel A1.
*   ✉️ **Evaluador de Exámenes (Goethe Zertifikat):** El simulador de correo electrónico te permite redactar un texto basándose en instrucciones de examen reales. La IA de Gemini analiza tu estructura, cuenta las palabras, verifica tus saludos/despedidas y corrige tu posición del verbo, simulando a un examinador oficial.

---

## 🛠️ Stack Tecnológico

La aplicación ha sido construida siguiendo los estándares de la industria moderna para garantizar escalabilidad, velocidad y un desarrollo robusto:

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Core** | `React 18` + `Vite` | Arquitectura de componentes UI y compilación ultra rápida. |
| **Estilos** | `Tailwind CSS v4` | Diseño utilitario, responsive y componentes estéticos avanzados (Glassmorphism). |
| **Íconos** | `Lucide React` | Iconografía vectorial consistente y personalizable. |
| **Backend (BaaS)** | `Firebase Cloud Firestore` | Base de datos NoSQL en tiempo real para almacenar el historial de usuarios y caché de imágenes. |
| **Autenticación** | `Firebase Auth` | Autenticación anónima frictionless para asegurar el acceso a la base de datos. |
| **IA Engine** | `Google Gemini API` | Modelos `gemini-2.5-flash` y `gemini-2.5-flash-image` para NLP, evaluación y generación multimodal. |

---

## 🚀 Guía de Inicio Rápido (Installation)

Sigue estos pasos para ejecutar el entorno de desarrollo en tu máquina local.

### 1. Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/DeutschMeister-PRO-A1.git
cd "DeutschMeister-PRO-A1"
```

### 2. Instalar Dependencias

Asegúrate de tener Node.js instalado. Luego ejecuta:

```bash
npm install
```

### 3. Configurar Variables de Entorno

Renombra el archivo `.env.example` a `.env` (o crea un archivo nuevo `.env` en la raíz del proyecto). Configura tus credenciales de acceso:

```env
# API Key de Google Gemini
VITE_GEMINI_API_KEY="tu_api_key_de_gemini_aqui"

# Configuración de Firebase
VITE_FIREBASE_API_KEY="tu_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="tu_proyecto.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="tu_proyecto"
VITE_FIREBASE_STORAGE_BUCKET="tu_proyecto.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:12345:web:abcd"
```

*Nota: Asegúrate de configurar las Reglas de Firestore para permitir acceso de lectura/escritura a los usuarios autenticados según se define en la documentación interna.*

### 4. Arrancar el Servidor de Desarrollo

Una vez configurado todo, lanza el entorno local con Vite:

```bash
npm run dev
```

La aplicación estará corriendo y disponible en `http://localhost:5173/`. ¡Viel Erfolg beim Lernen! (¡Mucho éxito en el aprendizaje!)

---
<div align="center">
  <small>Desarrollado con ❤️ para la comunidad de estudiantes de alemán.</small>
</div>
