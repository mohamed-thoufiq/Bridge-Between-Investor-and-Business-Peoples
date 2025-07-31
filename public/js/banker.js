// js/banker.js
import { auth, db } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, query, where, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loanTitleEl = document.getElementById("loanTitle");
const loanDescEl = document.getElementById("loanDesc");
const postLoanBtn = document.getElementById("postLoanBtn");
const loanList = document.getElementById("loanList");

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    loadLoans();
  } else {
    alert("You are not logged in!");
    window.location.href = "../index.html";
  }
});

postLoanBtn.addEventListener("click", async () => {
  const title = loanTitleEl.value.trim();
  const desc = loanDescEl.value.trim();

  if (!title || !desc) return alert("Please fill out both fields.");

  try {
    await addDoc(collection(db, "loanOffers"), {
      title,
      description: desc,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: new Date()
    });

    loanTitleEl.value = "";
    loanDescEl.value = "";
    loadLoans();
  } catch (e) {
    alert("Error posting loan: " + e.message);
  }
});

async function loadLoans() {
  loanList.innerHTML = "";
  const q = query(collection(db, "loanOffers"), where("uid", "==", currentUser.uid));
  const snap = await getDocs(q);

  snap.forEach(docSnap => {
    const loan = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("idea-box");
    div.innerHTML = `
      <h4>${loan.title}</h4>
      <p>${loan.description}</p>
      <small>Posted by: ${loan.email}</small><br/>
      <button onclick="deleteLoan('${docSnap.id}')">Delete</button>
    `;
    loanList.appendChild(div);
  });
}

window.deleteLoan = async function(id) {
  if (confirm("Are you sure you want to delete this loan offer?")) {
    await deleteDoc(doc(db, "loanOffers", id));
    loadLoans();
  }
};
