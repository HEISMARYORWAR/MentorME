import { Request, Response } from "express";
import Review from "../models/review";
import User from "../models/user";
import { AuthenticatedRequest } from "../types";

// ✅ CREATE REVIEW
export const createReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { mentorId, rating, comment } = req.body;
    const menteeId = req.user?.id;

    const existing = await Review.findOne({ mentor: mentorId, mentee: menteeId });
    if (existing) {
      res.status(400).json({ message: "You have already reviewed this mentor" });
      return;
    }

    const review = await Review.create({
      mentor: mentorId,
      mentee: menteeId,
      rating,
      comment,
    });

    // Recalculate average rating
    const reviews = await Review.find({ mentor: mentorId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(mentorId, {
      averageRating,
      totalReviews: reviews.length,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error creating review", error: err });
  }
};

// ✅ GET MENTOR REVIEWS (public)
export const getMentorReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mentorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ mentor: mentorId })
      .populate("mentee", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ mentor: mentorId });

    res.status(200).json({
      reviews,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
};

// ✅ ADMIN: GET ALL REVIEWS
export const getAllReviews = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const reviews = await Review.find()
      .populate("mentee", "name")
      .populate("mentor", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all reviews", error: err });
  }
};

// ✅ ADMIN: DELETE REVIEW
export const deleteReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err });
  }
};

// ✅ REPORT REVIEW (user)
export const reportReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { reported: true },
      { new: true }
    );

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review reported", review });
  } catch (err) {
    res.status(500).json({ message: "Error reporting review", error: err });
  }
};
