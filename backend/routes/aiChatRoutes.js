import express from "express";
import { aiChat } from "../controllers/aiChatController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/chat", auth, aiChat);

export default router;
