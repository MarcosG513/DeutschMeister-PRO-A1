import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    const reloadKey = 'dm_preload_reload_v31';
    try {
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, '1');
        window.location.reload();
      }
    } catch {
      // Ignorar si sessionStorage no está disponible
    }
  });
}

if (Capacitor.isNativePlatform()) {
  (async () => {
    try {
      await StatusBar.setOverlaysWebView({ overlay: false })
      await StatusBar.setBackgroundColor({ color: '#0f172a' })
      await StatusBar.setStyle({ style: Style.Dark })
    } catch (err) {
      console.warn('[StatusBar] No se pudo configurar:', err?.message || err)
    }
  })()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

// Registro de Service Worker PWA para soporte de instalación nativa
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
  let hadSwController = Boolean(navigator.serviceWorker.controller);
  let swReloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadSwController || swReloading) {
      hadSwController = Boolean(navigator.serviceWorker.controller);
      return;
    }
    swReloading = true;
    window.location.reload();
  });

  const registerServiceWorker = () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('[PWA] Service Worker registrado:', reg.scope))
      .catch((err) => console.warn('[PWA] Error registrando Service Worker:', err));
  };

  if (document.readyState === 'complete') {
    registerServiceWorker();
  } else {
    window.addEventListener('load', registerServiceWorker);
  }
}

