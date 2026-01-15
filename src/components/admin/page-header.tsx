import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function PageHeader({
  title,
  description,
  backHref,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="mt-1 text-slate-600">{description}</p>
          )}
        </div>

        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
