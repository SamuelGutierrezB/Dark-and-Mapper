import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAwY-jOXpMNZloHgMGaO0E5T3Bdt19AtP0",
  authDomain: "dark-and-mapper.firebaseapp.com",
  projectId: "dark-and-mapper",
  storageBucket: "dark-and-mapper.firebasestorage.app",
  messagingSenderId: "304833787062",
  appId: "1:304833787062:web:ac81892e100bae11706217",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
