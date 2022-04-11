const cacheName = 'cactos'
const assetsToCache = [
    './',
    './assets/images/cordel_mobile.png',
    './assets/fonts/Cactus Regular.ttf',
    './assets/images/cordel_web.png',
    './css/materialize.css',
    './css/style.css',
    './js/init.js',
    './js/materialize.js',
    './js/routes.js',
    './js/contador.js',
    './js/girias.js',
    './favicon.ico',
    './manifest.json',
    './icon.png',
    './index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
]

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            return cache.addAll(assetsToCache)
        })
    )
})

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys
                .filter(function(key) {
                    return key.indexOf(cacheName) !== 0;
                })
                .map(function(key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});