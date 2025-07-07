import { Request, Response } from "express";
import Session from "../models/session";

// Book a new session
export const bookSession = async (req: any, res: Response) => {
  const { mentorId, date, time } = req.body;

  try {
    const session = await Session.create({
      mentor: mentorId,
      mentee: req.user.id,
      date,
      time,
    });

    res.status(201).json({ message: "Session booked", session });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
};

// Get all sessions for a logged-in user (mentor or mentee)
export const getSessions = async (req: any, res: Response) => {
  try {
    const sessions = await Session.find({
      $or: [{ mentor: req.user.id }, { mentee: req.user.id }],
    })
      .populate("mentor", "name email")
      .populate("mentee", "name email")
      .sort({ date: 1 });

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err });
  }
};

// Approve or reject a session (only mentor can do this)
export const updateSessionStatus = async (req: any, res: Response) => {
  const { sessionId } = req.params;
  const { status } = req.body;

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Only the assigned mentor can approve/reject
    if (session.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the mentor can update session status" });
    }

    session.status = status;
    await session.save();

    res.status(200).json({ message: "Session status updated", session });
  } catch (err) {
    res.status(500).json({ message: "Failed to update session", error: err });
  }
};
