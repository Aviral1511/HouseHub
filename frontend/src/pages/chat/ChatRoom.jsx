import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

const socket = io("http://localhost:8000");

export default function ChatRoom() {
    const { token, user } = useSelector((state) => state.auth);
    const { id } = useParams(); // bookingId

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);
    const bottomRef = useRef(null);

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
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.off("receive_message");
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMsg = async () => {
        if (!text && !file) return;

        const form = new FormData();
        form.append("bookingId", id);
        if (text) form.append("message", text);
        if (file) form.append("image", file);
        console.log(form);

        socket.emit("send_message", {
            bookingId: id,
            message: text,
            image: preview,
            senderId: user._id
        });
        try {
            const res = await axios.post("http://localhost:8000/api/chat", form, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
            });

        } catch (error) {
            console.log(error);
        }


        setText("");
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="max-w-2xl mx-auto mt-4 h-[80vh] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">

            {/* Header */}
            <div className="px-4 py-3 border-b font-semibold text-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                Chat 💬
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((m, i) => {
                    const isMe = (m.senderId?._id || m.senderId) === user?._id;
                    return (
                        <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow
                                    ${isMe
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none border"
                                    }`}
                            >
                                {m.message && <p>{m.message}</p>}

                                {m.image && (
                                    <img
                                        src={m.image}
                                        className="mt-2 w-48 rounded-lg cursor-pointer border"
                                        onClick={() => window.open(m.image, "_blank")}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Preview */}
            {preview && (
                <div className="px-4 py-2 border-t bg-gray-100 flex items-center gap-3">
                    <img src={preview} className="w-16 h-16 rounded-lg object-cover border" />
                    <p className="text-sm text-gray-600">Image ready to send</p>
                </div>
            )}

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2 bg-white">
                <AiOutlinePaperClip
                    size={26}
                    className="cursor-pointer text-gray-500 hover:text-blue-600"
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
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                />

                <button
                    onClick={sendMsg}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer"
                >
                    <FiSend />
                </button>
            </div>
        </div>
    );
}
