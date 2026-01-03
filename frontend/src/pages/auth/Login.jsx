import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice.js";
import { toast } from "react-toastify";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const loginUser = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/auth/login",
                form
            );
            dispatch(loginSuccess(res.data));
            toast.success("Login Successful 🎉");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Login to continue to HouseHub
                    </p>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        placeholder="Email address"
                        type="email"
                        onChange={handleChange}
                    />
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                    />
                </div>

                {/* Button */}
                <button
                    onClick={loginUser}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-600">
                    New here?
                    <span
                        className="ml-1 text-blue-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Create an account
                    </span>
                </p>

            </div>
        </div>
    );
}
