import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MyBookings from "./MyBookings";

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
                console.log(res.data);
            } catch {
                toast.error("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="bg-white p-6 shadow-lg rounded-xl max-w-md mx-auto">
                <div className="flex items-center gap-5">

                    {/* Profile Image */}
                    <img
                        src={profile.user?.profilePic || "/default-avatar.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                    />

                    {/* User Info */}
                    <div className="flex-1 space-y-1">
                        <h2 className="text-xl font-bold text-blue-600">
                            {profile.user?.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {profile.user?.email}
                        </p>
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                            {profile.user?.role}
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t" />

                {/* Address */}
                {profile.user?.address && (
                    <p className="text-sm text-gray-700">
                        📍<span className="font-semibold"> Address : {profile.user.address.city}, {profile.user.address.state} </span>
                    </p>
                )}
            </div>


            <div className="bg-white p-5 shadow rounded">
                {/* <h2 className="text-xl font-bold mb-2 text-blue-600">My Bookings 📅</h2>

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
                ))} */}
                <MyBookings />
            </div>

        </div>
    );
}
