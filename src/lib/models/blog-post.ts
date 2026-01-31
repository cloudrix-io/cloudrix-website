import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role?: string;
    image?: string;
  };
  category: string;
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
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
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      name: { type: String, required: true, trim: true },
      role: { type: String, trim: true },
      image: { type: String, trim: true },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Cloud Architecture",
        "DevOps",
        "Software Development",
        "Technical Leadership",
        "Case Studies",
        "Industry Insights",
        "Tutorials",
        "Company News",
      ],
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    featuredImage: {
      type: String,
      trim: true,
    },
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
    readingTime: {
      type: Number,
      default: 5,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ isPublished: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ isFeatured: 1 });

// Calculate reading time before save
BlogPostSchema.pre("save", function () {
  if (this.isModified("content")) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
});

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
