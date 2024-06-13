import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9dPFxFeXlej5BL5H4LMFuidNRUD3TuXY",
  authDomain: "restaurant-crud-fce88.firebaseapp.com",
  databaseURL:
    "https://restaurant-crud-fce88-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-crud-fce88",
  storageBucket: "restaurant-crud-fce88.appspot.com",
  messagingSenderId: "40437337148",
  appId: "1:40437337148:web:c19b1c3ec9edad82440739",
  measurementId: "G-PV5RSHBYX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getDatabase(app);
