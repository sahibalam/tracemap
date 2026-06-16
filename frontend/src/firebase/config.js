// frontend/src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  sendEmailVerification, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  applyActionCode,
  // ✅ Email Magic Link ke liye yeh 3 functions import karo
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth'

// 🔴 YOUR FIREBASE CONFIG (Copy from Firebase Console)
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

// ✅ Export all required functions
export { 
  auth,
  // Email/Password
  sendEmailVerification, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // Phone
  RecaptchaVerifier,
  signInWithPhoneNumber,
  // Email Action
  applyActionCode,
  // ✅ Email Magic Link (New)
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
}