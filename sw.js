const CACHE_NAME = 'music-mayhem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/background_battle_MM.png',
  '/images/background_MM.png',
  '/images/bat.png',
  '/images/Clara_MM.png',
  '/images/Forte_MM.png',
  '/images/Miles_MM.png',
  '/images/scaredtrex.jpg',
  '/images/slime.png',
  '/images/spider.png',
  '/images/Tyler_MM.png',
  '/songs/boss battle.wav',
  '/songs/overworld_MM.wav',
  '/songs/small battle.wav'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});