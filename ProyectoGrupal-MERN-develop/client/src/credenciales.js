// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";  
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQlLylaugL_TCrOLcQd5dwmdAERAHCK00",
    authDomain: "imagenes-react-storage.firebaseapp.com",
    projectId: "imagenes-react-storage",
    storageBucket: "imagenes-react-storage.appspot.com",
    messagingSenderId: "48939756983",
    appId: "1:48939756983:web:84a4dc63950e18f0f84c32"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const storage = getStorage(app); // Inicializa Storage

console.log("Firestore:", db);
console.log("Storage:", storage);

// Exporta Firebase, Firestore y Storage
export { app, db, storage };