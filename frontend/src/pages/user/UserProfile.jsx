/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MyBookings from "./MyBookings";
import ProviderBookings from "../provider/ProviderBookings";

export default function UserProfile() {
    const { token } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);


    const fetchProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/user/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(res.data);
            setForm({
                name: res.data.user.name,
                phone: res.data.user.phone,
                city: res.data.user.address?.city
            });

            // console.log(res.data);
        } catch {
            toast.error("Failed to load profile");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("phone", form.phone || "");
            formData.append("address", JSON.stringify(form.address || {}));

            if (image) {
                formData.append("image", image); // 🔥 optional
            }

            await axios.put(
                "http://localhost:8000/api/user/profile",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Profile updated");
            setImage(null);
            setPreview(null);
            setEditMode(false);
            fetchProfile();
        } catch (error) {
            console.log(error);
        }
    }

    if (!profile)
        return <p className="text-center mt-20 text-gray-500">Loading profile…</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">

            {/* PROFILE CARD */}
            <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto">
                <div className="flex items-center gap-6">

                    {/* Avatar */}
                    <img
                        src={profile.user?.profilePic || "/default-avatar.png"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                    />

                    {/* Info */}
                    <div className="flex-1 space-y-1">
                        <h2 className="text-2xl font-bold text-blue-600">
                            {profile.user?.name}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {profile.user?.email}
                        </p>

                        <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold uppercase tracking-wide">
                            {profile.user?.role}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t" />

                {/* Address */}
                {profile.user?.address && (
                    <p className="text-sm text-gray-700 mb-3">
                        📍 <span className="font-semibold">Address:</span>{" "}
                        {profile.user.address.city}, {profile.user.address.state}
                    </p>
                )}

                {/* Edit Mode */}
                {editMode ? (
                    <form className="space-y-4 mt-4" onSubmit={onSubmit}>

                        <input
                            className="input"
                            value={form?.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                        />

                        <input
                            className="input"
                            value={form?.phone || ""}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="Phone"
                        />

                        <input
                            className="input"
                            value={form?.address?.city || ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: { ...form.address, city: e.target.value }
                                })
                            }
                            placeholder="City"
                        />

                        {/* IMAGE UPLOAD */}
                        <div className="flex items-center gap-5">
                            <img
                                src={
                                    preview ||
                                    profile.user?.profilePic ||
                                    "/default-avatar.png"
                                }
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                            />

                            <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                    }}
                                />
                            </label>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                onClick={() => {
                                    setEditMode(false);
                                    setImage(null);
                                    setPreview(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>
                )}

            </div>

            {/* BOOKINGS / JOBS SECTION */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                {profile.user?.role === "user" && <MyBookings />}
                {profile.user?.role === "provider" && <ProviderBookings />}
            </div>

        </div>
    );
}
