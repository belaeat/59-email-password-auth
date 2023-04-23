// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb1qqTze8nYJivbnHKd87pZZ4UQ7xa0Pc",
  authDomain: "email-password-auth-ae31d.firebaseapp.com",
  projectId: "email-password-auth-ae31d",
  storageBucket: "email-password-auth-ae31d.appspot.com",
  messagingSenderId: "737688791458",
  appId: "1:737688791458:web:6d2660dd111b674754eafb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;