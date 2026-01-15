import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompanyInfo extends Document {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  founded: number;
  linkedin?: string;
  github?: string;
  twitter?: string;
  logoUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  updatedAt: Date;
}

const CompanyInfoSchema = new Schema<ICompanyInfo>(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, "Tagline is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    founded: {
      type: Number,
      required: [true, "Founded year is required"],
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    heroTitle: {
      type: String,
      default: "We Build Software That Scales Your Business",
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default: "Cloud architecture, full-stack development, and DevOps for European companies.",
      trim: true,
    },
    ctaTitle: {
      type: String,
      default: "Ready to Build Something Great?",
      trim: true,
    },
    ctaSubtitle: {
      type: String,
      default: "Book a free consultation to discuss your project.",
      trim: true,
    },
  },
  { timestamps: true }
);

const CompanyInfo: Model<ICompanyInfo> =
  mongoose.models.CompanyInfo || mongoose.model<ICompanyInfo>("CompanyInfo", CompanyInfoSchema);

export default CompanyInfo;
