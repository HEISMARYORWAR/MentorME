import mongoose, { Schema, Document } from "mongoose";

export interface IMentorshipRequest extends Document {
  mentee: mongoose.Schema.Types.ObjectId;
  mentor: mongoose.Schema.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const mentorshipRequestSchema = new Schema<IMentorshipRequest>(
  {
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IMentorshipRequest>("MentorshipRequest", mentorshipRequestSchema);
