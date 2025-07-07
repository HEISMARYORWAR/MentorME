import { Request, Response } from "express";
import MentorshipRequest from "../models/mentorshipRequest";

// Mentee sends a request
export const sendRequest = async (req: any, res: Response) => {
  const { mentorId } = req.body;

  try {
    const newRequest = await MentorshipRequest.create({
      mentee: req.user.id,
      mentor: mentorId,
    });

    res.status(201).json({ message: "Request sent", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to send request", error: err });
  }
};

// Mentor accepts or rejects request
export const respondToRequest = async (req: any, res: Response) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updated = await MentorshipRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.status(200).json({ message: `Request ${status}`, request: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
};
