// js/business.js
import { auth, db } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, query, where, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");
const postBtn = document.getElementById("postIdeaBtn");
const ideaList = document.getElementById("ideaList");

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    loadIdeas();
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
    await addDoc(collection(db, "businessIdeas"), {
      title,
      description: desc,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: new Date()
    });

    titleEl.value = "";
    descEl.value = "";
    loadIdeas();
  } catch (e) {
    alert("Error posting idea: " + e.message);
  }
});

async function loadIdeas() {
  ideaList.innerHTML = "";
  const q = query(collection(db, "businessIdeas"), where("uid", "==", currentUser.uid));
  const snap = await getDocs(q);

  snap.forEach(docSnap => {
    const idea = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("idea-box");
    div.innerHTML = `
      <h4>${idea.title}</h4>
      <p>${idea.description}</p>
      <small>Posted by: ${idea.email}</small><br/>
      <button onclick="deleteIdea('${docSnap.id}')">Delete</button>
    `;
    ideaList.appendChild(div);
  });
}

window.deleteIdea = async function(id) {
  if (confirm("Delete this idea?")) {
    await deleteDoc(doc(db, "businessIdeas", id));
    loadIdeas();
  }
};
console.log("Posted business idea:", title);
