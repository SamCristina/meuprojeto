// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDYJaDRywwhUK-EGSPCz_WrJD3YL--ups",
    authDomain: "teste-96aa2.firebaseapp.com",
    projectId: "teste-96aa2",
    storageBucket: "teste-96aa2.appspot.com",
    messagingSenderId: "1039538657046",
    appId: "1:1039538657046:web:4f292c9b0497a4fc942237"
  };

// Initialize Firebase
console.log("Conectado ao Firebase!");
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);

export { firestore };