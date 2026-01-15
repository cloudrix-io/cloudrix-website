"use client";

import { useState } from "react";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { problemTypes, budgetRanges, timelines } from "@/data/services";
import { ContactFormData } from "@/types";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    problemType: "",
    budgetRange: "",
    timeline: "",
    message: "",
    honeypot: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.problemType) {
      newErrors.problemType = "Please select a problem type";
    }

    if (!formData.timeline) {
      newErrors.timeline = "Please select a timeline";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please provide more details (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          problemType: formData.problemType,
          budgetRange: formData.budgetRange,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        problemType: "",
        budgetRange: "",
        timeline: "",
        message: "",
        honeypot: "",
      });
      onSuccess?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-xl bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          Message Sent Successfully!
        </h3>
        <p className="mt-2 text-slate-600">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.name}
          required
        />
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc."
          error={errors.company}
          required
        />
      </div>

      <Input
        label="Work Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@acme.com"
        error={errors.email}
        helperText="We'll never share your email with anyone else"
        required
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="What do you need help with?"
          name="problemType"
          value={formData.problemType}
          onChange={handleChange}
          placeholder="Select a problem type"
          options={problemTypes.map((type) => ({ value: type, label: type }))}
          error={errors.problemType}
          required
        />
        <Select
          label="Budget Range (EUR)"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          placeholder="Select budget range"
          options={budgetRanges.map((range) => ({ value: range, label: range }))}
        />
      </div>

      <Select
        label="Timeline"
        name="timeline"
        value={formData.timeline}
        onChange={handleChange}
        placeholder="When do you want to start?"
        options={timelines.map((timeline) => ({
          value: timeline,
          label: timeline,
        }))}
        error={errors.timeline}
        required
      />

      <Textarea
        label="Tell us about your project"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Describe your challenges, goals, and what you're looking to achieve..."
        rows={5}
        error={errors.message}
        required
      />

      {submitError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
