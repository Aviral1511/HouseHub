import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const { token } = useSelector((state) => state.auth);
    const [bookings, setBookings] = useState([]);
    const statusColor = {
        pending: "text-yellow-600",
        accepted: "text-blue-600",
        in_progress: "text-purple-600",
        completed: "text-green-600",
        cancelled: "text-red-600",
    };



    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/bookings/my", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(res.data);
                console.log(res.data);
            } catch {
                toast.error("Failed to fetch your bookings");
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">My Bookings 📅</h2>

            {bookings.map((b) => (
                <div key={b._id} className="border p-4 rounded shadow mb-3 bg-white">
                    <h3 className="font-bold">{b.serviceId?.name}</h3>
                    <p>Provider: <span className="font-semibold">{b.providerId?.userId?.name}</span></p>
                    <p>
                        Status:{" "}
                        <span className={`font-semibold ${statusColor[b.status]}`}>
                            {b.status.replace("_", " ").toUpperCase()}
                        </span>
                    </p>


                    <Link to={`/chat/${b._id}`} className="text-sm text-blue-500 underline">
                        Open Chat
                    </Link>
                    {b.status === "completed" && !b.reviewed && (
                        <Link to={`/review/${b.providerId?._id}/${b._id}`}
                            className="btn-primary text-sm inline-block mt-2">
                            Rate Service
                        </Link>
                    )}

                </div>
            ))}
        </div>
    );
}
