// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker установлен');
    event.waitUntil(self.skipWaiting()); // Пропустить ожидание
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker активирован');
    event.waitUntil(self.clients.claim()); // Захватить клиентов
});

self.addEventListener('message', (event) => {
    if (event.data === 'CHECK_VERSION') {
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) =>
                client.postMessage({ type: 'NEW_VERSION_AVAILABLE' })
            );
        });
    }
});
