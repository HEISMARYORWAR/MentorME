import express from "express";
import { sendRequest, respondToRequest } from "../controllers/requestController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticate, sendRequest); // mentee sends request
router.put("/:requestId", authenticate, respondToRequest); // mentor accepts/rejects

export default router;
