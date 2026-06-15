// frontend/src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  sendEmailVerification, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  applyActionCode  // Add this
} from 'firebase/auth'

// 🔴 COPY YOUR CONFIG FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyAy0RYWwWuTwkk9ESPxQKX62Et-qZT-yTs",
  authDomain: "tradesmap-737e3.firebaseapp.com",
  projectId: "tradesmap-737e3",
  storageBucket: "tradesmap-737e3.firebasestorage.app",
  messagingSenderId: "106208210210",
  appId: "1:106208210210:web:f0e1cba128f9b9f1dec97b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { 
  auth, 
  sendEmailVerification, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  applyActionCode  // Export this
}