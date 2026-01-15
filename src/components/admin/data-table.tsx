"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={cn(
                "transition-colors hover:bg-slate-50",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={cn("px-4 py-3 text-sm", column.className)}
                >
                  {typeof column.accessor === "function"
                    ? column.accessor(item)
                    : (item[column.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
