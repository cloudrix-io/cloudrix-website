import mongoose, { Schema, Document, Model } from "mongoose";

// Supported languages
export type Language = "en" | "fr";

// Page content types for each page
export interface IHeroContent {
  title: string;
  subtitle: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface ISectionContent {
  title: string;
  subtitle?: string;
  description?: string;
}

export interface IListItem {
  title: string;
  description?: string;
  icon?: string;
}

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface ITimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ICertificationItem {
  name: string;
  description: string;
  icon?: string;
}

export interface IToolItem {
  name: string;
  category?: string;
}

// Page-specific content interfaces
export interface IHomePageContent {
  hero: IHeroContent;
  services: ISectionContent;
  stats: ISectionContent;
  process: ISectionContent;
  testimonials: ISectionContent;
  cta: ISectionContent & { buttonText?: string };
  credibilityPoints?: string[];
}

export interface IServicesPageContent {
  hero: IHeroContent;
  servicesGrid: ISectionContent;
  industries: ISectionContent & { items: string[] };
  technologies: ISectionContent;
}

export interface IAboutPageContent {
  hero: IHeroContent;
  mission: ISectionContent & { content: string };
  values: ISectionContent;
  team: ISectionContent;
  timeline: ISectionContent & { items: ITimelineItem[] };
  certifications: ISectionContent & { items: ICertificationItem[] };
  stats: ISectionContent;
}

export interface IContactPageContent {
  hero: IHeroContent;
  form: ISectionContent;
  faq: ISectionContent & { items: IFaqItem[] };
  expectations: ISectionContent & { items: string[] };
  responseTime?: string;
}

export interface IHowWeWorkPageContent {
  hero: IHeroContent;
  methodology: ISectionContent;
  principles: ISectionContent & { items: IListItem[] };
  communication: ISectionContent & { items: IListItem[] };
  tools: ISectionContent & { items: IToolItem[] };
}

export interface ICaseStudiesPageContent {
  hero: IHeroContent;
  featured: ISectionContent;
  grid: ISectionContent;
}

export type PageContent =
  | IHomePageContent
  | IServicesPageContent
  | IAboutPageContent
  | IContactPageContent
  | IHowWeWorkPageContent
  | ICaseStudiesPageContent;

// Localized content structure
export interface ILocalizedContent {
  en: PageContent;
  fr: PageContent;
}

export interface IPage extends Document {
  slug: string;
  title: string;
  isPublished: boolean;
  seoTitle: { en: string; fr: string };
  seoDescription: { en: string; fr: string };
  order: number;
  content: ILocalizedContent;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      enum: ["home", "services", "about", "contact", "case-studies", "how-we-work"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    seoTitle: {
      en: { type: String, trim: true, maxlength: 70 },
      fr: { type: String, trim: true, maxlength: 70 },
    },
    seoDescription: {
      en: { type: String, trim: true, maxlength: 160 },
      fr: { type: String, trim: true, maxlength: 160 },
    },
    order: {
      type: Number,
      default: 0,
    },
    content: {
      en: { type: Schema.Types.Mixed, default: {} },
      fr: { type: Schema.Types.Mixed, default: {} },
    },
  },
  {
    timestamps: true,
  }
);

PageSchema.index({ slug: 1 }, { unique: true });
PageSchema.index({ order: 1 });
PageSchema.index({ isPublished: 1 });

const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;
