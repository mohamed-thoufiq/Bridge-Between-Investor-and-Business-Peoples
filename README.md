# 🌉 Bridge Between Investor and Business People

This is a Firebase-powered web application that acts as a platform to connect **investors**, **business owners**, **bankers**, and **advisors**. The app supports user role-based dashboards, post creation, and real-time data sync using Firebase Firestore.

🔗 **Live Site**: [https://bridge-investor-app-4b69c.web.app/](https://bridge-investor-app-4b69c.web.app/)

---

## 🔥 Features

- 🔐 Role-based login & registration using Firebase Auth
- 🧑‍💼 Separate dashboards for:
  - **Investors**
  - **Business Owners**
  - **Bankers**
  - **Advisors**
- 📬 Business owners can post ideas
- 💸 Investors can express interest in ideas
- 🏦 Bankers can post loan offers
- 🧠 Advisors can give advice on business ideas
- 🔄 Real-time updates using Firestore

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Hosting

---

## 🏗 Folder Structure
public/
├── css/
│ └── style.css
├── dashboard/
│ ├── advisor.html
│ ├── banker.html
│ ├── business.html
│ └── investor.html
├── js/
│ ├── advisor.js
│ ├── auth.js
│ ├── banker.js
│ ├── business.js
│ ├── investor.js
│ ├── logger.js
│ └── firebaseConfig.js
├── index.html
└── 404.html

---

## 🚀 How to Run Locally

### 1. Clone the Repository

``bash
git clone https://github.com/mohamed-thoufiq/Bridge-Between-Investor-and-Business-Peoples.git
cd Bridge-Between-Investor-and-Business-Peoples
2. Set Up Firebase
Go to Firebase Console

Create a project

Enable Email/Password Authentication

Create a Cloud Firestore database

Replace the firebaseConfig in js/firebaseConfig.js with your own:

js
Copy code
// js/firebaseConfig.js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

3. Serve Locally
Use Live Server in VS Code
or

Use Firebase CLI:

firebase login
firebase init
firebase serve

🌐 Deployment
The app is deployed using Firebase Hosting.

To deploy:
firebase deploy


📑 Documentation
Firebase Firestore rules are configured for role-based access control

User actions (like login, posting, deleting) are logged using logger.js

Fully modular code organized per user role

Simple, responsive UI for better usability

📄 License
This project is licensed under the MIT License.

✨ Author
Made with 💻 by Mohamed Thoufiq
