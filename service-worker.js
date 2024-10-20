// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker установлен');
    event.waitUntil(self.skipWaiting()); // Пропустить ожидание
});

// self.addEventListener('activate', (event) => {
//     console.log('Service Worker активирован');
//  // Захватить клиентов
// });

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [`my-app-cache-v4_${Date.now()}`]; // Новый кэш
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    event.waitUntil(self.clients.claim());
});
