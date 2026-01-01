import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AIAssistant() {
    const { token } = useSelector((state) => state.auth);
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);

    const analyze = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/ai/analyze",
                { description: input },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(res.data);
        } catch {
            toast.error("AI failed to analyze");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 text-center">AI Service Assistant 🤖</h2>

            <textarea
                className="input" rows={4}
                placeholder="Describe your household issue..."
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="btn-primary w-full" onClick={analyze}>Analyze</button>

            {result && (
                <div className="p-4 bg-white shadow rounded mt-3">
                    <p><b>Category:</b> {result.ai.category}</p>
                    <p><b>Severity:</b> {result.ai.severity}</p>
                    <p><b>Estimated Cost:</b> {result.ai.estimatedCost}</p>
                    <p className="text-sm text-gray-600">{result.ai.explanation}</p>

                    <h3 className="font-bold mt-2">Recommended Providers:</h3>
                    {result.recommendedProviders.map(p => (
                        <p key={p._id}>{p.userId?.name} - {p.serviceCategory}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
