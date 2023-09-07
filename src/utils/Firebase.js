// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX8FZH5tztw5LyR5JOLl9lgHgYZt9NIrw",
  authDomain: "netflix-gpt-5d34b.firebaseapp.com",
  projectId: "netflix-gpt-5d34b",
  storageBucket: "netflix-gpt-5d34b.appspot.com",
  messagingSenderId: "823348372319",
  appId: "1:823348372319:web:6dddcc247c1cbeba4f0cea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
