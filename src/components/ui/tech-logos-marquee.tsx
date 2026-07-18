"use client";

const techLogosRow1 = [
  "Claude",
  "GPT-4",
  "LangChain",
  "AWS",
  "Kubernetes",
  "React",
  "Next.js",
  "Python",
];

const techLogosRow2 = [
  "TypeScript",
  "Docker",
  "Terraform",
  "PostgreSQL",
  "Pinecone",
  "vLLM",
  "Node.js",
  "Go",
];

function LogoPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 mx-2">
      {name}
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  // Duplicate items to create seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex items-center ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{ width: "max-content" }}
      >
        {doubled.map((name, i) => (
          <LogoPill key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

export function TechLogosMarquee() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
          Technologies We Work With
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <MarqueeRow items={techLogosRow1} direction="left" />
        <MarqueeRow items={techLogosRow2} direction="right" />
      </div>
    </section>
  );
}
