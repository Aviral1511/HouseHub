import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiTool, FiCalendar, FiStar } from "react-icons/fi";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
                    Admin Panel 🔐
                </h1>
                <p className="text-gray-600">
                    Manage users, providers, bookings & reviews from one place
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

                <Link
                    to="/admin/users"
                    className="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-t-4 border-blue-500"
                >
                    <FiUsers size={34} className="text-blue-500 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-lg font-bold">Users</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        View & manage all users
                    </p>
                </Link>

                <Link
                    to="/admin/providers"
                    className="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-t-4 border-green-500"
                >
                    <FiTool size={34} className="text-green-500 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-lg font-bold">Providers</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Approve & monitor providers
                    </p>
                </Link>

                <Link
                    to="/admin/bookings"
                    className="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-t-4 border-purple-500"
                >
                    <FiCalendar size={34} className="text-purple-500 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-lg font-bold">Bookings</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Track all service bookings
                    </p>
                </Link>

                <Link
                    to="/admin/reviews"
                    className="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition border-t-4 border-yellow-500"
                >
                    <FiStar size={34} className="text-yellow-500 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-lg font-bold">Reviews</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Moderate customer reviews
                    </p>
                </Link>

            </div>
        </div>
    );
}

