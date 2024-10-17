const CACHE_NAME = "app-cache-v2";
const urlsToCache = ["/", "/index.html", "/static/js/main.js"]; // Cache essential assets

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching app shell...");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Clearing old cache...");
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Listen for skipWaiting event to activate new service worker immediately
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
