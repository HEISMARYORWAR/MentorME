import express from "express";
import { bookSession, getSessions } from "../controllers/sessionController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticate, bookSession); // POST /api/sessions
router.get("/", authenticate, getSessions); // GET /api/sessions

export default router;
