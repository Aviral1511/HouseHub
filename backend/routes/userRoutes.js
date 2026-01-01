import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", auth, getUserProfile);
router.put("/update", auth, updateUserProfile);

export default router;
