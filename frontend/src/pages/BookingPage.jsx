import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function BookingPage() {
    const { providerId, serviceId } = useParams();
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/provider/${providerId}`
                );
                setProvider(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProvider();
    }, [providerId]);

    const createBooking = async () => {
        if (!date || !address || !totalAmount)
            return toast.error("Please fill all details");

        try {
            await axios.post(
                "http://localhost:8000/api/bookings/create",
                {
                    providerId: provider.userId,
                    serviceId,
                    scheduledDate: date,
                    address,
                    totalAmount,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Booking created successfully 🎉");
            navigate("/my-bookings");
        } catch (err) {
            toast.error(err.response?.data?.message || "Booking Failed");
        }
    };

    if (!user || user.role !== "user")
        return (
            <p className="text-center text-lg mt-12 text-red-500 font-medium">
                ⚠ Only users can book services
            </p>
        );

    // console.log(provider);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        Book Service 🛠
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Schedule your service in a few easy steps
                    </p>
                </div>

                {/* Provider Info */}
                {provider && (
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                        <img
                            src={provider.userId?.profilePic}
                            alt="provider"
                            className="w-14 h-14 rounded-full object-cover border"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">
                                {provider.userId?.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {provider.serviceCategory} • {provider.experience} yrs experience
                            </p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date
                        </label>
                        <input
                            type="date"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Address
                        </label>
                        <textarea
                            rows={3}
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your complete address..."
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total Amount (₹)
                        </label>
                        <input
                            type="number"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Expected cost"
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={createBooking}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                >
                    Confirm Booking
                </button>

            </div>
        </div>
    );
}
