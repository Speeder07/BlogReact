import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVnStixQ8Pnh1pul5udza2D4LRbsZes50",
    authDomain: "react-blog-95640.firebaseapp.com",
    projectId: "react-blog-95640",
    storageBucket: "react-blog-95640.appspot.com",
    messagingSenderId: "8504693371",
    appId: "1:8504693371:web:6cb4bd5fd934d7faf748de",
    measurementId: "G-8918GQVJXV"
};
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);