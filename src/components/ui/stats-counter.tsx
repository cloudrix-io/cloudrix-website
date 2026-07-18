"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animatedValue = useCountUp(stat.value, isVisible);

  // Format: integers stay integers, decimals keep one decimal
  const isDecimal = stat.value % 1 !== 0;
  const displayValue = isDecimal
    ? animatedValue.toFixed(1)
    : Math.floor(animatedValue).toString();

  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-5xl lg:text-6xl font-bold gradient-text mb-3 tabular-nums">
        {displayValue}
        <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
      </div>
      <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
        {stat.label}
      </div>
    </div>
  );
}

const defaultStats: StatItem[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "AI Systems Deployed" },
  { value: 99.9, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "+", label: "Years Experience" },
];

export function StatsCounter({ stats = defaultStats }: { stats?: StatItem[] }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
