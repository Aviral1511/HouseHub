import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiCreditCard, FiShield } from "react-icons/fi";

export default function PaymentPage() {
    const { bookingId, amount, providerId } = useParams();
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const payNow = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/payment/create-order",
                { amount, bookingId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { order } = res.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_ID_HERE",
                amount: order.amount,
                currency: "INR",
                name: "HouseHub Payments",
                description: "Service Payment",
                order_id: order.id,
                handler: async function (response) {
                    await axios.post(
                        "http://localhost:8000/api/payment/verify",
                        { ...response, bookingId, amount, providerId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    toast.success("Payment Successful!");
                    navigate("/my-bookings");
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: "#2563eb" },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch {
            toast.error("Payment failed to start");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-100 shadow-xl rounded-2xl p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <FiCreditCard size={28} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-600">
                        Complete Payment
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Secure payment powered by Razorpay
                    </p>
                </div>

                {/* Amount Card */}
                <div className="border rounded-xl p-4 bg-gray-50 text-center">
                    <p className="text-sm text-gray-500">Payable Amount</p>
                    <p className="text-3xl font-extrabold text-gray-800">
                        ₹{amount}
                    </p>
                </div>

                {/* User Info */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                </div>

                {/* Pay Button */}
                <button
                    onClick={payNow}
                    className="w-full flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
                >
                    <FiShield />
                    Pay Securely
                </button>

                {/* Footer */}
                <p className="text-xs text-center text-gray-400">
                    🔒 Your payment details are encrypted & secure
                </p>
            </div>
        </div>
    );
}
