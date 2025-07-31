import { auth, db } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const roleEl = document.getElementById('role');

document.getElementById('registerBtn').addEventListener('click', async () => {
  const email = emailEl.value;
  const password = passwordEl.value;
  const role = roleEl.value;

  if (!email || !password || !role) return alert("All fields required");

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), { email, role });
    alert("Registration successful");
    redirectToDashboard(role);
  } catch (e) {
    alert("Register Error: " + e.message);
  }
});

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = emailEl.value;
  const password = passwordEl.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCred.user.uid));

    if (userDoc.exists()) {
      const role = userDoc.data().role;
      redirectToDashboard(role);
    } else {
      alert("User role not found.");
    }
  } catch (e) {
    alert("Login Error: " + e.message);
  }
});

function redirectToDashboard(role) {
  window.location.href = `dashboard/${role}.html`;
}
