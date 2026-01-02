import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminProviders() {
    const { token } = useSelector(s => s.auth);
    const [list, setList] = useState([]);

    const fetchData = () =>
        axios.get("http://localhost:8000/api/admin/providers", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setList(res.data));

    useEffect(() => { fetchData(); }, []);

    const approve = (id) => {
        axios.put(`http://localhost:8000/api/admin/provider/approve/${id}`, {},
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            toast.success("Provider Approved");
            fetchData();
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">
                🛠 Service Providers
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
                {list.map(p => (
                    <div
                        key={p._id}
                        className="bg-white border rounded-xl shadow hover:shadow-lg transition p-5 flex justify-between items-start"
                    >
                        {/* Provider Info */}
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">
                                {p.userId?.name}
                            </h3>

                            <p className="text-sm text-gray-600">
                                📧 {p.userId?.email}
                            </p>

                            <p className="text-sm">
                                🧰 <span className="font-medium">{p.serviceCategory}</span>
                            </p>

                            <p className="text-sm">
                                ⭐ {p.rating?.toFixed(1) || "0.0"}
                            </p>

                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold
                ${p.approved
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"}
              `}>
                                {p.approved ? "Approved" : "Pending Approval"}
                            </span>
                        </div>

                        {/* Action */}
                        {!p.approved && (
                            <button
                                onClick={() => approve(p._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-md hover:bg-blue-700 cursor-pointer"
                            >
                                Approve
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
