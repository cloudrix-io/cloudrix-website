import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  company: string;
  email: string;
  problemType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
  source?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    problemType: {
      type: String,
      required: [true, "Problem type is required"],
      trim: true,
    },
    budgetRange: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, "Timeline is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [20, "Message must be at least 20 characters"],
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },
    source: {
      type: String,
      default: "website",
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
LeadSchema.index({ email: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
