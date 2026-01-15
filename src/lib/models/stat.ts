import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStat extends Document {
  value: string;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StatSchema = new Schema<IStat>(
  {
    value: {
      type: String,
      required: [true, "Value is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Label is required"],
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

StatSchema.index({ order: 1 });
StatSchema.index({ isActive: 1 });

const Stat: Model<IStat> =
  mongoose.models.Stat || mongoose.model<IStat>("Stat", StatSchema);

export default Stat;
