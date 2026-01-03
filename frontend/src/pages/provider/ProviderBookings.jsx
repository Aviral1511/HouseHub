/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProviderBookings() {
    const { token } = useSelector((state) => state.auth);
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/bookings/provider", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(res.data);
        } catch {
            toast.error("Failed to load jobs");
        }
    };

    const acceptJob = async (id) => {
        try {
            await axios.put(
                `http://localhost:8000/api/bookings/accept/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Booking accepted!");
            fetchJobs();
        } catch {
            toast.error("Error accepting booking");
        }
    };

    const completeJob = async (id) => {
        try {
            await axios.put(
                `http://localhost:8000/api/bookings/complete/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Job completed!");
            fetchJobs();
        } catch {
            toast.error("Error completing job");
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        accepted: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                Assigned Requests 🛠
            </h2>

            {jobs.length === 0 && (
                <p className="text-center text-gray-500">
                    No service requests assigned yet.
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100"
                    >
                        {/* Top Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    👤 {job.userId?.name}
                                </h3>

                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor[job.status]}`}
                                >
                                    {job.status.replace("_", " ").toUpperCase()}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                🔧 <span className="font-medium">{job.serviceId?.name}</span>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="my-4 border-t" />

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-3">
                            <Link
                                to={`/chat/${job._id}`}
                                className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                            >
                                💬 Open Chat
                            </Link>

                            <div className="flex gap-2">
                                {job.status === "pending" && (
                                    <button
                                        onClick={() => acceptJob(job._id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                                    >
                                        Accept Job
                                    </button>
                                )}

                                {job.status === "accepted" && (
                                    <button
                                        onClick={() => completeJob(job._id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                    >
                                        Mark Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
