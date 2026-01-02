import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const { token, user } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/user/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch {
                toast.error("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="bg-white p-5 shadow rounded">
                <h2 className="text-2xl font-bold text-blue-600">My Profile 🧑</h2>

                <p><strong>Name:</strong> {profile.user?.name}</p>
                <p><strong>Email:</strong> {profile.user?.email}</p>
                <p><strong>Role:</strong> {profile.user?.role}</p>
                <p><strong>Pic:</strong> {profile.user?.profilePic}</p>
                {profile.user?.address && (
                    <p><strong>Address:</strong> {profile.user?.address.city}, {profile.user?.address.state}</p>
                )}

                {/* Future: Add Profile edit popup */}
            </div>

            <div className="bg-white p-5 shadow rounded">
                <h2 className="text-xl font-bold mb-2 text-blue-600">My Bookings 📅</h2>

                {profile.bookings.length === 0 && <p>No bookings yet.</p>}

                {profile.bookings.map((b) => (
                    <div key={b._id} className="border p-3 rounded my-2 flex justify-between">
                        <div>
                            <p><strong>Service:</strong> {b.serviceId?.name}</p>
                            <p><strong>Provider:</strong> {b.providerId?.userId?.name}</p>
                            <p><strong>Status:</strong> {b.status}</p>
                        </div>

                        <Link to={`/chat/${b._id}`} className="text-blue-500 underline self-center">
                            Chat →
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
