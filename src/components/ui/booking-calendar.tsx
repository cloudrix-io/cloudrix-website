"use client";

import { useState } from "react";
import { Calendar, Clock, Video, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const meetingTypes = [
  {
    id: "strategy",
    title: "Free Strategy Call",
    duration: "30 min",
    description: "Discuss your project challenges and get actionable advice",
    icon: Video,
    popular: true,
  },
  {
    id: "technical",
    title: "Technical Deep Dive",
    duration: "60 min",
    description: "In-depth technical assessment of your architecture",
    icon: Calendar,
    popular: false,
  },
];

export function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Generate next 14 days
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsBooked(true);
    setIsSubmitting(false);
  };

  if (isBooked) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
        <p className="text-gray-600 mb-4">
          Your {meetingTypes.find(t => t.id === selectedType)?.title} is booked for{" "}
          <strong>{selectedDate && formatDate(selectedDate)}</strong> at <strong>{selectedTime} CET</strong>
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Check your inbox for a calendar invite and meeting link.
            We'll send you a reminder 24 hours before.
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Questions? Email us at <a href="mailto:contact@cloudrix.io" className="text-blue-600">contact@cloudrix.io</a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-1 mx-2 ${
                    step > s ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-gray-500">
          <span>Meeting Type</span>
          <span>Date & Time</span>
          <span>Your Details</span>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Meeting Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What would you like to discuss?
            </h3>
            {meetingTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setStep(2);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedType === type.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      type.popular ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <Icon className={`w-6 h-6 ${type.popular ? "text-blue-600" : "text-gray-600"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{type.title}</h4>
                        {type.popular && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {type.duration}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Pick a date and time
            </h3>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableDates.slice(0, 10).map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-center text-sm transition-all ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-lg font-bold">{date.getDate()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time (CET)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-center text-sm transition-all ${
                        selectedTime === time
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <button
                onClick={() => setStep(3)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Almost there!
            </h3>
            <p className="text-gray-600 mb-6">
              {formatDate(selectedDate!)} at {selectedTime} CET
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What would you like to discuss?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Tell us about your project or challenges..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
