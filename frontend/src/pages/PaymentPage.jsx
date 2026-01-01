import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentPage() {
    const { bookingId, amount, providerId } = useParams(); // we'll handle URL later
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const payNow = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/payment/create-order",
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
                    const verify = await axios.post("http://localhost:8000/api/payment/verify", {
                        ...response,
                        bookingId, amount, providerId
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    toast.success("Payment Successful!");
                    navigate("/my-bookings");
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: "#2563eb" }
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch {
            toast.error("Payment failed to start");
        }
    };

    return (
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
            <p className="text-gray-500 mb-4">Amount: ₹{amount}</p>
            <button onClick={payNow} className="btn-primary">
                Pay Now
            </button>
        </div>
    );
}
