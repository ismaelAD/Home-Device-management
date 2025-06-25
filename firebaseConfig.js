// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getFirestore,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';

// Copy these values from your Firebase console → Project Settings → SDK Setup
const firebaseConfig = {
  apiKey:      'AIzaSyCakNeKdyaL35JT-c2wTHdSydXXR1K3wb8',
  authDomain:  'smarthomesimulator.firebaseapp.com',
  projectId:   'smarthomesimulator',
  storageBucket:'smarthomesimulator.firebasestorage.app',
  messagingSenderId:'…',
  appId:       '…',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helpers for collections
export const devicesCol = collection(db, 'devices');
export const auth = getAuth(app);
export { addDoc, doc, onSnapshot, updateDoc };

