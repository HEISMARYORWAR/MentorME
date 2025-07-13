import express from "express";
import {
  createReview,
  getMentorReviews,
  getAllReviews,
  deleteReview,
  reportReview
} from "../controllers/reviewController";
import authenticate from "../middlewares/authMiddleware";

const router = express.Router();

// Mentee submits review
router.post("/", authenticate, createReview);

// Admin-only route to get all reviews
router.get("/admin", authenticate, getAllReviews);

// Admin-only delete review
router.delete("/:reviewId", authenticate, deleteReview);

// Users can report a review
router.patch("/:reviewId/report", authenticate, reportReview);

// Public: Get all reviews for a mentor
router.get("/:mentorId", getMentorReviews);

export default router;

