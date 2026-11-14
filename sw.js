const CACHE = 'rex-app-v2';
const CORE = ['./index.html', './styles.css', './app.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function cachedResponse(request) {
  const cache = await caches.open(CACHE);
  const direct = await cache.match(request, { ignoreSearch: true });
  if (direct) return direct;
  if (request.mode === 'navigate') return cache.match('./index.html');
  return null;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        cache.put(request, response.clone());
        return response;
      }
      // Сервер или прокси ответил ошибкой — пробуем кэш.
      const cached = await cachedResponse(request);
      return cached || response;
    } catch (error) {
      const cached = await cachedResponse(request);
      return cached || Response.error();
    }
  })());
});
