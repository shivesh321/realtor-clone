// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrAFXLoRotmHN8ydeNKNRjvJPCm5KiHdM",
  authDomain: "realtor-clone-react-b4122.firebaseapp.com",
  projectId: "realtor-clone-react-b4122",
  storageBucket: "realtor-clone-react-b4122.appspot.com",
  messagingSenderId: "897826942083",
  appId: "1:897826942083:web:7a79cd371ecf115336bfb6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
