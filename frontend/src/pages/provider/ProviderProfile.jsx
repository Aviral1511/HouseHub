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

    const updateField = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const updateLocation = (e) =>
        setForm({
            ...form,
            location: { ...form.location, [e.target.name]: e.target.value }
        });

    const saveProfile = async () => {
        try {
            await axios.post(
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

    if (user?.role !== "provider") {
        return (
            <h2 className="text-center mt-16 text-xl font-semibold text-red-500">
                ⚠ Only Providers Can Access This Page
            </h2>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Provider Profile Setup 🔧
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Complete your profile to start receiving jobs
                    </p>
                </div>

                {/* Service Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Service Category
                    </label>
                    <select
                        name="serviceCategory"
                        className="input"
                        onChange={updateField}
                    >
                        <option value="">Select Service Category</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Cleaner">Cleaner</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="AC Repair">AC Repair</option>
                        <option value="Painter">Painter</option>
                    </select>
                </div>

                {/* Experience & Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Experience (Years)
                        </label>
                        <input
                            name="experience"
                            className="input"
                            placeholder="e.g. 5"
                            onChange={updateField}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Base Price (₹)
                        </label>
                        <input
                            name="basePrice"
                            className="input"
                            placeholder="e.g. 300"
                            onChange={updateField}
                        />
                    </div>
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        About Your Work
                    </label>
                    <textarea
                        name="bio"
                        className="input"
                        rows={4}
                        placeholder="Briefly describe your experience and services"
                        onChange={updateField}
                    />
                </div>

                {/* Location */}
                <div>
                    <h3 className="font-semibold mb-2 text-gray-700">
                        📍 Service Location
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            name="city"
                            className="input"
                            placeholder="City"
                            onChange={updateLocation}
                        />
                        <input
                            name="state"
                            className="input"
                            placeholder="State"
                            onChange={updateLocation}
                        />
                        <input
                            name="pincode"
                            className="input"
                            placeholder="Pincode"
                            onChange={updateLocation}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={saveProfile}
                    className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
                >
                    Save Profile 🚀
                </button>

            </div>
        </div>
    );
}
