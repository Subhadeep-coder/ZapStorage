
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAq1YTU-OJZs4mK3kyr5AxKJ6jUBhUIK08",
    authDomain: "drive-e37b7.firebaseapp.com",
    projectId: "drive-e37b7",
    storageBucket: "drive-e37b7.appspot.com",
    messagingSenderId: "516275694626",
    appId: "1:516275694626:web:e16aeb45c8d57aa27d6e7b",
    measurementId: "G-JB556QQYCN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = {
    folders: collection(firestore, 'folders'),
    files: collection(firestore, 'files'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimeStamp: serverTimestamp
}

export const storage = getStorage(app);
