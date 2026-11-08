import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyARNlHHzJ2OP0I9z8osCqUe3HA9tODQrwA",
    authDomain: "signplay-78c82.firebaseapp.com",
    projectId: "signplay-78c82",
    storageBucket: "signplay-78c82.firebasestorage.app",
    messagingSenderId: "421841616423",
    appId: "1:421841616423:web:cf91684465e082e1215802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Google sign-in provider
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };