import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  icon: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    problem: {
      type: String,
      required: [true, "Problem is required"],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, "Solution is required"],
      trim: true,
    },
    result: {
      type: String,
      required: [true, "Result is required"],
      trim: true,
    },
    features: [{
      type: String,
      trim: true,
    }],
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

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ order: 1 });
ServiceSchema.index({ isActive: 1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
