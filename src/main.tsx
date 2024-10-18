import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createPortal} from "react-dom";
import ModalContent from "./Modal";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker зарегистрирован.');

        // if (registration.waiting) {
        //     notifyUserAboutUpdate(); // Уведомление, если новый SW ждет активации
        // }

        if (registration) {
            registration.addEventListener("updatefound", () => {
                console.log("Service Worker update found!");
                notifyUserAboutUpdate();
            });
        }

        // registration.onupdatefound = () => {
        //     const installingWorker = registration.installing;
        //     if(installingWorker) {
        //         installingWorker.onstatechange = () => {
        //             if (installingWorker.state === 'installed') {
        //                 if (navigator.serviceWorker.controller) {
        //                     notifyUserAboutUpdate(); // Сообщение об обновлении
        //                 }
        //             }
        //         };
        //     }
        // };
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'NEW_VERSION_AVAILABLE') {
            notifyUserAboutUpdate();
        }
    });
}

function notifyUserAboutUpdate() {
    console.log('notifyUserAboutUpdate');
    createPortal(
        <ModalContent />,
        document.body
    )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
