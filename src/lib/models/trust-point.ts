import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrustPoint extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TrustPointSchema = new Schema<ITrustPoint>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

TrustPointSchema.index({ order: 1 });
TrustPointSchema.index({ isActive: 1 });

const TrustPoint: Model<ITrustPoint> =
  mongoose.models.TrustPoint || mongoose.model<ITrustPoint>("TrustPoint", TrustPointSchema);

export default TrustPoint;
