import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", password: "", role: "user"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerUser = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", form);
            toast.success("Registered Successfully");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded w-96 space-y-4">

                <h2 className="text-xl font-bold text-center">Create Account 🏠</h2>

                <input className="input" name="name" onChange={handleChange} placeholder="Full Name" />
                <input className="input" name="email" onChange={handleChange} placeholder="Email" type="email" />
                <input className="input" name="password" onChange={handleChange} placeholder="Password" type="password" />

                <select className="input" name="role" onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="provider">Provider</option>
                </select>

                <button onClick={registerUser} className="btn-primary">Register</button>

                <p className="text-sm text-center">
                    Already have an account?
                    <span className="text-blue-500 cursor-pointer ml-1" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
