const CACHE_NAME = 'dm-pwa-v2.0';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Solo interceptar peticiones GET del mismo origen
  if (event.request.method !== 'GET') return;
  try {
    if (new URL(event.request.url).origin !== self.location.origin) return;
  } catch (_) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      return cached || Response.error();
    })
  );
});
