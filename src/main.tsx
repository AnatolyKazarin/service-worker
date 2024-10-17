import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);

                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if(installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === "installed") {
                                if (navigator.serviceWorker.controller) {
                                    // New update available - Notify user
                                    console.log("New content is available; please refresh.");
                                    // Optionally, you could trigger a UI notification here
                                } else {
                                    console.log("Content is cached for offline use.");
                                }
                            }
                        };
                    }
                };
            })
            .catch((error) => console.error("Service Worker registration failed:", error));
    });
}

const promptUserToRefresh = (registration: any) => {
    if (window.confirm("A new version is available. Refresh now?")) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
    }
};

navigator.serviceWorker.ready.then((registration) => {
    if (registration.waiting) {
        promptUserToRefresh(registration);
    }

    registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if(installingWorker) {
            installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    promptUserToRefresh(registration);
                }
            };
        }

    });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
