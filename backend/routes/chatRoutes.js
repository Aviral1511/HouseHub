import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();

// Send message (user or provider)
router.post("/", auth, sendMessage);

// Get chat history
router.get("/:bookingId", auth, getMessages);

export default router;
