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
                    <div key={p._id} className="border p-4 rounded shadow bg-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{p.userId?.name}</h2>
                            <p className="text-gray-600">{p.bio}</p>
                            <p><strong>Experience:</strong> {p.experience} yrs</p>
                            <p><strong>Base Price:</strong> ₹{p.basePrice}</p>
                            <p><strong>Rating:</strong> ⭐ {p.rating?.toFixed(1)} ({p.totalReviews} reviews)</p>
                        </div>

                        <Link
                            to={`/book/${p._id}/${id}`}
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                        >
                            Book Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
