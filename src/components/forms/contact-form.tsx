"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { problemTypes } from "@/data/services";
import { ContactFormData } from "@/types";

interface ContactFormProps {
  onSuccess?: () => void;
  redirectToThankYou?: boolean;
}

const referralOptions = [
  { value: "", label: "Select an option" },
  { value: "google-search", label: "Google Search" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral" },
  { value: "blog-post", label: "Blog Post" },
  { value: "conference-event", label: "Conference / Event" },
  { value: "ai-tool-on-website", label: "AI Tool on Website" },
  { value: "other", label: "Other" },
];

const MESSAGE_MAX_LENGTH = 2000;

export function ContactForm({ onSuccess, redirectToThankYou = true }: ContactFormProps) {
  const router = useRouter();
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
    referralSource: "",
    preferredContact: "",
    honeypot: "",
  });

  // Calculate form completion percentage
  const completionPercentage = useMemo(() => {
    const requiredFields: (keyof ContactFormData)[] = ["name", "email", "problemType", "message"];
    const optionalFields: (keyof ContactFormData)[] = ["company", "referralSource", "preferredContact"];
    const allFields = [...requiredFields, ...optionalFields];

    const filled = allFields.filter((field) => {
      const value = formData[field];
      return value && typeof value === "string" && value.trim().length > 0;
    });

    return Math.round((filled.length / allFields.length) * 100);
  }, [formData]);

  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        break;
      case "problemType":
        if (!value) return "Please select a problem type";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 20) return "Please provide more details (at least 20 characters)";
        if (value.length > MESSAGE_MAX_LENGTH) return `Message must be under ${MESSAGE_MAX_LENGTH} characters`;
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    const fieldsToValidate: (keyof ContactFormData)[] = ["name", "email", "problemType", "message"];
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation: clear error or show new one when user types
    if (errors[name as keyof ContactFormData]) {
      const error = validateField(name as keyof ContactFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof ContactFormData, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
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
          referralSource: formData.referralSource,
          preferredContact: formData.preferredContact,
          honeypot: formData.honeypot,
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
        referralSource: "",
        preferredContact: "",
        honeypot: "",
      });
      onSuccess?.();

      if (redirectToThankYou) {
        router.push("/thank-you");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && !redirectToThankYou) {
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
      {/* Progress Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Form completion</span>
          <span className={`font-medium ${completionPercentage === 100 ? "text-green-600" : "text-blue-600"}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              completionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

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
          onBlur={handleBlur}
          placeholder="John Doe"
          error={errors.name}
          required
        />
        <Input
          label="Company (optional)"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc."
          error={errors.company}
        />
      </div>

      <Input
        label="Work Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="john@acme.com"
        error={errors.email}
        helperText="We'll never share your email with anyone else"
        required
      />

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

      {/* Message with character counter */}
      <div>
        <Textarea
          label="Tell us about your project"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Describe your challenges, goals, and what you're looking to achieve..."
          rows={5}
          error={errors.message}
          required
        />
        <div className="mt-1 flex justify-end">
          <span
            className={`text-xs ${
              formData.message.length > MESSAGE_MAX_LENGTH
                ? "text-red-500 font-medium"
                : formData.message.length > MESSAGE_MAX_LENGTH * 0.8
                ? "text-amber-500"
                : "text-gray-400"
            }`}
          >
            {formData.message.length} / {MESSAGE_MAX_LENGTH}
          </span>
        </div>
      </div>

      {/* How did you hear about us */}
      <Select
        label="How did you hear about us?"
        name="referralSource"
        value={formData.referralSource}
        onChange={handleChange}
        placeholder="Select an option"
        options={referralOptions.filter((o) => o.value !== "")}
      />

      {/* Preferred contact method */}
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          Preferred contact method
        </legend>
        <div className="flex flex-wrap gap-4">
          {[
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone" },
            { value: "whatsapp", label: "WhatsApp" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 cursor-pointer rounded-lg border px-4 py-2.5 text-sm transition-all ${
                formData.preferredContact === option.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="preferredContact"
                value={option.value}
                checked={formData.preferredContact === option.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                  formData.preferredContact === option.value
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {formData.preferredContact === option.value && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

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
