import express from "express";
import { getMentors } from "../controllers/mentorController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticate, getMentors);

export default router;
