const CACHE_NAME = 'dm-pwa-v2.3';
const ASSETS_CACHE = 'dm-assets-v2.3';
const ACTIVE_CACHES = [CACHE_NAME, ASSETS_CACHE];

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/apple-touch-icon.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
];

async function precacheBuildAssets() {
  try {
    const response = await fetch('/precache-manifest.json', { cache: 'no-store' });
    if (!response.ok) return;
    const manifest = await response.json();
    const assetUrls = Array.isArray(manifest?.urls)
      ? manifest.urls.filter((url) => typeof url === 'string' && url.startsWith('/assets/'))
      : [];
    if (assetUrls.length === 0) return;

    const assetsCache = await caches.open(ASSETS_CACHE);
    await Promise.allSettled(
      assetUrls.map((url) =>
        assetsCache.add(url).catch(() => null)
      )
    );
  } catch {
    // En desarrollo Vite no existe /precache-manifest.json; degradación segura
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => precacheBuildAssets())
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !ACTIVE_CACHES.includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET del mismo origen
  if (event.request.method !== 'GET') return;

  let reqUrl;
  try {
    reqUrl = new URL(event.request.url);
    if (reqUrl.origin !== self.location.origin) return;
    // No interceptar rutas reservadas de Firebase Hosting Auth (/__)
    if (reqUrl.pathname.startsWith('/__/')) return;
  } catch {
    return;
  }

  // Navegación SPA (PWA en Modo Avión / offline): red primero + respaldo garantizado a /index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response && response.ok && response.type === 'basic') {
            const cache = await caches.open(CACHE_NAME);
            await cache.put('/index.html', response.clone()).catch(() => {});
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (
            (await cache.match(event.request)) ||
            (await cache.match('/index.html')) ||
            (await cache.match('/')) ||
            Response.error()
          );
        })
    );
    return;
  }

  // Chunks con hash de Vite (/assets/*.js, /assets/*.css): Cache-First para cargas lazy 100% offline
  if (
    reqUrl.pathname.startsWith('/assets/') &&
    /\.(js|css|woff2?|png|svg|webp)$/i.test(reqUrl.pathname)
  ) {
    event.respondWith(
      caches.open(ASSETS_CACHE).then(async (assetsCache) => {
        const cached = await assetsCache.match(event.request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
            await assetsCache.put(event.request, networkResponse.clone()).catch(() => {});
          }
          return networkResponse;
        } catch {
          const shellFallback = await caches.match(event.request);
          return shellFallback || Response.error();
        }
      })
    );
    return;
  }

  // Resto de activos estáticos y /precache-manifest.json: Network-First con respaldo offline
  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        if (response && response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone()).catch(() => {});
        }
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(event.request);
        return cached || Response.error();
      })
  );
});
