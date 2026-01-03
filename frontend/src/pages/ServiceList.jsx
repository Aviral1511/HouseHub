import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiTool } from "react-icons/fi";

export default function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/services");
                setServices(res.data);
            } catch (err) {
                toast.error("Unable to load services");
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-3">
                    Available Services 🛠
                </h1>
                <p className="text-gray-600 text-lg">
                    Choose from a wide range of trusted home services
                </p>
            </div>

            {/* Services Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {services.map((s) => (
                    <Link
                        to={`/providers/${s.name}/${s._id}`}
                        key={s._id}
                        className="group"
                    >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col justify-between border border-transparent hover:border-blue-500">

                            {/* Icon */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                                <FiTool size={22} />
                            </div>

                            {/* Content */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                    {s.name}
                                </h2>
                                <p className="text-gray-500 text-sm mb-3">
                                    Professional & trusted service
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mt-auto">
                                <span className="inline-block text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                    Starts at ₹{s.basePrice}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
