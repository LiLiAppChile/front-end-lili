import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyCKE2jIyXfEbaXIoWmjKRYj0A0v7sTx-mY",
  authDomain: "liliapp-fe07b.firebaseapp.com",
  projectId: "liliapp-fe07b",
  storageBucket: "liliapp-fe07b.firebasestorage.app",
  messagingSenderId: "161501442887",
  appId: "1:161501442887:web:200e05c71678d657bad262",
  measurementId: "G-XXEMHGCLTH"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de autenticación y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta las instancias para usarlas en tu aplicación
export { auth, db };