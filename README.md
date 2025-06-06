# 🩸 Blood Bank Management System

A full-fledged web-based Blood Bank Management System for seamless blood donation, request, and inventory coordination. Built with user-friendly interfaces and robust backend logic to support **donors**, **recipients**, and **administrators**.

---

## 🚀 Features

### 1. 👥 User Management
- ✅ **Registration** with role-based input (Donor / Recipient)
- ✅ **Login** with secure authentication
- ✅ **Role-based Dashboards** for Admin, Donor, and Recipient
- ✅ **Session Management** and secure logout

### 2. 🧭 Navigation & Pages
- ✅ **Home Page** with dynamic content
- ✅ **About Page** with organization details
- ✅ **Contact Page** with form and contact info
- ✅ **Search Page** to find blood banks and donors
- ✅ **Reports Page** with system analytics

### 3. 🩸 Donor Features
- ✅ **Personal Dashboard**
- ✅ **Appointment Scheduling** with calendar picker
- ✅ **Donation History** tracking
- ✅ **Eligibility Status** monitoring
- ✅ **Real-Time Notifications**

### 4. 🆘 Recipient Features
- ✅ **Personal Dashboard**
- ✅ **Blood Request Form** with urgency levels
- ✅ **Request Status Tracking**
- ✅ **Hospital Integration** for smooth processing

### 5. 🛠️ Admin Features
- ✅ **Comprehensive Admin Dashboard**
- ✅ **Blood Inventory Management**
- ✅ **Approval System** for requests
- ✅ **Appointment Oversight**
- ✅ **Analytics & Reporting Tools**

### 6. 🔐 Smart Navigation
- ✅ **Authentication-Aware Buttons** (Donate/Request redirect to login)
- ✅ **Role-Based Redirects** after login
- ✅ **Dynamic Header** showing user status
- ✅ **Protected Routes** for role-specific pages

---

## 🧪 Testing Guide

### ✅ Registration Flow
```plaintext
1. Visit /register
2. Fill form (e.g., test@example.com / password123 / Donor / O+)
3. Submit → See success message → Redirect to login
4. Login → Redirect to Donor Dashboard
👤 Pre-existing Test Accounts
Role	Email	Password
Admin	admin@lifeflow.com	admin123
Donor	john.doe@email.com	donor123
Recipient	sarah.johnson@email.com	recipient123

🔍 Navigation Testing
plaintext
Copy
Edit
1. Home → "Donate Now" / "Request Blood" → Redirect to login if not logged in
2. Proper redirection after login based on role
3. All navigation links function correctly
4. Logout clears session and redirects to home
🔧 Key Technical Highlights
🗃️ Shared User Storage: Unified registration & login system

📦 State Management: Persistent user session across views

📅 Reusable UI Components: Calendar picker, popovers, modals

✅ Form Validation: Real-time feedback with error handling

📱 Responsive Design: Fully mobile-compatible

🔒 Role-Based Access Control: Strict route protection

📱 Full User Journeys
👤 New User
Register → Login → Dashboard → Use Features → Logout

👥 Returning User
Login → Dashboard → Manage Tasks → Logout

🛡️ Admin
Login → Dashboard → Manage Users, Requests, Appointments

📂 Project Structure (Sample)
bash
Copy
Edit
/src
├── components/
├── pages/
├── services/
├── assets/
├── App.jsx
└── index.js
🤝 Contributing
Want to improve this system? Clone the repo, create a new branch, and submit a pull request.

bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/blood-bank-management.git
cd blood-bank-management
npm install  # or your build tool
📝 License
This project is licensed under the MIT License. See LICENSE file for details.

🌐 Live Demo
Add a link here if it's deployed (e.g., Render, Vercel, Netlify)

📬 Contact
For any queries or contributions, feel free to reach out at admin@lifeflow.com

Built with ❤️ to save lives.
