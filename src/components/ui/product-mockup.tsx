import { Check } from "lucide-react";

interface ProductMockupProps {
  /** Product display name shown in the mock app header */
  name: string;
  /** Path shown in the mock browser address bar, e.g. "smart-crm" */
  slug: string;
  /** Tailwind gradient stops, e.g. "from-violet-600 to-purple-600" */
  gradient: string;
  /** Product feature list — the first few are rendered inside the mock UI */
  features: string[];
  /** Optional product icon node rendered in the mock app header */
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Stylized, CSS-only product mockup rendered inside a browser frame.
 * Built from the product's real feature list — no image assets required.
 */
export function ProductMockup({
  name,
  slug,
  gradient,
  features,
  icon,
  className = "",
}: ProductMockupProps) {
  const items = features.slice(0, 3);
  const barWidths = ["w-4/5", "w-3/5", "w-2/3"];

  return (
    <div
      className={`flex aspect-[16/10] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left ${className}`}
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        <div className="ml-3 flex-1 truncate rounded-md bg-slate-800/80 px-3 py-1 text-[10px] font-medium text-slate-500">
          app.cloudrix.io/{slug}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div className="hidden w-14 flex-col items-center gap-3 border-r border-slate-800 bg-slate-950/40 py-4 sm:flex">
          <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${gradient}`} />
          <div className="mt-1 h-1.5 w-8 rounded-full bg-slate-700" />
          <div className="h-1.5 w-8 rounded-full bg-slate-800" />
          <div className="h-1.5 w-8 rounded-full bg-slate-800" />
          <div className="h-1.5 w-8 rounded-full bg-slate-800" />
        </div>

        {/* Main app area */}
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          {/* App header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {icon && (
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${gradient} [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-white`}
                >
                  {icon}
                </span>
              )}
              <span className="truncate text-xs font-semibold text-white">
                {name}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium text-emerald-400">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Live
            </span>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-2">
            {barWidths.map((width, i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-800 bg-slate-950/50 p-2"
              >
                <div className="mb-2 h-1.5 w-2/3 rounded-full bg-slate-700" />
                <div className="h-1 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-1 rounded-full bg-gradient-to-r ${gradient} ${width}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows drawn from the real feature list */}
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
            {items.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-2.5 py-1.5"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded bg-gradient-to-br ${gradient}`}
                >
                  <Check className="h-2.5 w-2.5 text-white" />
                </span>
                <span className="truncate text-[10px] text-slate-400">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
