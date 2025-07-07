import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  date: Date;
  status: "pending" | "accepted" | "rejected" | "completed";
  notes?: string;
}

const sessionSchema = new Schema<ISession>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected", "completed"], default: "pending" },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>("Session", sessionSchema);

