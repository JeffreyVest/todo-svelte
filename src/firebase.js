import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAyWsoh-xfu2LDc8Opw9X7RZos5k-HkleM",
    authDomain: "todo-svelte-8afc0.firebaseapp.com",
    databaseURL: "https://todo-svelte-8afc0.firebaseio.com",
    projectId: "todo-svelte-8afc0",
    storageBucket: "todo-svelte-8afc0.appspot.com",
    messagingSenderId: "578009724655",
    appId: "1:578009724655:web:3f53ff9f500e30dad9cd1a",
    measurementId: "G-EM4J8L39J4"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
