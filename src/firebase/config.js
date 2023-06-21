import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPZhig0IQ3dwrFv-8qh3LDAfhzJdqvYzg",
  authDomain: "chat-app-ffced.firebaseapp.com",
  projectId: "chat-app-ffced",
  storageBucket: "chat-app-ffced.appspot.com",
  messagingSenderId: "1011746026210",
  appId: "1:1011746026210:web:8d2fab8d9a96dd622324bb",
  measurementId: "G-MXNMM4LRCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)