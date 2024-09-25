import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7sJTS0al_-rjSgfjZZo6Vw19bqQLVx44",
    authDomain: "findmyrecipe-7ea4c.firebaseapp.com",
    projectId: "findmyrecipe-7ea4c",
    storageBucket: "findmyrecipe-7ea4c.appspot.com",
    messagingSenderId: "821622719978",
    appId: "1:821622719978:web:abdb23615d665543a8de93"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
