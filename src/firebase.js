// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA9xL4_ivaM7P0BYTv11RIxXDVcj4GXco",
  authDomain: "ecommerce-adf7f.firebaseapp.com",
  projectId: "ecommerce-adf7f",
  storageBucket: "ecommerce-adf7f.appspot.com",
  messagingSenderId: "336452782561",
  appId: "1:336452782561:web:2823c9f4dfa24f4bf42aa0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;