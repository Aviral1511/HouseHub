export default function chatSocket(io) {
    io.on("connection", (socket) => {
        console.log("🔗 User connected:", socket.id);

        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            console.log("📥 Joined Room:", roomId);
        });

        socket.on("send_message", (data) => {
            io.to(data.bookingId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
        });
    });
}
