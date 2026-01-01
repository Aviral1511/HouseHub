import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import ProviderProfile from "./pages/provider/ProviderProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceList from "./pages/ServiceList";
import ProviderList from "./pages/ProviderList";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/user/MyBookings"
import ProviderBookings from "./pages/provider/ProviderBookings";
import ChatRoom from "./pages/chat/ChatRoom";
import UserProfile from "./pages/user/UserProfile";
import PaymentPage from "./pages/PaymentPage";





export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/providers/:category" element={<ProviderList />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/provider/profile" element={<ProviderProfile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/provider/bookings" element={<ProviderBookings />} />
          <Route path="/chat/:id" element={<ChatRoom />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/payment/:bookingId/:amount/:providerId" element={<PaymentPage />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}
