// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIS05tHhVCNuClkiSlEO0LtwyG01gr2TY",
  authDomain: "bridge-investor-app-4b69c.firebaseapp.com",
  projectId: "bridge-investor-app-4b69c",
  storageBucket: "bridge-investor-app-4b69c.appspot.com",
  messagingSenderId: "457868995506",
  appId: "1:457868995506:web:a8d0210948ad41b611d2ab",
  measurementId: "G-G7NC0L8RM9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
