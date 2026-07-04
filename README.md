<div align="center">

# ⚡ EV Service Management System

### A full-stack web application for managing electric vehicle service bookings, vehicle fleet tracking, and maintenance scheduling.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

![JavaScript](https://img.shields.io/badge/JavaScript-89.1%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-10.4%25-1572B6?style=flat-square&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-0.5%25-E34F26?style=flat-square&logo=html5&logoColor=white)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 About the Project

**EV Manager** is a comprehensive MERN-stack platform designed to simplify EV (Electric Vehicle) service management. Whether you're a vehicle owner booking your next maintenance appointment or an admin managing service operations across the fleet — this application provides an intuitive, role-based experience.

The platform features **JWT-based authentication**, **role-based access control** (Customer & Admin), a rich **user dashboard** for tracking vehicles and service history, and a full-featured **admin panel** for managing users, service bookings, and monitoring revenue analytics.

---

## ✨ Features

### 👤 Customer Portal
- **User Registration & Login** — Secure authentication with JWT tokens and bcrypt password hashing
- **Vehicle Management** — Register, update, and delete EV vehicles with details like make, model, year, license plate, battery health, and mileage
- **Service Booking** — Book maintenance services for registered vehicles with preferred dates and notes
- **Dashboard** — At-a-glance view of registered vehicles, active bookings, and complete service history
- **Maintenance Records** — Browse past and current service records with status tracking

### 🛡️ Admin Panel
- **Admin Dashboard** — Overview stats including total users, pending bookings, completed services, and total revenue
- **Service Management** — View all service bookings across the platform and update their status (pending → active → completed/cancelled), add cost and mechanic notes
- **User Management** — View all registered users and their details
- **System Status Monitor** — Real-time operational status of API Gateway and Database Cluster

### 🔒 Security
- **JWT Authentication** — 30-day token expiry with Bearer token authorization
- **Password Hashing** — bcrypt with 10 salt rounds
- **Protected Routes** — Client-side route guards + server-side middleware
- **Role-Based Access Control** — Customer and Admin roles with granular permissions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client with JWT interceptor |
| **Lucide React** | Icon library |
| **Context API** | Global auth state management |
| **Vanilla CSS** | Custom styling with CSS variables, glassmorphism, and animations |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **Mongoose 9** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **cors** | Cross-Origin Resource Sharing |
| **dotenv** | Environment variable management |
| **express-async-handler** | Async error handling wrapper |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |

---

## 🏗️ Architecture

```
┌─────────────────────┐         ┌─────────────────────┐         ┌──────────────────┐
│                     │  HTTP   │                     │ Mongoose│                  │
│   React Frontend    │◄──────►│  Express Backend    │◄───────►│  MongoDB Atlas   │
│   (Vite + React 19) │  :5173  │  (Node.js + JWT)    │  :5000  │  (Cloud DB)      │
│                     │         │                     │         │                  │
└─────────────────────┘         └─────────────────────┘         └──────────────────┘
         │                              │
         │ Axios + JWT Interceptor      │ Middleware Stack:
         │ Context API (Auth State)     │ • CORS
         │ React Router (Protected)     │ • JSON Parser
         │                              │ • Auth (protect + admin)
         │                              │ • Error Handler
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git**

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Hemanth19i/EV-Service-Management-System.git
cd EV-Service-Management-System
```

**2. Setup the Backend**

```bash
cd server
npm install
```

**3. Configure environment variables**

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**4. Setup the Frontend**

```bash
cd ../client
npm install
```

**5. Run the application**

Start the backend server (from the `server/` directory):
```bash
node server.js
```

Start the frontend dev server (from the `client/` directory):
```bash
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login & get JWT token |
| `GET` | `/api/auth/profile` | Private | Get current user profile |
| `GET` | `/api/auth/users` | Admin | Get all registered users |

### Vehicles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/vehicles` | Private | Get user's vehicles |
| `POST` | `/api/vehicles` | Private | Register a new vehicle |
| `PUT` | `/api/vehicles/:id` | Private | Update a vehicle |
| `DELETE` | `/api/vehicles/:id` | Private | Delete a vehicle |
| `GET` | `/api/vehicles/admin` | Admin | Get all vehicles (all users) |

### Service Bookings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/services` | Private | Get user's service bookings |
| `POST` | `/api/services` | Private | Create a new service booking |
| `GET` | `/api/services/admin` | Admin | Get all service bookings |
| `PUT` | `/api/services/:id/status` | Admin | Update booking status & cost |

> **Authentication**: All private/admin endpoints require a `Bearer` token in the `Authorization` header.
> ```
> Authorization: Bearer <your_jwt_token>
> ```

---

## 🗄️ Database Schema

### User
```javascript
{
  name:      String    // Required
  email:     String    // Required, Unique
  password:  String    // Required, Hashed (bcrypt)
  role:      String    // Enum: ['Customer', 'Admin'], Default: 'Customer'
  timestamps: true     // createdAt, updatedAt
}
```

### Vehicle
```javascript
{
  user:          ObjectId  // Ref → User (Required)
  make:          String    // Required (e.g., "Tesla")
  model:         String    // Required (e.g., "Model 3")
  year:          Number    // Required (e.g., 2024)
  licensePlate:  String    // Required, Unique
  batteryHealth: Number    // Default: 100 (percentage)
  mileage:       Number    // Default: 0
  isActive:      Boolean   // Default: true
  timestamps:    true      // createdAt, updatedAt
}
```

### ServiceBooking
```javascript
{
  user:          ObjectId  // Ref → User (Required)
  vehicle:       ObjectId  // Ref → Vehicle (Required)
  serviceType:   String    // Required (e.g., "Battery Checkup")
  preferredDate: Date      // Required
  notes:         String    // Optional customer notes
  status:        String    // Enum: ['pending', 'active', 'completed', 'cancelled'], Default: 'pending'
  cost:          Number    // Default: 0.00
  mechanicNotes: String    // Optional admin/mechanic notes
  timestamps:    true      // createdAt, updatedAt
}
```

---

## 📁 Folder Structure

```
EV-Service-Management-System/
├── client/                          # Frontend (React + Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             # Axios instance with JWT interceptor
│   │   ├── assets/                  # Images & media
│   │   ├── components/
│   │   │   ├── Footer.jsx           # App footer
│   │   │   ├── Layout.jsx           # Page layout wrapper
│   │   │   ├── Navbar.jsx           # Navigation bar with auth state
│   │   │   └── ProtectedRoute.jsx   # Route guard (user & admin)
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state (login, register, logout)
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login form
│   │   │   ├── Register.jsx         # Registration form
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── Vehicles.jsx         # Vehicle CRUD management
│   │   │   ├── Services.jsx         # Service booking management
│   │   │   ├── MaintenanceRecords.jsx # Service history view
│   │   │   ├── AdminDashboard.jsx   # Admin analytics overview
│   │   │   ├── AdminServices.jsx    # Admin service management
│   │   │   └── AdminUsers.jsx       # Admin user management
│   │   ├── App.jsx                  # Root component with routes
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   └── package.json
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (register, login, profile)
│   │   ├── vehicleController.js     # Vehicle CRUD operations
│   │   └── serviceController.js     # Service booking operations
│   ├── middlewares/
│   │   ├── authMiddleware.js        # JWT verification & admin check
│   │   └── errorMiddleware.js       # Error & 404 handlers
│   ├── models/
│   │   ├── User.js                  # User schema with password hashing
│   │   ├── Vehicle.js               # Vehicle schema
│   │   └── ServiceBooking.js        # Service booking schema
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth routes
│   │   ├── vehicleRoutes.js         # /api/vehicles routes
│   │   └── serviceRoutes.js         # /api/services routes
│   ├── server.js                    # Express app entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

> _Screenshots coming soon! Run the app locally to see the full UI._

<!-- Add screenshots here
![Home Page](screenshots/home.png)
![Dashboard](screenshots/dashboard.png)
![Admin Panel](screenshots/admin.png)
-->

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Hemanth](https://github.com/Hemanth19i)**

⭐ Star this repo if you found it helpful!

</div>
