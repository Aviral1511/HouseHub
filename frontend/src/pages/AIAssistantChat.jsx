import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AIAssistantChat() {
    const { token } = useSelector(s => s.auth);

    const [messages, setMessages] = useState([
        { sender: "AI", text: "Hello! I’m HouseHub AI 🤖 How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);

    const bottomRef = useRef(null);

    /* 🔊 Sound effects */
    const sendSound = new Audio("/sounds/send.mp3");
    const receiveSound = new Audio("/sounds/receive.mp3");

    /* ⬇️ Auto-scroll */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        sendSound.play();

        const userMessage = { sender: "You", text: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput("");
        setTyping(true);

        try {
            const res = await axios.post(
                "http://localhost:8000/api/ai/chat",
                { messages: newMessages },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            receiveSound.play();
            setTyping(false);
            setMessages(prev => [
                ...prev,
                { sender: "AI", text: res.data.reply }
            ]);

        } catch {
            setTyping(false);
            toast.error("AI failed to respond");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">

            {/* Header */}
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                HouseHub AI Assistant 🤖💬
            </h2>

            {/* Chat Window */}
            <div className="h-[480px] bg-white border rounded-xl shadow-inner p-4 overflow-y-auto space-y-4">

                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.sender === "You" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                ${m.sender === "You"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                                }`}
                        >
                            <span className="font-semibold block mb-1">
                                {m.sender}
                            </span>
                            {m.text}
                        </div>
                    </div>
                ))}

                {/* ⌨️ Typing Indicator */}
                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 px-4 py-2 rounded-2xl text-sm italic animate-pulse">
                            HouseHub AI is typing...
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-4">
                <input
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-semibold"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
