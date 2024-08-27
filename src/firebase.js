import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-FrW8ep4dFc1aBGYv86JlXgeifM643dM",
  authDomain: "cost-mate-49f65.firebaseapp.com",
  projectId: "cost-mate-49f65",
  storageBucket: "cost-mate-49f65.appspot.com",
  messagingSenderId: "745734250641",
  appId: "1:745734250641:web:58c65e69a9417b1b91df30",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
