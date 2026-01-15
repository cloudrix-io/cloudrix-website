"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { AlertTriangle, X } from "lucide-react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <Card
        variant="elevated"
        padding="lg"
        className="relative z-10 w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-slate-600">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-red-600 hover:bg-red-700"
            onClick={handleConfirm}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
