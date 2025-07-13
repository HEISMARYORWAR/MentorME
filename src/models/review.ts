import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  reported: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    reported: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
