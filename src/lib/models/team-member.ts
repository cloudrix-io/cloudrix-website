import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [100, "Role cannot exceed 100 characters"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
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

TeamMemberSchema.index({ order: 1 });
TeamMemberSchema.index({ isActive: 1 });

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
