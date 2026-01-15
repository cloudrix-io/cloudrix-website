import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProcessStep extends Document {
  step: number;
  title: string;
  description: string;
  duration?: string;
  icon: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProcessStepSchema = new Schema<IProcessStep>(
  {
    step: {
      type: Number,
      required: [true, "Step number is required"],
      unique: true,
    },
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
    duration: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProcessStepSchema.index({ step: 1 });
ProcessStepSchema.index({ isActive: 1 });

const ProcessStep: Model<IProcessStep> =
  mongoose.models.ProcessStep || mongoose.model<IProcessStep>("ProcessStep", ProcessStepSchema);

export default ProcessStep;
