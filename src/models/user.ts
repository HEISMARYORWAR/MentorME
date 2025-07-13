import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "mentee" | "mentor" | "admin";
  bio?: string;
  skills?: string[];
  goals?: string;
  averageRating?: number;
  totalReviews?: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["mentor", "mentee", "admin"], default: "mentee" },
    bio: { type: String },
    skills: [{ type: String }],
    goals: { type: String },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);

