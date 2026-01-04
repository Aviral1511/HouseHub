# 🏠 HouseHub — AI-Powered Home Services Marketplace

HouseHub is a **full-stack, AI-powered home services platform** that connects users with verified service providers for on-demand home services like plumbing, electrical work, cleaning, and more.  
The platform integrates **Generative AI**, **real-time chat**, **image sharing**, and **secure payments** to deliver a modern, production-ready user experience.

---

## ✨ Key Features

### 👤 User Features

- Browse and book home services from verified providers
- **AI Assistant** to analyze issues and recommend the right service
- **AI Chat Mode** for conversational assistance
- Real-time chat with providers (supports image sharing)
- Secure online payments
- Booking history, ratings, and reviews
- Edit profile with optional profile picture upload

### 🧑‍🔧 Provider Features

- Dedicated provider profile with ratings and reviews
- Manage bookings and communicate with users in real time
- Image-based chat for issue clarification
- Edit provider details (bio, experience, pricing, profile photo)

### 🔐 Admin Features

- Admin dashboard for managing users, providers, and bookings
- Provider approval and moderation
- Platform-level monitoring and control

---

## 🤖 AI Capabilities

- **Quick AI Assistant**: Instantly analyzes user problems and suggests the correct service category
- **Conversational AI Chat**: Multi-turn chat using Google Gemini for deeper assistance
- AI-driven UX designed to improve booking accuracy and user confidence

---

## 🧰 Tech Stack

### Frontend

- **React.js**
- **Redux Toolkit** (state management & persistence)
- **Tailwind CSS**
- **React Router**
- **Socket.IO Client**
- **React Toastify**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Socket.IO**
- **Multer (memory storage)**

### AI & Cloud Services

- **Google Gemini API** (Generative AI & Chat)
- **Cloudinary** (image upload & storage)

### Payments

- **Razorpay**

---

## 📂 Project Structure

```bash
househub/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── seed/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── redux/
│   │   └── App.jsx
│
└── README.md
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/househub.git
cd househub
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create a .env file:

```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

**Run backend:**

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌱 Database Seeding

Populate the database with sample users, providers, and admins:

```bash
node backend/seed/seed.js
```

**Default Credentials :**

```bash
User:     firstname@user1.com     | password123
Provider: firstname@user1.com     | password123
Admin:    admin1@househub.com    | admin123
```

## 📸 Screenshots
<img width="1878" height="885" alt="image" src="https://github.com/user-attachments/assets/eb98af61-474f-4b34-b3ff-4c1c87c796a3" />
<img width="1694" height="875" alt="image" src="https://github.com/user-attachments/assets/e42cad79-ce14-4e0e-a95a-28d1ff95c033" />
<img width="1805" height="755" alt="image" src="https://github.com/user-attachments/assets/d573df8f-8fc8-4658-850d-d4834d15ed9e" />
<img width="865" height="758" alt="image" src="https://github.com/user-attachments/assets/95d59cf5-20e2-41bb-92a6-7a96cf427f57" />
<img width="895" height="942" alt="image" src="https://github.com/user-attachments/assets/9d34ed4f-8086-432d-9c82-daad4b824d0d" />
<img width="1396" height="357" alt="image" src="https://github.com/user-attachments/assets/70b9fe06-80b2-4b81-96b6-2fc800c2e3b7" />


## 💬 Real-Time Chat & Image Sharing

Powered by Socket.IO
Supports:

- Instant messaging
- Image uploads (Cloudinary)
- Booking-specific chat rooms

## 🔐 Authentication & Security

- JWT-based authentication
- Role-based access control (User / Provider / Admin)
- Secure API routes with middleware protection
- Persistent login using Redux Persist

## 📈 Project Status

- Core Features: ✅ Completed
- AI Integration: ✅ Completed
- Real-Time Chat + Images: ✅ Completed
- Profile Management: ✅ Completed
- Deployment: 🚀 In Progress

## 🌟 Future Enhancements

- Stripe payment integration
- Push notifications
- Advanced AI image understanding
- Mobile application (React Native)

## ⭐ Support

If this project helped or inspired you, consider giving it a Star ⭐!, and feel free to contribute to it.

## 📬 Author

- **Name - Aviral Tiwari**
- Contact: aviral.legend520@gmail.com
- Linkedin - https://www.linkedin.com/in/aviral-tiwari-78620524b/
