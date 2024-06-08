// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUPRHNYDk2N9vRQ6Itk--d8t5WDaCo_9A",
  authDomain: "brothers-94378.firebaseapp.com",
  projectId: "brothers-94378",
  storageBucket: "brothers-94378.appspot.com",
  messagingSenderId: "17103712349",
  appId: "1:17103712349:web:e99af6244dacc11a4c5db4",
  measurementId: "G-GY4BPS1W2X",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
