PERN Courier Service App

<img width="1315" height="867" alt="Image" src="https://github.com/user-attachments/assets/2d1b677e-e409-4f73-bf21-e4ed80f353f1" />

A full-stack courier management application built using the **PERN Stack**:

* PostgreSQL
* Express.js
* React (Vite)
* Node.js

The application allows users to register, login, create shipments, track shipments, Admin users can view all shipments.

---

Features

* User Registration & Login (JWT Authentication)
* Role-based Access (Admin / Client)
* Create Shipment
* View My Shipments
* Admin Dashboard (View All Shipments)

---

Tech Stack

**Frontend**

* React + Vite
* Axios
* Tailwind CSS

**Backend**

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication

---


---

Environment Variables (IMPORTANT)

Create a `.env` file inside the **backend** folder.

Example:

```
PORT=5001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---

Database Setup

1. Create a PostgreSQL database.
2. Create required tables (users & shipments).
3. Update `.env` with your database credentials.

---

How to Run the Application

### 1) Clone Repository

```
git clone <YOUR_REPO_LINK>
cd pern-courier-app
```

---

### 2) Install Backend Dependencies

```
cd Backend
npm install
```

---

### 3) Install Frontend Dependencies

```
cd ../frontend
npm install
```

---

### 4) Run Backend Server

```
cd Backend
npm run dev
```

Server runs on:

```
http://localhost:5001
```

---

### 5) Run Frontend

```
cd frontend
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 👤 User Roles

### Client User

* Create shipments
* View personal shipments
* Track Shipments

### Admin User

* View all shipments
* Create Shipment
* Track Shipments

---


## Notes

* `.env` file is excluded for security.
* Run `npm install` after cloning.
* Node modules are not included in the repository.

---

## Author

### Zaahid
