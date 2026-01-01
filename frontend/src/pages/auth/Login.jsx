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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const loginUser = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", form);
            dispatch(loginSuccess(res.data));
            toast.success("Login Successful");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded w-96 space-y-5">

                <h2 className="text-xl font-bold text-center">Welcome Back! 🔑</h2>

                <input className="input" name="email" placeholder="Email" type="email" onChange={handleChange} />
                <input className="input" name="password" placeholder="Password" type="password" onChange={handleChange} />

                <button onClick={loginUser} className="btn-primary">Login</button>

                <p className="text-sm text-center">
                    New here?
                    <span className="text-blue-500 cursor-pointer ml-1" onClick={() => navigate("/register")}>
                        Create Account
                    </span>
                </p>

            </div>
        </div>
    );
}
