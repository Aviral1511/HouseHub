import Chat from "../models/Chat.js";
import cloudinary from "../config/cloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const { bookingId, message } = req.body;
    let imageUrl = null;

    // If an image is uploaded, process it
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "househub_chat_images",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer); // Upload file buffer
      });

      imageUrl = uploadResult.secure_url;
    }

    // Save message to DB
    const chat = await Chat.create({
      bookingId,
      senderId: req.user.id,
      message: message || "",  // message optional
      image: imageUrl,
    });

    res.json({ message: "Message Sent", chat });

  } catch (err) {
    console.log(err);
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
