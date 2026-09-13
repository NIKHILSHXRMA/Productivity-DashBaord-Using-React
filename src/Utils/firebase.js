import { initializeApp } from "firebase/app";

import { getAnalytics, isSupported } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0I_dqUgReWcmuvaBySPLdbi2yVNTrhjw",
  authDomain: "productivity-dashboard-3d.firebaseapp.com",
  projectId: "productivity-dashboard-3d",
  storageBucket: "productivity-dashboard-3d.firebasestorage.app",
  messagingSenderId: "654231366175",
  appId: "1:654231366175:web:0241d4a365d608552ac32a",
  measurementId: "G-HSW9DWHQDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();

// Analytics - safely initialize in browser
let analytics = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.warn("Firebase Analytics is not available:", error);
    });
}

// Firebase Auth methods
export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  analytics,
};