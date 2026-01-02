import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminReviews() {
    const { token } = useSelector(s => s.auth);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/reviews", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setReviews(res.data));
    }, [token]);

    return (
        <div className="p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

            {/* Empty state */}
            {reviews.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                    No reviews available
                </p>
            )}

            {/* Review cards */}
            <div className="space-y-4">
                {reviews.map(r => (
                    <div
                        key={r._id}
                        className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition"
                    >
                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-lg">
                                    {r.userId?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {r.userId?.email}
                                </p>
                            </div>

                            {/* Rating badge */}
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${r.rating >= 4 ? "bg-green-100 text-green-700" :
                                        r.rating >= 3 ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"}
                `}
                            >
                                ⭐ {r.rating}/5
                            </span>
                        </div>

                        {/* Comment */}
                        {r.comment && (
                            <p className="mt-3 text-gray-700 italic">
                                “{r.comment}”
                            </p>
                        )}

                        {/* Footer */}
                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                            <p>
                                Provider:{" "}
                                <span className="font-medium text-gray-700">
                                    {r.providerId?.userId?.name}
                                </span>
                            </p>
                            <p>
                                {new Date(r.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
