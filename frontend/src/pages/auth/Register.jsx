import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", password: "", role: "user"
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const registerUser = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/register", form);
            toast.success("Registered Successfully 🎉");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Create Account 🏠
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Join HouseHub and get started today
                    </p>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="name"
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        placeholder="Email address"
                    />
                    <input
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Password"
                    />

                    <select
                        className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        name="role"
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="provider">Provider</option>
                    </select>
                </div>

                {/* Button */}
                <button
                    onClick={registerUser}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Register
                </button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-600">
                    Already have an account?
                    <span
                        className="ml-1 text-blue-600 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
