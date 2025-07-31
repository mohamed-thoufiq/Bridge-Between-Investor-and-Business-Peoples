// js/advisor.js
import { auth, db } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, query, where, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const titleEl = document.getElementById("infoTitle");
const descEl = document.getElementById("infoDesc");
const postBtn = document.getElementById("postInfoBtn");
const infoList = document.getElementById("infoList");

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    loadAdvice();
  } else {
    alert("You are not logged in!");
    window.location.href = "../index.html";
  }
});

postBtn.addEventListener("click", async () => {
  const title = titleEl.value.trim();
  const desc = descEl.value.trim();

  if (!title || !desc) {
    return alert("Please fill in both fields.");
  }

  try {
    await addDoc(collection(db, "advisorPosts"), {
      title,
      description: desc,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: new Date()
    });

    titleEl.value = "";
    descEl.value = "";
    loadAdvice();
  } catch (e) {
    alert("Error posting info: " + e.message);
  }
});

async function loadAdvice() {
  infoList.innerHTML = "";
  const q = query(collection(db, "advisorPosts"), where("uid", "==", currentUser.uid));
  const snap = await getDocs(q);

  snap.forEach(docSnap => {
    const advice = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("idea-box");
    div.innerHTML = `
      <h4>${advice.title}</h4>
      <p>${advice.description}</p>
      <small>Posted by: ${advice.email}</small><br/>
      <button onclick="deleteAdvice('${docSnap.id}')">Delete</button>
    `;
    infoList.appendChild(div);
  });
}

window.deleteAdvice = async function(id) {
  if (confirm("Delete this advice?")) {
    await deleteDoc(doc(db, "advisorPosts", id));
    loadAdvice();
  }
};
