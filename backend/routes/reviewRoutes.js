import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { addReview, getProviderReviews, getRecentReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", auth, addReview);
router.get("/:id", getProviderReviews); // public
router.get("/recent", getRecentReviews);

export default router;
