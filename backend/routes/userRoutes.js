import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateProfile, updateProviderProfile, updateUserProfile } from "../controllers/userController.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/me", auth, getUserProfile);
router.put("/update", auth, updateUserProfile);
router.put("/profile", auth, updateProfile);
router.put("/profile", auth, allowRoles("provider"), updateProviderProfile);

export default router;
