import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AIAssistantChat() {
    const { token } = useSelector(s => s.auth);
    const [messages, setMessages] = useState([
        { sender: "AI", text: "Hello! I’m HouseHub AI. How can I help you today? 😊" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { sender: "You", text: input };
        setMessages(prev => [...prev, newMessage]);
        const userMsgs = [...messages, newMessage];

        setInput("");

        try {
            const res = await axios.post(
                "http://localhost:8000/api/ai/chat",
                { messages: userMsgs },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessages(prev => [...prev, { sender: "AI", text: res.data.reply }]);
        } catch {
            toast.error("AI failed to respond");
        }
    };
    console.log(`I'm here`);

    return (
        <div className="max-w-xl mx-auto p-4">

            <h2 className="text-2xl text-center font-bold text-blue-600 mb-4">
                HouseHub AI 🤖💬
            </h2>

            <div className="h-125 border rounded p-3 bg-white overflow-y-auto space-y-4">
                {messages.map((m, i) => (
                    <p key={i} className={m.sender === "You" ? "text-right" : "text-left"}>
                        <span className={`px-3 py-1 rounded inline-block 
            ${m.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            <b className="mx-1">{m.sender}:</b> {m.text}
                        </span>
                    </p>
                ))}
            </div>

            <div className="flex gap-2 my-3">
                <input className="input flex-1"
                    placeholder="Describe your issue..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button className="btn-primary" onClick={sendMessage}>Send</button>
        </div>
    );
}
