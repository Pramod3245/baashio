// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDEw2SOTawUAYaX4nM9cfgbjhjeahaz058",
    authDomain: "blaashiotest.firebaseapp.com",
    projectId: "blaashiotest",
    storageBucket: "blaashiotest.appspot.com",
    messagingSenderId: "708146747410",
    appId: "1:708146747410:web:27a0f8c7a6d16d6d1ce0cb"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
