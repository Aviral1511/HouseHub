import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProviderBookings() {
    const { token } = useSelector((state) => state.auth);
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/bookings/provider", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setJobs(res.data);
        } catch {
            toast.error("Failed to load jobs");
        }
    };

    const acceptJob = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/bookings/accept/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Booking accepted!");
            fetchJobs();
        } catch { toast.error("Error accepting booking"); }
    };

    const completeJob = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/bookings/complete/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Job completed!");
            fetchJobs();
        } catch { toast.error("Error completing job"); }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/bookings/provider", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJobs(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load jobs");
            }
        }; fetchJobs();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Assigned Requests 🛠</h2>

            {jobs.map(job => (
                <div key={job._id} className="border p-4 bg-white rounded shadow mb-3">
                    <p className="font-bold">Customer: {job.userId?.name}</p>
                    <p>Service: {job.serviceId?.name}</p>
                    <p>Status: {job.status}</p>

                    {job.status === "pending" && (
                        <button onClick={() => acceptJob(job._id)} className="btn-primary mt-2">Accept</button>
                    )}

                    {job.status === "accepted" && (
                        <button onClick={() => completeJob(job._id)} className="btn-primary mt-2">Mark Complete</button>
                    )}
                </div>
            ))}
        </div>
    );
}
