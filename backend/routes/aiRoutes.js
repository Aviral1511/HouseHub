import express from "express";
import { analyzeIssue } from "../controllers/aiController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// user describes issue → gets ai recommendation
router.post("/analyze", auth, analyzeIssue);

export default router;
