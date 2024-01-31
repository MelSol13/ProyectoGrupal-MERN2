// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQlLylaugL_TCrOLcQd5dwmdAERAHCK00",
    authDomain: "imagenes-react-storage.firebaseapp.com",
    projectId: "imagenes-react-storage",
    storageBucket: "imagenes-react-storage.appspot.com",
    messagingSenderId: "48939756983",
    appId: "1:48939756983:web:84a4dc63950e18f0f84c32"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase