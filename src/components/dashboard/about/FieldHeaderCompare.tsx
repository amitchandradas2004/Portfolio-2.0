"use client";

import React from "react";
import { Clock } from "lucide-react";

interface FieldHeaderCompareProps {
  label: string;
  savedValue?: string;
  currentValue?: string;
  extraRight?: React.ReactNode;
}

export function FieldHeaderCompare({
  label,
  savedValue,
  currentValue,
  extraRight,
}: FieldHeaderCompareProps) {
  const isDifferent =
    savedValue !== undefined && currentValue !== undefined && savedValue !== currentValue;

  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </span>
        {savedValue !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border transition-all ${
              isDifferent
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            }`}
            title={`Last saved in database: ${savedValue || "(empty)"}`}
          >
            <Clock className="w-3 h-3 shrink-0" />
            <span className="font-semibold hidden xs:inline">
              {isDifferent ? "Saved:" : "Last Saved:"}
            </span>
            <span className="max-w-[90px] xs:max-w-[140px] sm:max-w-[200px] truncate italic">
              &quot;{savedValue || "Empty"}&quot;
            </span>
            {isDifferent && (
              <span className="ml-0.5 text-[9px] font-extrabold uppercase tracking-tight bg-amber-500/20 text-amber-700 dark:text-amber-300 px-1 rounded">
                Edited
              </span>
            )}
          </span>
        )}
      </div>
      {extraRight}
    </div>
  );
}
