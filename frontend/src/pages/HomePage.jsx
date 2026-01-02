/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


export default function HomePage() {
    const { user } = useSelector(s => s.auth);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [index, setIndex] = useState(0);

    const dummyReviews = [
        {
            _id: "1",
            user: {
                name: "Amit Sharma",
                profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            rating: 5,
            comment: "Excellent plumbing service! Very professional and quick.",
            createdAt: "2025-01-01"
        },
        {
            _id: "2",
            user: {
                name: "Neha Verma",
                profilePic: "https://randomuser.me/api/portraits/women/45.jpg"
            },
            rating: 4,
            comment: "Electrician arrived on time and fixed everything smoothly.",
            createdAt: "2025-01-02"
        },
        {
            _id: "3",
            user: {
                name: "Rahul Mehta",
                profilePic: "https://randomuser.me/api/portraits/men/76.jpg"
            },
            rating: 5,
            comment: "AC service was top-notch. Cooling improved instantly!",
            createdAt: "2025-01-03"
        },
        {
            _id: "4",
            user: {
                name: "Sneha Kapoor",
                profilePic: "https://randomuser.me/api/portraits/women/65.jpg"
            },
            rating: 4,
            comment: "Very polite cleaner, house looks brand new now.",
            createdAt: "2025-01-04"
        },
        {
            _id: "5",
            user: {
                name: "Vikram Singh",
                profilePic: "https://randomuser.me/api/portraits/men/12.jpg"
            },
            rating: 5,
            comment: "Carpenter did a fantastic job. Highly recommended!",
            createdAt: "2025-01-05"
        },
        {
            _id: "6",
            user: {
                name: "Pooja Nair",
                profilePic: "https://randomuser.me/api/portraits/women/29.jpg"
            },
            rating: 4,
            comment: "Quick service booking and smooth experience overall.",
            createdAt: "2025-01-06"
        },
        {
            _id: "7",
            user: {
                name: "Ankit Jain",
                profilePic: "https://randomuser.me/api/portraits/men/54.jpg"
            },
            rating: 5,
            comment: "AI assistant suggested the right service instantly. Loved it!",
            createdAt: "2025-01-07"
        },
        {
            _id: "8",
            user: {
                name: "Kavya Iyer",
                profilePic: "https://randomuser.me/api/portraits/women/18.jpg"
            },
            rating: 5,
            comment: "Secure payment and excellent provider quality.",
            createdAt: "2025-01-08"
        }
    ];


    useEffect(() => {
        axios.get("http://localhost:8000/api/reviews/recent")
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    }, []);

    // Auto slide
    useEffect(() => {
        if (dummyReviews.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % dummyReviews.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [dummyReviews]);


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/services/"
                );
                setServices(res.data);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchServices();
    }, []);


    return (
        <div className="">

            <section className="relative h-[70vh] overflow-hidden text-white bg-linear-to-r from-blue-500 via-cyan-500 to-indigo-500">

                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]"></div>

                {/* Content */}
                <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center text-center">

                    {/* Badge */}
                    <span className="mb-4 px-4 py-1 rounded-full text-md font-bold bg-white/30 text-black backdrop-blur">
                        Trusted Home Services Platform
                    </span>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                        Get Home Services <br className="hidden sm:block" />
                        <span className="text-white/90">On Demand 🏠</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl">
                        Book verified professionals for plumbing, electrical, cleaning & more —
                        fast, reliable, and hassle-free.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">

                        <Link
                            to="/services"
                            className="px-6 py-3 rounded-full font-bold bg-white text-blue-600 shadow-lg hover:scale-105 transition-transform"
                        >
                            Book a Service
                        </Link>

                        <Link
                            to="/ai-chat"
                            className=" text-black px-6 py-3 rounded-full font-bold border border-white/40 backdrop-blur hover:bg-yellow-300 hover:scale-105 transition bg-yellow-400"
                        >
                            Ask AI Assistant 🤖
                        </Link>

                    </div>

                    {/* Trust indicators */}
                    <div className="mt-10 flex gap-6 text-md font-semibold text-white">
                        <div className="px-4 py-1 rounded-full bg-white/20 backdrop-blur">✔ Verified Providers</div>
                        <div className="px-4 py-1 rounded-full bg-white/20 backdrop-blur">✔ Secure Payments</div>
                        <div className="px-4 py-1 rounded-full bg-white/20 backdrop-blur">✔ 24/7 Support</div>
                    </div>

                </div>
            </section>

            {/* Services Section */}
            <section className="relative py-16 px-6 max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Popular Services
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                        Choose from our most frequently booked home services
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {services.slice(0, 12).map((s) => (
                        <Link
                            key={s._id}
                            to={`/providers/${encodeURIComponent(s.name)}/${s._id}`}
                            className="group bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 
                   flex flex-col items-center justify-center text-center border border-gray-300
                   hover:-translate-y-1"
                        >
                            {/* Icon Bubble */}
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4
                        group-hover:scale-110 transition">
                                <span className="text-2xl">🛠️</span>
                            </div>

                            {/* Service Name */}
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                                {s.name}
                            </h3>

                            {/* Sub hint */}
                            <p className="text-xs text-gray-500 mt-1">
                                Trusted professionals
                            </p>
                        </Link>
                    ))}
                </div>
            </section>



            {/* Why HouseHub */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                        Why Choose HouseHub?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                        Everything you need to book reliable home services — fast, secure, and smart.
                    </p>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: "🛡️", title: "Verified Professionals", desc: "Background-checked & trusted experts" },
                            { icon: "⚡", title: "Instant Booking", desc: "Book services in just a few clicks" },
                            { icon: "💳", title: "Secure Payments", desc: "Safe & transparent transactions" },
                            { icon: "🤖", title: "AI Assistance", desc: "Smart recommendations for your issue" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-10">
                    What Our Customers Say ❤️
                </h2>

                <div className="max-w-4xl mx-auto relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-700"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {dummyReviews.map((r) => (
                            <div
                                key={r._id}
                                className="min-w-full px-6"
                            >
                                <div className="bg-gray-50 p-6 rounded-xl shadow-lg text-center border border-gray-200">
                                    <img
                                        src={r.userId?.profilePic || "https://ui-avatars.com/api/?name=User"}
                                        alt="user"
                                        className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                                    />

                                    <h4 className="font-semibold text-lg">
                                        {r.userId?.name}
                                    </h4>

                                    <p className="text-sm text-gray-500 mb-2">
                                        Service by {r.providerId?.userId?.name}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex justify-center mb-2">
                                        {"⭐".repeat(r.rating)}
                                    </div>

                                    <p className="text-gray-700 italic">
                                        “{r.comment || "Great service!"}”
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* AI Section */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="bg-linear-to-r from-blue-200 via-cyan-100 to-indigo-200 rounded-2xl p-10 shadow-lg">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Not Sure Which Service You Need?
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto mb-8">
                            Just describe your problem — our AI assistant will guide you to the right service instantly.
                        </p>

                        <Link
                            to="/ai-chat"
                            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-700 text-lg font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
                        >
                            🤖 Try our AI Assistant
                        </Link>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300">
                <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">HouseHub</h3>
                        <p className="text-sm opacity-80">
                            Your one-stop platform for trusted home services, powered by AI.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-md">
                            <li><Link to="/services" className="hover:text-white">Services</Link></li>
                            <li><Link to="/ai-chat" className="hover:text-white">AI Assistant</Link></li>
                            <li><Link to="/profile" className="hover:text-white">My Profile</Link></li>
                            <li><Link to="/my-bookings" className="hover:text-white">My Bookings</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Contact</h4>
                        <p className="text-md">📧 support@househub.com</p>
                        <p className="text-md">📞 +91 98765 43210</p>
                        <p className="text-md">📍 India</p>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                        <div className="flex gap-4 text-xl">
                            <a href="https://whatsapp.com" className="hover:scale-105 hover:text-white"><FaWhatsapp /></a>
                            <a href="https://instagram.com" className="hover:scale-105 hover:text-white"><FaInstagram /></a>
                            <a href="https://facebook.com" className="hover:scale-105 hover:text-white"><MdFacebook /></a>
                            <a href="https://x.com" className="hover:scale-105 hover:text-white"><FaXTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 text-center py-4 text-sm opacity-70">
                    © {new Date().getFullYear()} HouseHub. All rights reserved.
                </div>
            </footer>

        </div>
    );
}
