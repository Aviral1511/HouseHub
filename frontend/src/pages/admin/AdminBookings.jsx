import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AdminBookings() {
    const { token } = useSelector(s => s.auth);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/bookings", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setData(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">All Bookings</h2>
            {data.map(b => (
                <div key={b._id} className="border p-3 mt-3 bg-white rounded">
                    <p><b>{b.serviceId?.name}</b> - {b.status}</p>
                    <p>User: {b.userId?.name}</p>
                    <p>Provider: {b.providerId?.userId?.name}</p>
                </div>
            ))}
        </div>
    );
}
