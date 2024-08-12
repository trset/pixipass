self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pixipass-cache').then(cache => {
      return cache.addAll([
        './',
        './config/events.json',
        './index.html',
        './views/ticket.html',
        './styles/index.css',
        './styles/ticket.css',
        './scripts/index.js',
        './scripts/ticket.js',
        './manifest.json',
        './icons/android-chrome-192x192.png',
        './icons/android-chrome-512x512.png',
        './icons/apple-touch-icon.png',
        './icons/favicon-16x16.png',
        './icons/favicon-32x32.png',
        './icons/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
