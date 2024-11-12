// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXwsOwlSoQZGwUFhwDe9i5l_AakrYiNCg",
  authDomain: "activ-4f.firebaseapp.com",
  projectId: "activ-4f",
  storageBucket: "activ-4f.appspot.com",
  messagingSenderId: "922499491239",
  appId: "1:922499491239:web:05d87b2899ff57cb164282",
  measurementId: "G-8C6EN65LYE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export default app;