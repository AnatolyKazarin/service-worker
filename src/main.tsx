import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker зарегистрирован:', registration);

            // Отслеживаем обновления
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if(installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log('Новое обновление доступно.');
                                // Отправляем уведомление пользователю
                                notifyUserAboutUpdate();
                            }
                        }
                    };
                }
            };

            registration.update()
        }).catch((error) => {
            console.error('Ошибка регистрации Service Worker:', error);
        });
    });
}

function notifyUserAboutUpdate() {
    if (window.confirm('Новое обновление доступно. Перезагрузить страницу?')) {
        window.location.reload();
    }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
