"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface NiceSelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface NiceSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: NiceSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  label?: string;
  required?: boolean;
}

export function NiceSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  buttonClassName = "",
  label,
  required = false,
}: NiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border text-sm text-left transition-all ${
          isOpen
            ? "border-sky-500/80 ring-2 ring-sky-500/20 bg-white dark:bg-slate-800 shadow-md"
            : "border-slate-200 dark:border-slate-700/80 bg-slate-100/90 dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
        } ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {selectedOption?.icon && (
            <div className="shrink-0 flex items-center justify-center">
              {selectedOption.icon}
            </div>
          )}
          <span
            className={`truncate font-medium ${
              selectedOption
                ? "text-slate-900 dark:text-white"
                : "text-slate-400 dark:text-slate-500"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span
              className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                selectedOption.badgeColor ||
                "bg-sky-500/15 text-sky-600 dark:text-sky-400"
              }`}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400 dark:text-slate-500"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-1.5 z-[70] max-h-52 sm:max-h-64 overflow-y-auto rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-sky-500/10 p-1.5 backdrop-blur-2xl"
          >
            <div className="space-y-0.5">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 font-bold"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {opt.icon && (
                        <div className="shrink-0 flex items-center justify-center">
                          {opt.icon}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{opt.label}</div>
                        {opt.description && (
                          <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate font-normal">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {opt.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            opt.badgeColor ||
                            "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && (
                        <Check className="w-4 h-4 text-sky-500 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
