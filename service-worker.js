// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker установлен');
    event.waitUntil(self.skipWaiting()); // Пропустить ожидание
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker активирован');
    const date = Date.now()
    event.waitUntil(self.clients.claim()); // Захватить клиентов
});

self.addEventListener('message', (event) => {
    console.log('message', event)
    if (event.data === 'CHECK_VERSION') {
        console.log('Проверка версии...');
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) =>
                client.postMessage({ type: 'NEW_VERSION_AVAILABLE' })
            );
        });
    }
});

// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = ['my-app-cache-v4']; // Новый кэш
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (!cacheWhitelist.includes(cacheName)) {
//                         console.log('Удаление старого кэша:', cacheName);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });
