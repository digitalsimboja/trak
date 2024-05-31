// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: "trak-94e35.firebaseapp.com",
  projectId: "trak-94e35",
  storageBucket: "trak-94e35.appspot.com",
  messagingSenderId: "281528563933",
  appId: "1:281528563933:web:153354ef0e89caff79c334",
  measurementId: "G-MHVTER9558"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
