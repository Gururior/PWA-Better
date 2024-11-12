if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Firebase Messaging Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
            console.error("Error al registrar el Service Worker de Firebase Messaging:", error);
        });
}
