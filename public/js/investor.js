// js/investor.js
import { auth, db } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { logAction } from './logger.js';

const interestTitleEl = document.getElementById("interestTitle");
const interestDescEl = document.getElementById("interestDesc");
const postInterestBtn = document.getElementById("postInterestBtn");
const businessIdeasContainer = document.getElementById("businessIdeas");

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    console.log("Investor logged in:", user.email);
    await logAction(user.uid, "investor", "Login", user.email);
    loadBusinessIdeas();
  } else {
    alert("You are not logged in!");
    window.location.href = "../index.html";
  }
});

postInterestBtn.addEventListener("click", async () => {
  const title = interestTitleEl.value.trim();
  const desc = interestDescEl.value.trim();

  if (!title || !desc) {
    return alert("Please fill in both fields.");
  }

  try {
    await addDoc(collection(db, "investorInterests"), {
      title,
      description: desc,
      uid: currentUser.uid,
      email: currentUser.email,
      createdAt: new Date()
    });

    await logAction(currentUser.uid, "investor", "Post Investment Interest", title);

    interestTitleEl.value = "";
    interestDescEl.value = "";
    alert("Interest posted successfully!");
  } catch (e) {
    console.error("Posting error:", e);
    alert("Error posting interest: " + e.message);
  }
});

async function loadBusinessIdeas() {
  businessIdeasContainer.innerHTML = "";

  try {
    const ideasSnap = await getDocs(collection(db, "businessIdeas"));
    console.log("Fetched business ideas:", ideasSnap.size);

    if (ideasSnap.empty) {
      businessIdeasContainer.innerHTML = "<p>No ideas posted yet.</p>";
      return;
    }

    ideasSnap.forEach(docSnap => {
      const idea = docSnap.data();
      const div = document.createElement("div");
      div.classList.add("idea-box");
      div.innerHTML = `
        <h4>${idea.title}</h4>
        <p>${idea.description}</p>
        <small>By: ${idea.email}</small>
      `;
      businessIdeasContainer.appendChild(div);
    });
  } catch (e) {
    console.error("Load business ideas error:", e);
    businessIdeasContainer.innerHTML = "<p>Error loading ideas.</p>";
  }
}
