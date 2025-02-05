// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD76ZrWzG3eyo6G62H74GWZVCShEA1hIkQ",
  authDomain: "trip-planner-3e990.firebaseapp.com",
  projectId: "trip-planner-3e990",
  storageBucket: "trip-planner-3e990.firebasestorage.app",
  messagingSenderId: "953315746444",
  appId: "1:953315746444:web:7baf3d202c596ce5fd91a9",
  measurementId: "G-CGBBYBBVF3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);





