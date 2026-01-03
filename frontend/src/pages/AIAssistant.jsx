import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiTool } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AIAssistant() {
    const { token } = useSelector((state) => state.auth);
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyze = async () => {
        if (!input.trim()) return toast.error("Describe your issue first");

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8000/api/ai/analyze",
                { description: input },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(res.data);
        } catch {
            toast.error("AI failed to analyze");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-blue-600">
                    AI Service Assistant 🤖
                </h2>
                <p className="text-gray-600">
                    Describe your problem and let AI suggest the best solution
                </p>
            </div>

            {/* Input Card */}
            <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
                <textarea
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    placeholder="Eg: Water leakage in kitchen sink, pipe seems broken..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={analyze}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition disabled:opacity-60"
                >
                    {loading ? "Analyzing..." : "Analyze Issue"}
                </button>
            </div>

            {/* Result Section */}
            {result && (
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 animate-fadeIn">
                    {/* AI Summary */}
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
                            {result.ai.category}
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700 font-medium">
                            Severity: {result.ai.severity}
                        </span>
                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                            ₹ {result.ai.estimatedCost}
                        </span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                        {result.ai.explanation}
                    </p>

                    {/* Providers */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">
                            Recommended Providers 👨‍🔧
                        </h3>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {/* {result.recommendedProviders.map((p) => ( */}
                            <Link to={`/providers/${result.recommendedProviders[0].serviceCategory}/${result.recommendedProviders[0]._id}`}>
                                <div
                                    key={result.recommendedProviders[0]._id}
                                    className="border rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition"
                                >
                                    <FiTool className="w-10 h-10 rounded-full object-cover border" />
                                    <div>
                                        <p className="font-semibold">
                                            {result.recommendedProviders[0].userId?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 font-bold">
                                            {result.recommendedProviders[0].serviceCategory}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            {/*  ))} */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
