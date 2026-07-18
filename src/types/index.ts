export interface Lead {
  _id?: string;
  name: string;
  company: string;
  email: string;
  problemType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
  createdAt: Date;
  source?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  problem: string;
  solution: string;
  result: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  description?: string;
  duration?: string;
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
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  problemType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  referralSource: string;
  preferredContact: string;
  honeypot?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
