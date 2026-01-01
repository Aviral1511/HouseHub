import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8000");

export default function ChatRoom() {
    const { token, user } = useSelector((state) => state.auth);
    const { id } = useParams(); // bookingId
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const sendMsg = () => {
        const msg = { bookingId: id, message: text, senderId: user._id };
        socket.emit("send_message", msg);
        axios.post("http://localhost:8000/api/chat", msg, { headers: { Authorization: `Bearer ${token}` } });
        setText("");
    };

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
    }, []);

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="font-bold text-xl mb-4">Chat 💬</h2>

            <div className="border p-3 h-80 overflow-y-auto bg-white">
                {messages.map((m, i) => (
                    <p key={i} className={`${m.senderId._id === user?._id ? "text-right" : "text-left"}`}>
                        <span className="bg-gray-200 rounded px-2 py-1 my-1 inline-block">{m.message}</span>
                    </p>
                ))}
            </div>

            <div className="flex gap-2 mt-3">
                <input value={text} onChange={(e) => setText(e.target.value)}
                    className="input flex-1" placeholder="Type a message..."
                />
                <button onClick={sendMsg} className="btn-primary w-24">Send</button>
            </div>
        </div>
    );
}
