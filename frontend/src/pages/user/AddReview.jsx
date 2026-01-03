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
            await axios.post(
                "http://localhost:8000/api/review/add",
                { providerId, bookingId, rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Review submitted!");
            navigate("/my-bookings");
        } catch {
            toast.error("Failed to submit review");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg p-6 space-y-5">

                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Rate Your Service
                </h2>

                {/* Rating */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">
                        Rating (1–5) ⭐
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Comment */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">
                        Feedback
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={submitReview}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
}
