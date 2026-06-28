import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  useCases: string[];
  technologies: string[];
  faqs: IServiceFAQ[];
  relatedServiceSlugs: string[];
  seoTitle: string;
  seoDescription: string;
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
    longDescription: {
      type: String,
      trim: true,
      default: "",
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
    useCases: [{
      type: String,
      trim: true,
    }],
    technologies: [{
      type: String,
      trim: true,
    }],
    faqs: [{
      question: { type: String, required: true, trim: true },
      answer: { type: String, required: true, trim: true },
    }],
    relatedServiceSlugs: [{
      type: String,
      trim: true,
    }],
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [70, "SEO title cannot exceed 70 characters"],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, "SEO description cannot exceed 160 characters"],
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

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ order: 1 });
ServiceSchema.index({ isActive: 1 });

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
