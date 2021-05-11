const CACHE_NAME = 'SAY-APP';
const urlsToCache = [
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/js/0.bundle.js',
    '/index.html',
    '/',
    'offline.html'
];

const self = this;

// install Service Worker
self.addEventListener('install', (event)=> {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opended cache');
            return cache.addAll(urlsToCache)
        })
    )
})

// Listen for requests
self.addEventListener('fetch', (event)=> {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
        })
    )
})

// Activate the SW
self.addEventListener('activate', (event)=> {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.allSettled(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})