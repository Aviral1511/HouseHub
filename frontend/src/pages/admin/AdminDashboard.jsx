import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="p-10 space-y-5 text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Admin Panel 🔐</h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

                <Link to="/admin/users" className="admin-card">Users</Link>
                <Link to="/admin/providers" className="admin-card">Providers</Link>
                <Link to="/admin/bookings" className="admin-card">Bookings</Link>
                <Link to="/admin/reviews" className="admin-card">Reviews</Link>

            </div>
        </div>
    );
}
