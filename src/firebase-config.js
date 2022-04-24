import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, getDocs, doc
} from "firebase/firestore";
import {
    getStorage, ref
} from 'firebase/storage';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBRW1JzLVAwOIOWLDobwFw0fHWBRaVyo24",
    authDomain: "blogreact-database.firebaseapp.com",
    projectId: "blogreact-database",
    storageBucket: "blogreact-database.appspot.com",
    messagingSenderId: "298007359545",
    appId: "1:298007359545:web:24d3f90649f02382a55de8"
  };
  
initializeApp(firebaseConfig);
const db = getFirestore();
export const storage = getStorage();
export const storageRef = ref(storage);
export const colRef = collection(db, 'posts');
export const listRef = ref(storage, '');
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
//export const imagesRef = ref(storage, 'images');

