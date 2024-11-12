import { initializeApp } from "firebase/app";
import { getFirestore, enablePersistentCache } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXwsOwlSoQZGwUFhwDe9i5l_AakrYiNCg",
    authDomain: "activ-4f.firebaseapp.com",
    projectId: "activ-4f",
    storageBucket: "activ-4f.appspot.com",
    messagingSenderId: "922499491239",
    appId: "1:922499491239:web:05d87b2899ff57cb164282",
    measurementId: "G-8C6EN65LYE"
};

const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const firestore = getFirestore(app);

// Habilita la persistencia con la nueva API de caché persistente
enablePersistentCache(firestore).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn("Persistencia de Firestore no habilitada. Múltiples pestañas abiertas.");
    } else if (err.code === 'unimplemented') {
        console.warn("La persistencia no está disponible en este navegador.");
    }
});

const auth = getAuth(app);

// Exporta la configuración
export { app, firestore, auth };
