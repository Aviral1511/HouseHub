import { useEffect, useState } from "react";
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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">All Users</h2>
            <table className="w-full border mt-4">
                <thead className="bg-gray-200">
                    <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} className="border text-center">
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td className="text-blue-600 font-bold">{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
