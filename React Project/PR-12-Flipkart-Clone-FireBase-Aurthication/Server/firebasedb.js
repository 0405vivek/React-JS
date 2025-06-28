// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByEfdAMHYRR7U26DIiFPFBGCw1iw3R6fc",
  authDomain: "flipkart-clone-d914a.firebaseapp.com",
  projectId: "flipkart-clone-d914a",
  storageBucket: "flipkart-clone-d914a.firebasestorage.app",
  messagingSenderId: "646322911399",
  appId: "1:646322911399:web:1983f0a20a1a05563e8382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);