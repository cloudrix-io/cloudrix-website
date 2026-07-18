"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating?: number;
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color from the name
  const colors = [
    "bg-blue-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-emerald-600",
    "bg-cyan-600",
    "bg-rose-600",
  ];
  const colorIndex =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;

  return (
    <div
      className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
    >
      {initials}
    </div>
  );
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Cloudrix delivered our AI pipeline in 6 weeks, half the time other consultancies quoted. Production-ready from day one.",
    author: "Marcus van den Berg",
    position: "CTO, FinTech Startup",
    rating: 5,
  },
  {
    quote:
      "Their EU AI Act compliance expertise saved us months of research. We were audit-ready before the deadline.",
    author: "Sophie Laurent",
    position: "VP Engineering, Healthcare Platform",
    rating: 5,
  },
  {
    quote:
      "The RAG system they built handles 10K queries daily with sub-second response times. Exceptional engineering.",
    author: "Daniel Okeke",
    position: "Head of AI, Enterprise SaaS",
    rating: 5,
  },
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, next]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative quote marks */}
      <div className="absolute -top-4 -left-2 text-8xl text-blue-100 dark:text-blue-900/40 font-serif leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      {/* Carousel container */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-12">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full shrink-0 px-1"
            >
              <StarRating rating={testimonial.rating} />
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <Avatar name={testimonial.author} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2.5 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-blue-600 w-8"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
