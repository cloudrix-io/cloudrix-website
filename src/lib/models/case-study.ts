import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICaseStudy extends Document {
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  image?: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
    },
    challenge: {
      type: String,
      required: [true, "Challenge is required"],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, "Solution is required"],
      trim: true,
    },
    results: [{
      type: String,
      trim: true,
    }],
    technologies: [{
      type: String,
      trim: true,
    }],
    testimonial: {
      quote: { type: String, trim: true },
      author: { type: String, trim: true },
      role: { type: String, trim: true },
    },
    metrics: [{
      label: { type: String, trim: true },
      value: { type: String, trim: true },
    }],
    image: {
      type: String,
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

CaseStudySchema.index({ slug: 1 });
CaseStudySchema.index({ order: 1 });
CaseStudySchema.index({ isActive: 1 });
CaseStudySchema.index({ isFeatured: 1 });

const CaseStudy: Model<ICaseStudy> =
  mongoose.models.CaseStudy || mongoose.model<ICaseStudy>("CaseStudy", CaseStudySchema);

export default CaseStudy;
