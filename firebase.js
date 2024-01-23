// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF_7Av-InygtisElUjuo_92v7IrLpbOfU",
  authDomain: "vue-chat-fa17e.firebaseapp.com",
  projectId: "vue-chat-fa17e",
  storageBucket: "vue-chat-fa17e.appspot.com",
  messagingSenderId: "293445729550",
  appId: "1:293445729550:web:bf14b30e25ce149d6aab5f"
};
const app = initializeApp(firebaseConfig);
// Create Firestore database instance
const database = getFirestore(app);

// Export the database instance
export default database;

