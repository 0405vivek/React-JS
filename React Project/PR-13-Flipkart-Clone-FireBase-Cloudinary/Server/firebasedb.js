// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyByEfdAMHYRR7U26DIiFPFBGCw1iw3R6fc",
  authDomain: "flipkart-clone-d914a.firebaseapp.com",
  projectId: "flipkart-clone-d914a",
  storageBucket: "flipkart-clone-d914a.firebasestorage.app",
  messagingSenderId: "646322911399",
  appId: "1:646322911399:web:1983f0a20a1a05563e8382",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
