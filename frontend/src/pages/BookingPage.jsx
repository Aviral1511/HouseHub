import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function BookingPage() {
    const { id, serviceId } = useParams(); // providerId
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    // Instead we will fetch provider directly:
    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/api/provider/${id}`
                );
                setProvider(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProvider();
    }, [id]);


    const createBooking = async () => {
        if (!date || !address || !totalAmount)
            return toast.error("Fill all details!");

        try {
            const res = await axios.post(
                "http://localhost:8000/api/bookings/create",
                {
                    providerId: id,
                    serviceId,
                    scheduledDate: date,
                    address,
                    totalAmount,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Booking created successfully! 🎉");
            navigate("/my-bookings");

        } catch (err) {
            toast.error(err.response?.data?.message || "Booking Failed");
        }
    };


    if (!user || user.role !== "user")
        return <h2 className="text-center text-lg mt-10">⚠ Only Users can book services</h2>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white mt-10 shadow rounded space-y-4">

            <h2 className="text-2xl font-bold text-center text-blue-600">
                Book Service 🛠
            </h2>

            <input type="date" className="input" onChange={(e) => setDate(e.target.value)} />

            <textarea
                className="input"
                placeholder="Enter your address..."
                rows={3}
                onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <input
                className="input"
                placeholder="Total Amount (₹)"
                onChange={(e) => setTotalAmount(e.target.value)}
            />

            <button onClick={createBooking} className="btn-primary">
                Confirm Booking
            </button>
        </div>
    );
}
