import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import React, { useState } from "react";
import { FiUser, FiLogOut, FiMenu, FiX, FiMessageCircle, FiHome } from "react-icons/fi";

export default function Navbar() {
    const { user } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // mobile menu toggle
    const [dropdown, setDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-1">
                    <FiHome size={24} /> HouseHub
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">

                    <Link to="/services" className="hover:text-blue-600 font-medium">Services</Link>
                    <Link to="/ai-chat" className="hover:text-blue-600 flex items-center gap-1 font-medium">
                        <FiMessageCircle /> AI Assistant
                    </Link>

                    {user ? (
                        <div className="relative">

                            {/* Avatar Button */}
                            <img
                                src={user?.profilePic || "https://i.ibb.co/2Fsf1Dv/default-user.png"}
                                alt="user"
                                className="w-10 h-10 rounded-full cursor-pointer border hover:border-blue-600"
                                onClick={() => setDropdown(!dropdown)}
                            />

                            {/* Dropdown */}
                            {dropdown && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-3 w-40 text-sm">
                                    <Link to="/profile" className="block py-1 hover:text-blue-600">
                                        <FiUser className="inline mr-1" /> Profile
                                    </Link>

                                    <Link to="/my-bookings" className="block py-1 hover:text-blue-600">
                                        📅 My Bookings
                                    </Link>

                                    {user.role === "provider" && (
                                        <Link to="/provider/bookings" className="block py-1 hover:text-blue-600">
                                            🛠 Provider Panel
                                        </Link>
                                    )}

                                    {user.role === "admin" && (
                                        <Link to="/admin" className="block py-1 hover:text-blue-600">
                                            🔐 Admin Dashboard
                                        </Link>
                                    )}

                                    <button onClick={handleLogout} className="block py-1 hover:text-red-500">
                                        <FiLogOut className="inline m-auto" /> Logout
                                    </button>
                                </div>
                            )}

                        </div>

                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
                            <Link to="/register" className="px-4 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white">Sign Up</Link>
                        </div>
                    )}

                </div>

                {/* Mobile Icon */}
                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t p-4 space-y-3 text-center">

                    <Link to="/services" className="block font-medium">Services</Link>
                    <Link to="/ai-chat" className="block font-medium">AI Assistant</Link>

                    {user ? (
                        <>
                            <Link to="/profile" className="block">Profile</Link>
                            <Link to="/my-bookings" className="block">My Bookings</Link>
                            {user.role === "provider" && <Link to="/provider/bookings" className="block">Provider Panel</Link>}
                            {user.role === "admin" && <Link to="/admin" className="block">Admin Dashboard</Link>}
                            <button onClick={handleLogout} className="block text-red-500">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block">Login</Link>
                            <Link to="/register" className="block">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
