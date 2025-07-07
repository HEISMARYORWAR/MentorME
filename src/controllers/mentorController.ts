import { Request, Response } from "express";
import User from "../models/user";

// Get all mentors
export const getMentors = async (req: Request, res: Response) => {
  try {
    const { skill, name } = req.query;

    const query: any = { role: "mentor" };

    if (skill) query.skills = { $in: [skill] };
    if (name) query.name = { $regex: name, $options: "i" };

    const mentors = await User.find(query).select("-password");

    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentors", error: err });
  }
};
