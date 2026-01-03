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
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-3">
                    Available Services 🛠
                </h1>
                <p className="text-gray-600 text-lg">
                    Choose from a wide range of trusted home services
                </p>
            </div>

            {/* AI Helper Banner */}
            <div className="mb-12 rounded-2xl bg-linear-to-r from-yellow-400 via-yellow-300 to-orange-400 p-6 md:p-8 shadow-lg relative overflow-hidden">

                {/* Decorative Blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Text */}
                    <div className="max-w-xl text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-black">
                            Not sure which service you need? 🤔
                        </h2>
                        <p className="mt-2 text-black/80 text-sm md:text-base">
                            Describe your problem in simple words and let our AI instantly
                            suggest the right service & providers.
                        </p>
                    </div>

                    {/* CTA */}
                    <Link
                        to="/ai-assistant"
                        className="group inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-md"
                    >
                        <span>Ask AI Assistant</span>
                        <span className="group-hover:translate-x-1 transition-transform">🤖</span>
                    </Link>
                </div>
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
