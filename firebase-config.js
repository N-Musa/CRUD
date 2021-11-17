import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: "crud-4a2cc",
  storageBucket: import.meta.env.VITE_APP_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)