import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const { token } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        accepted: "bg-blue-100 text-blue-700",
        in_progress: "bg-purple-100 text-purple-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/bookings/my", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(res.data);
            } catch {
                toast.error("Failed to fetch your bookings");
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                My Bookings 📅
            </h2>

            {bookings.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    You don’t have any bookings yet.
                </p>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
                    >
                        {/* Top Section */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Sevice : {b.serviceId?.name}
                            </h3>

                            <p className="text-sm text-gray-600">
                                Helper :{" "}
                                <span className="font-medium text-gray-800">
                                    {b.provider?.userId?.name || "—"}
                                </span>
                            </p>

                            <span
                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColor[b.status]}`}
                            >
                                {b.status.replace("_", " ").toUpperCase()}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex justify-between items-center">
                            <Link
                                to={`/chat/${b._id}`}
                                className="text-sm text-blue-600 hover:underline font-medium"
                            >
                                💬 Open Chat
                            </Link>

                            {b.status === "completed" && !b.reviewed && (
                                <Link
                                    to={`/review/${b.provider?._id}/${b._id}`}
                                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                >
                                    ⭐ Rate Service
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
