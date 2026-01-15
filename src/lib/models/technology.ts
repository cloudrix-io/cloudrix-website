import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITechnology extends Document {
  name: string;
  category: "frontend" | "backend" | "cloud" | "devops" | "practices";
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema = new Schema<ITechnology>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["frontend", "backend", "cloud", "devops", "practices"],
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

TechnologySchema.index({ category: 1, order: 1 });
TechnologySchema.index({ isActive: 1 });

const Technology: Model<ITechnology> =
  mongoose.models.Technology || mongoose.model<ITechnology>("Technology", TechnologySchema);

export default Technology;
