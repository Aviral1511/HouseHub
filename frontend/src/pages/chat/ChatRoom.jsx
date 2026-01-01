import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlinePaperClip } from "react-icons/ai";

const socket = io("http://localhost:8000"); // Change if backend uses 5000

export default function ChatRoom() {
    const { token, user } = useSelector((state) => state.auth);
    const { id } = useParams(); // bookingId

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);

    // Load history
    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get(`http://localhost:8000/api/chat/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
        };

        socket.emit("join_room", id);
        fetchMessages();

        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    // Send message + image
    const sendMsg = async () => {
        if (!text && !file) return;

        const form = new FormData();
        form.append("bookingId", id);
        if (text) form.append("message", text);
        if (file) form.append("image", file);

        // Emit for real-time UI
        socket.emit("send_message", {
            bookingId: id,
            message: text,
            image: preview,
            senderId: user._id
        });

        // Upload to backend
        await axios.post("http://localhost:8000/api/chat", form, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setText("");
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="max-w-lg mx-auto p-4">

            <h2 className="font-bold text-xl mb-4">Chat 💬</h2>

            {/* Chat Box */}
            <div className="border p-3 h-96 overflow-y-auto bg-white space-y-2 rounded">
                {messages.map((m, i) => (
                    <div key={i} className={`${m.senderId?._id === user?._id ? "text-right" : "text-left"}`}>
                        <div className="inline-block p-2 rounded bg-gray-100 mb-1 max-w-[75%]">
                            {m.message && <p>{m.message}</p>}

                            {m.image && (
                                <img
                                    src={m.image}
                                    className="w-40 rounded mt-1 cursor-pointer"
                                    onClick={() => window.open(m.image, "_blank")}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Row */}
            <div className="flex gap-2 mt-3 items-center">
                <AiOutlinePaperClip
                    size={26}
                    className="cursor-pointer"
                    onClick={() => fileRef.current.click()}
                />

                <input
                    type="file"
                    hidden
                    ref={fileRef}
                    accept="image/*"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                />

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input flex-1"
                    placeholder="Type a message..."
                />

                <button onClick={sendMsg} className="btn-primary w-24">
                    Send
                </button>
            </div>

            {preview && (
                <div className="mt-2">
                    <p className="text-sm text-gray-500">Image Preview:</p>
                    <img src={preview} className="w-32 rounded border" />
                </div>
            )}
        </div>
    );
}
