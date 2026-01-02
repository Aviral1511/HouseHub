import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProviderList() {
    const { category, id } = useParams();
    const [providers, setProviders] = useState([]);


    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/provider/category/${category}`);
                setProviders(res.data);
                // console.log(res.data);
            } catch (err) {
                toast.error("Failed to fetch providers");
            }
        };
        fetchProviders();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                Providers for <span className="text-blue-600">{category}</span> 🔧
            </h1>

            {!providers.length && <p>No providers available at the moment</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {providers.map((p) => (
                    <div
                        key={p._id}
                        className="border p-5 rounded-xl shadow bg-white flex flex-col justify-between hover:shadow-lg transition"
                    >
                        {/* Top Section */}
                        <div className="flex gap-4">

                            {/* Profile Picture */}
                            <img
                                src={p.userId?.profilePic || "/default-avatar.png"}
                                alt="Provider"
                                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                            />

                            {/* Provider Info */}
                            <div className="flex-1 space-y-1">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {p.userId?.name}
                                </h2>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {p.bio}
                                </p>

                                <p className="text-sm">
                                    <strong>Experience:</strong> {p.experience} yrs
                                </p>

                                <p className="text-sm">
                                    <strong>Base Price:</strong> ₹{p?.basePrice}
                                </p>

                                <p className="text-sm">
                                    <strong>Rating : </strong>{p.rating?.toFixed(1) || "0.0"}⭐ ({p.totalReviews || 0} reviews)
                                </p>
                            </div>
                        </div>

                        {/* Action */}
                        <Link
                            to={`/book/${p._id}/${id}`}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700 transition"
                        >
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}
