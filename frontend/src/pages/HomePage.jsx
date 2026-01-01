import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
    const { user } = useSelector(s => s.auth);

    return (
        <div className="">

            {/* Hero Section */}
            <section className="h-[65vh] bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
                    Get Home Services On Demand 🏠
                </h1>
                <p className="mt-3 text-lg opacity-90 max-w-xl">
                    Book trusted service providers for electrical, plumbing, cleaning & more — instantly.
                </p>

                <div className="flex gap-3 mt-6">
                    <Link to="/services" className="bg-white text-blue-600 font-semibold px-5 py-2 rounded shadow hover:bg-gray-200">
                        Book Service
                    </Link>
                    <Link to="/ai-chat" className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded shadow hover:bg-yellow-500">
                        Ask AI Assistant 🤖
                    </Link>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-10 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Popular Services</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {["Plumber", "Electrician", "Cleaner", "Carpenter", "Painter", "AC Repair", "Pest Control", "Appliance Repair"]
                        .map((s, i) => (
                            <Link
                                key={i}
                                to={`/providers/${s}`}
                                className="border p-5 rounded-lg shadow hover:shadow-xl transition bg-white text-center font-semibold"
                            >
                                {s}
                            </Link>
                        ))}
                </div>
            </section>

            {/* Why HouseHub */}
            <section className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-6">Why HouseHub?</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
                    {[
                        "Verified & Trusted Professionals",
                        "Instant Booking & Scheduling",
                        "Secure Payments & Guaranteed Work",
                        "Smart AI Recommendations"
                    ].map((text, i) => (
                        <div key={i} className="p-6 bg-white rounded shadow font-medium">
                            {text}
                        </div>
                    ))}
                </div>
            </section>

            {/* AI Section */}
            <section className="py-14 text-center">
                <h2 className="text-3xl font-bold mb-3">Confused About the Issue?</h2>
                <p className="text-gray-600 mb-6">Explain your problem & get the right service instantly.</p>
                <Link to="/ai-chat" className="btn-primary text-lg px-8 py-3">Try AI Assistant 🤖</Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-center text-white py-6">
                <p className="opacity-80">© {new Date().getFullYear()} HouseHub. All rights reserved.</p>
            </footer>
        </div>
    );
}
