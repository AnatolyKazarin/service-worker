import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker зарегистрирован.');

        // Проверяем обновление на сервере
        registration.update(); // Принудительная проверка обновлений

        if (registration.waiting) {
            notifyUserAboutUpdate(); // Уведомление, если новый SW ждет активации
        }

        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if(installingWorker) {
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            notifyUserAboutUpdate(); // Сообщение об обновлении
                        }
                    }
                };
            }
        };
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'NEW_VERSION_AVAILABLE') {
            notifyUserAboutUpdate();
        }
    });
}

function notifyUserAboutUpdate() {
    if (window.confirm('Доступно новое обновление. Перезагрузить страницу?')) {
        window.location.reload();
    }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
