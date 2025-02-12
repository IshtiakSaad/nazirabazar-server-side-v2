# Nazirabazar Client Side 

Nazirabazar Client Side is the front-end portion of the Nazirabazar project, designed to provide users with a seamless experience in accessing job opportunities, managing accounts, and authenticating securely via email/password and Google. The application is built using React, styled with modern techniques, and integrates Firebase for authentication and data handling.

### 🌐 **Live Site URL**
[Visit Nazirabazar Here](https://job-portal-for-goribs.web.app/)

---

## 📋 **Features**
1. **Authentication**:
    - Email and password login.
    - Google login for quick access.
    - JWT-based token management for secure sessions.

2. **Pages**:
   - Secure login and registration using Firebase Authentication.
   - Includes both email/password-based authentication and Google login integration.

3. **Responsive Design**:
   - Optimized for all devices (mobile, tablet, desktop).
   - Uses TailwindCSS for clean, modern, and responsive UI.
   - Implemented animations and gradients for an engaging experience.

4. **Food Details Page**:
   - View detailed information about each Food, including its expiry date, cook, poster, and summary.
   - Options to request the food to your order or delete it if you’re the owner.

5. **Private Routes for Enhanced Security**:
   - Pages like "Add Food" and "My Requests" are protected, ensuring only authenticated users can access them.

---

##  **Tech Stack**
- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase (Frontend), Vercel (Backend)
- **JWT Handling**: Axios for API calls and token management.

---
## 🔐 Authentication Workflow
Login:

- Users authenticate with email/password or Google.
- On successful login, a JWT token is generated and stored in localStorage.
- JWT Validation: On every protected route, the token is validated before granting access.
- Logout: Removes the token from localStorage and redirects to the login page.

---
##  **Getting Started**
To get a local copy up and running, follow these steps:

### Dependencies
- Node.js installed
- MongoDB server running locally or remotely
- Firebase project configured

---

## 📝 **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**
We welcome contributions to improve **Nazirabazar**! Feel free to fork the repository, create a branch, and submit a pull request.