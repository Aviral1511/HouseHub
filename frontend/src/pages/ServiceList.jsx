import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Available Services 🛠
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((s, index) => (
                    <Link to={`/providers/${s.name}`} key={index}>
                        <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer bg-white">
                            <h2 className="text-xl font-semibold">{s.name}</h2>
                            <p className="text-gray-500 text-sm">Starts at ₹{s.basePrice}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
