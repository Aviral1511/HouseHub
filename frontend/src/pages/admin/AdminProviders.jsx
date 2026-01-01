import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminProviders() {
    const { token } = useSelector(s => s.auth);
    const [list, setList] = useState([]);

    const fetchData = () => axios.get("http://localhost:8000/api/admin/providers", {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => setList(res.data));

    useEffect(() => { fetchData(); }, []);

    const approve = (id) => {
        axios.put(`http://localhost:8000/api/admin/provider/approve/${id}`, {},
            { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                toast.success("Provider Approved");
                fetchData();
            })
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Providers</h2>
            <div className="space-y-3 mt-4">
                {list.map(p => (
                    <div key={p._id} className="border p-3 bg-white rounded flex justify-between">
                        <div>
                            <p><b>{p.userId?.name}</b> ({p.serviceCategory})</p>
                            <p>Email: {p.userId?.email}</p>
                            <p>Rating: ⭐ {p.rating?.toFixed(1)}</p>
                        </div>
                        {!p.approved && (
                            <button onClick={() => approve(p._id)} className="btn-primary">Approve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
