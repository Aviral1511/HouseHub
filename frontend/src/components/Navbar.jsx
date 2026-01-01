import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.info("Logged out");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">HouseHub 🏠</Link>

            <div className="flex items-center gap-4">
                {!user ? (
                    <>
                        <Link to="/login" className="text-blue-500 font-medium">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="font-medium">
                            Hi, <span className="text-blue-600">{user?.name}</span>
                        </span>

                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
