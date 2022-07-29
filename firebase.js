import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection
} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyBKcgXnX5bg_PLjH1gHXgc_EwXP3n_Plhg",

  authDomain: "eatapp-34437.firebaseapp.com",

  projectId: "eatapp-34437",

  storageBucket: "eatapp-34437.appspot.com",

  messagingSenderId: "918701219767",

  appId: "1:918701219767:web:a91c986421421821cf1232"

};

initializeApp(firebaseConfig)

const db = getFirestore()

export const colRef = collection(db, 'orders')