import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProviderProfile() {
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        serviceCategory: "",
        experience: "",
        bio: "",
        basePrice: "",
        location: { city: "", state: "", pincode: "" }
    });

    const updateField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const updateLocation = (e) =>
        setForm({
            ...form,
            location: { ...form.location, [e.target.name]: e.target.value }
        });

    const saveProfile = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/provider/create",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Profile created successfully!");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create profile");
        }
    };

    if (user?.role !== "provider")
        return <h2 className="text-center mt-10 text-xl">⚠ Only Providers Can Access This Page!</h2>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow mt-10 rounded space-y-4">

            <h2 className="text-2xl font-bold text-center text-blue-600">
                Provider Profile Setup 🔧
            </h2>

            <select name="serviceCategory" className="input" onChange={updateField}>
                <option value="">Select Service Category</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Carpenter">Carpenter</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Painter">Painter</option>
            </select>

            <input name="experience" className="input" placeholder="Experience (years)" onChange={updateField} />
            <input name="basePrice" className="input" placeholder="Base Price" onChange={updateField} />

            <textarea
                name="bio"
                className="input"
                placeholder="Short description about your work"
                rows={3}
                onChange={updateField}
            />

            <h3 className="font-semibold">Location:</h3>
            <input name="city" className="input" placeholder="City" onChange={updateLocation} />
            <input name="state" className="input" placeholder="State" onChange={updateLocation} />
            <input name="pincode" className="input" placeholder="Pincode" onChange={updateLocation} />

            <button className="btn-primary" onClick={saveProfile}>
                Save Profile
            </button>

        </div>
    );
}
