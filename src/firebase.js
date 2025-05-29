// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDy3lLnwfsgFCnzVf99N8AyoCMwZ2o0ti4",
  authDomain: "lids-b2542.firebaseapp.com",
  projectId: "lids-b2542",
  storageBucket: "lids-b2542.appspot.com",
  messagingSenderId: "1046910086058",
  appId: "1:1046910086058:web:df5f2867d3b36dc0b7d9d3",
  measurementId: "G-71RP6QC28G"
};

// ✅ Initialize Firebase once
const app = initializeApp(firebaseConfig);

// ✅ Init services AFTER app
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export properly
export { app, auth, db, storage };
