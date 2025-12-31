import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
    try {
        const { bookingId, message, image } = req.body;

        const chat = await Chat.create({
            bookingId,
            senderId: req.user.id,
            message,
            image: image || null,
        });

        // Emit to socket room later
        res.json({ message: "Message sent", chat });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({ bookingId: req.params.bookingId })
            .populate("senderId", "name profilePic");

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
