import { getMessaging, onMessage } from "firebase/messaging";

// Configura Firebase en el contexto principal de la aplicación
const messaging = getMessaging();

// Manejo de mensajes en primer plano
onMessage(messaging, (payload) => {
    console.log("Mensaje en primer plano recibido:", payload);
    // Opcional: mostrar notificación o actualizar el estado de la UI
});
