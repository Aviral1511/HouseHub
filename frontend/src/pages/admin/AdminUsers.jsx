import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminUsers() {
    const { token } = useSelector(s => s.auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUsers(res.data));
    }, []);

    const roleBadge = (role) => {
        const styles = {
            user: "bg-blue-100 text-blue-700",
            provider: "bg-green-100 text-green-700",
            admin: "bg-purple-100 text-purple-700"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[role]}`}>
                {role}
            </span>
        );
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <div className="bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    👥 All Users
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">

                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="text-left p-3 font-semibold text-gray-600">Name</th>
                                <th className="text-left p-3 font-semibold text-gray-600">Email</th>
                                <th className="text-center p-3 font-semibold text-gray-600">Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u, idx) => (
                                <tr
                                    key={u._id}
                                    className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-blue-50 transition`}
                                >
                                    <td className="p-3 font-medium text-gray-800">
                                        {u.name}
                                    </td>
                                    <td className="p-3 text-gray-600">
                                        {u.email}
                                    </td>
                                    <td className="p-3 text-center">
                                        {roleBadge(u.role)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
}
