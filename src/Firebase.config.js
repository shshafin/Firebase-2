// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUL51AVPFwZJDhTDWNu_TP4QaxQ7WPFoE",
  authDomain: "email-password-auth-5336d.firebaseapp.com",
  projectId: "email-password-auth-5336d",
  storageBucket: "email-password-auth-5336d.appspot.com",
  messagingSenderId: "695826738959",
  appId: "1:695826738959:web:1dd732c74cdc76f6a0d87a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
