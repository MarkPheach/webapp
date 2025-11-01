// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// 🔥 config ของโปรเจกต์คุณ (เอามาจาก Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDX1DcGq8av1k8_Tb0YLCQXpqMUEaVr2Ss",
  authDomain: "cp422021-673380167-8.firebaseapp.com",
  databaseURL: "https://cp422021-673380167-8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cp422021-673380167-8",
  storageBucket: "cp422021-673380167-8.firebasestorage.app",
  messagingSenderId: "49097934635",
  appId: "1:49097934635:web:cd844dfcccd58fc152276e",
  measurementId: "G-FRHQPFF2VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);

// ใช้งาน Emulator เมื่อรันบน localhost
/*if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
}*/