// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfKzehdmewYukNlJ1xDDwGqr9sJEszyJk",
  authDomain: "netflixgpt-aed99.firebaseapp.com",
  projectId: "netflixgpt-aed99",
  storageBucket: "netflixgpt-aed99.appspot.com",
  messagingSenderId: "866528098213",
  appId: "1:866528098213:web:5fbf03b2e35db49bab9a4c",
  measurementId: "G-Z57032MTTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();