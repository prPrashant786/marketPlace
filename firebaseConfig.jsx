// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuXb4VMkc8IfOloKy_fTQD6CysFI_iMCA",
  authDomain: "baat-chit-392dd.firebaseapp.com",
  databaseURL: "https://baat-chit-392dd-default-rtdb.firebaseio.com",
  projectId: "baat-chit-392dd",
  storageBucket: "baat-chit-392dd.appspot.com",
  messagingSenderId: "75466295419",
  appId: "1:75466295419:web:2af2c499292d990bf33ade",
  measurementId: "G-E2YMRN8DZ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
