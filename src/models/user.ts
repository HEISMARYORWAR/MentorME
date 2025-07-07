import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "mentee" | "mentor" | "admin";
  bio?: string;
  skills?: string[];
  goals?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["mentee", "mentor", "admin"], default: "mentee" },
    bio: String,
    skills: [String],
    goals: String,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
