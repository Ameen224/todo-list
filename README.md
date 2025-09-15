# 🚀 Task Tracker - MERN Stack

A **Task Tracking Application** built using the **MERN stack**.  
It allows users to **sign up, log in, add, edit, delete, and mark tasks as completed**, with a **clean responsive UI** powered by **React + Tailwind CSS**.

---

## ✨ Features

- 🔐 **User Authentication** (Signup / Login / Logout with JWT)  
- ✅ **CRUD Operations** for tasks  
- 📑 **Task Details Page**  
- 🎨 **Modern UI** with TailwindCSS (Dark Mode enabled)  
- 🔄 **Protected Routes** using React Router  
- 📱 **Responsive Design** (mobile & desktop)

---

## 🛠️ Tech Stack

### 🔹 Frontend
- ⚛️ React (Vite)  
- 🔗 React Router  
- 📡 Axios  
- 🎨 Tailwind CSS (with Dark Mode)

### 🔹 Backend
- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB + Mongoose  
- 🔑 JWT (JSON Web Tokens) for authentication  
- 🔒 bcrypt.js for password hashing  

---

## ⚙️ Installation


```bash
1️⃣ Clone Repository
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
2️⃣ Setup Backend
cd backend
npm install


Create a .env file inside backend/:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/tasktracker
JWT_SECRET=your_secret_key


Run backend:

npm start

3️⃣ Setup Frontend
cd frontend
npm install


Create a .env file inside frontend/:

VITE_BACKEND_URL=http://localhost:4000/api


Run frontend:

npm run dev

🚀 Usage

Open frontend at http://localhost:5173

Create an account or login

Add new tasks, mark as completed, delete, or view details

Logout when done

📂 Project Structure
task-tracker/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
│
└── README.md

