import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { addReview, getProviderReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", auth, addReview);
router.get("/:id", getProviderReviews); // public

export default router;
