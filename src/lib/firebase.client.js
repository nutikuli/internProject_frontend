import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut,FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG2rgIvaPRWyi6WvNoPrd_okFHeI4j1Wg",
  authDomain: "authloginsvelteproject.firebaseapp.com",
  projectId: "authloginsvelteproject",
  storageBucket: "authloginsvelteproject.appspot.com",
  messagingSenderId: "1096122491540",
  appId: "1:1096122491540:web:2559b9c4b6c907b3e8ca81",
  measurementId: "G-LFSS75HSB8"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Auth provider
const provider = new GoogleAuthProvider();
const providerface = new FacebookAuthProvider();


export { auth, provider, signInWithPopup, signOut ,providerface};