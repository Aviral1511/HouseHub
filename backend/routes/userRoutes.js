import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateProfile, updateProviderProfile, updateUserProfile } from "../controllers/userController.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadImage.js"

const router = express.Router();

router.get("/me", auth, getUserProfile);
router.put("/update", auth, updateUserProfile);
router.put("/profile", auth, upload.single("image"), updateProfile);
router.put("/provider/profile", auth, allowRoles("provider"), upload.single("image"), updateProviderProfile);

export default router;
