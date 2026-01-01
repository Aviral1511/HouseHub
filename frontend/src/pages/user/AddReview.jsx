import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddReview() {
    const { providerId, bookingId } = useParams();
    const { token } = useSelector(s => s.auth);
    const navigate = useNavigate();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submitReview = async () => {
        try {
            await axios.post("http://localhost:5000/api/review/add",
                { providerId, bookingId, rating, comment },
                { headers: { Authorization: `Bearer ${token}` } });

            toast.success("Review submitted!");
            navigate("/my-bookings");
        } catch {
            toast.error("Failed to submit review");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow space-y-4">
            <h2 className="text-xl font-bold text-blue-600 text-center">Rate Service ⭐</h2>

            <label>Rating (1-5):</label>
            <input type="number" min={1} max={5} className="input"
                value={rating} onChange={(e) => setRating(e.target.value)} />

            <textarea
                placeholder="Write feedback..."
                className="input"
                rows={3}
                onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={submitReview} className="btn-primary w-full">
                Submit Review
            </button>
        </div>
    );
}
