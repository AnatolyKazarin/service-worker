import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalContent from "./Modal";
import {createPortal} from "react-dom";

function App() {
    const [showModal, setShowModal] = useState(false)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker зарегистрирован.');

            // if (registration.waiting) {
            //     notifyUserAboutUpdate(); // Уведомление, если новый SW ждет активации
            // }

            if (registration) {
                registration.addEventListener("updatefound", () => {
                    console.log("Service Worker update found!");
                    // notifyUserAboutUpdate();
                    setShowModal(true)
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

        // navigator.serviceWorker.addEventListener('message', (event) => {
        //     if (event.data.type === 'NEW_VERSION_AVAILABLE') {
        //         notifyUserAboutUpdate();
        //     }
        // });
    }

    // function notifyUserAboutUpdate() {
    //     console.log('notifyUserAboutUpdate');
    //     createPortal(
    //         <ModalContent />,
    //         document.body
    //     )
    // }

  const [count, setCount] = useState(0)
    console.log('Show modal', showModal)
  return (
    <>
        {showModal && createPortal(
            <ModalContent />,
            document.body
        )}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
