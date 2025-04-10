// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-ZPaZk7UnB16lspjbHiGA_VbpE6jTegM",
  authDomain: "remedial-2.firebaseapp.com",
  projectId: "remedial-2",
  storageBucket: "remedial-2.firebasestorage.app",
  messagingSenderId: "48640812374",
  appId: "1:48640812374:web:0d45e23f132d461a0ba2f7",
  measurementId: "G-R08D12TYCC"
};

// Initialize Firebase
// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Inicializa Firestore
export const firebase_db = getFirestore(firebase); 

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase);

