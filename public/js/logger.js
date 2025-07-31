// js/logger.js
import { db } from './firebaseConfig.js';
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function logAction(uid, role, action, details = "") {
  try {
    await addDoc(collection(db, "logs"), {
      uid,
      role,
      action,
      details,
      timestamp: new Date()
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
