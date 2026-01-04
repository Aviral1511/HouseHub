import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiLogOut, FiMenu, FiX, FiMessageCircle, FiHome } from "react-icons/fi";

export default function Navbar() {
    const { user } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const dropdownRef = useRef(null);
    const avatarRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                !avatarRef.current.contains(e.target)
            ) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-linear-to-r from-green-200 via-green-300 to-cyan-300 backdrop-blur border-b-2 border-blue-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <FiHome size={24} /> HouseHub
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">

                    <Link to="/services" className="font-medium hover:text-blue-600 transition">
                        Services
                    </Link>

                    <Link to="/ai-chat" className="flex items-center gap-1 font-medium hover:text-blue-600 transition">
                        <FiMessageCircle /> HouseHub AI
                    </Link>
                    {user?.role === "provider" && (
                        <Link to="/provider/bookings" className="flex items-center gap-1 font-medium hover:text-blue-600 transition">
                            🛠 Provider Panel
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin" className="flex items-center font-medium hover:text-blue-600 transition">
                            🔐 Admin Dashboard
                        </Link>
                    )}

                    {user ? (
                        <div className="relative">

                            {/* Avatar */}
                            <img
                                ref={avatarRef}
                                src={user?.profilePic || "https://i.ibb.co/2Fsf1Dv/default-user.png"}
                                alt="user"
                                className="w-11 h-11 rounded-full cursor-pointer border-2 border-gray-500 hover:border-blue-500 transition"
                                onClick={() => setDropdown(prev => !prev)}
                            />

                            {/* Dropdown */}
                            {dropdown && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-3 w-44 bg-blue-100 shadow-xl rounded-lg text-sm py-2 animate-fade-in"
                                >
                                    <Link to="/profile" className="dropdown-item">
                                        <FiUser /> Profile
                                    </Link>

                                    {user?.role === "user" && <Link to="/my-bookings" className="dropdown-item">
                                        📅 My Bookings
                                    </Link>}
                                    {user?.role === "provider" && <Link to="/provider/profile" className="dropdown-item">
                                        Edit Profile
                                    </Link>}
                                    {user?.role === "provider" && <Link to="/provider/bookings" className="dropdown-item">
                                        📅 My Bookings
                                    </Link>}



                                    <div className="dropdown-item text-red-600 cursor-pointer flex">
                                        <button
                                            onClick={handleLogout}
                                            className=""
                                        >
                                            Logout
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="btn-primary-sm">Login</Link>
                            <Link to="/register" className="btn-outline-sm">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-blue-100 border-2 rounded-lg px-6 py-4 space-y-3 text-center">
                    <Link to="/services" className="mobile-link">Services</Link>
                    <Link to="/ai-chat" className="mobile-link">HouseHub AI</Link>
                    {user?.role === "provider" && <Link to="/provider/profile" className="mobile-link">Edit Profile</Link>}
                    {user?.role === "provider" && <Link to="/provider/bookings" className="mobile-link">Provider Panel</Link>}
                    {user?.role === "admin" && <Link to="/admin" className="mobile-link">Admin Dashboard</Link>}

                    {user ? (
                        <>
                            <Link to="/profile" className="mobile-link">Profile</Link>
                            <Link to="/my-bookings" className="mobile-link">My Bookings</Link>
                            <div className="mobile-link text-red-500 cursor-pointer">
                                <button onClick={handleLogout} >Logout</button>

                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mobile-link">Login</Link>
                            <Link to="/register" className="mobile-link">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
