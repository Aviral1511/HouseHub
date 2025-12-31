import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { createProviderProfile, getProviderProfile, getProvidersByCategory } from "../controllers/providerController.js";

const router = express.Router();

// Only logged-in users with "provider" role can make profile
router.post("/create", auth, allowRoles("provider"), createProviderProfile);

// Provider can view their own profile
router.get("/me", auth, allowRoles("provider"), getProviderProfile);

// Public — users can view list of providers
router.get("/category/:category", getProvidersByCategory);

export default router;
