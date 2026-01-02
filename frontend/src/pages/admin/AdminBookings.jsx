import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminBookings() {
    const { token } = useSelector(s => s.auth);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/bookings", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setData(res.data));
    }, []);

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        accepted: "bg-blue-100 text-blue-700",
        in_progress: "bg-purple-100 text-purple-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">📦 All Bookings</h2>

            <div className="space-y-4">
                {data.map(b => (
                    <div key={b._id} className="bg-white rounded-xl shadow p-5 space-y-1">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">
                                {b.serviceId?.name || "Service"}
                            </h3>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}
                            >
                                {b.status.replace("_", " ")}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">
                            User: <span className="font-medium">{b.userId?.name}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Provider: <span className="font-medium">{b.providerId?.userId?.name}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

