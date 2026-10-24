"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { AboutTrait } from "@/lib/about-types";
import { TRAIT_ICON_OPTIONS, renderTraitIcon } from "@/lib/about-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface TraitModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  trait: AboutTrait;
  onClose: () => void;
  onSave: (trait: AboutTrait) => void;
}

export function TraitModal({
  isOpen,
  mode,
  trait: initialTrait,
  onClose,
  onSave,
}: TraitModalProps) {
  const [data, setData] = React.useState<AboutTrait>(initialTrait);

  React.useEffect(() => {
    setData(initialTrait);
  }, [initialTrait, isOpen]);

  // Icon options for NiceSelect
  const iconOptions: NiceSelectOption[] = TRAIT_ICON_OPTIONS.map((opt) => ({
    value: opt.key,
    label: opt.label,
    icon: (
      <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-sky-500">
        {renderTraitIcon(opt.key, "w-4 h-4")}
      </div>
    ),
  }));

  // Color options for NiceSelect
  const colorOptions: NiceSelectOption[] = [
    {
      value: "text-sky-500",
      label: "Sky Blue",
      badge: "Sky",
      badgeColor: "bg-sky-500/20 text-sky-600 dark:text-sky-400",
    },
    {
      value: "text-purple-500",
      label: "Purple",
      badge: "Purple",
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
    {
      value: "text-emerald-500",
      label: "Emerald Green",
      badge: "Emerald",
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      value: "text-amber-500",
      label: "Amber Yellow",
      badge: "Amber",
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
    {
      value: "text-rose-500",
      label: "Rose Red",
      badge: "Rose",
      badgeColor: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
    },
    {
      value: "text-indigo-500",
      label: "Indigo",
      badge: "Indigo",
      badgeColor: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    },
  ];

  const handleColorChange = (col: string) => {
    let bg = "bg-sky-500/10";
    if (col.includes("purple")) bg = "bg-purple-500/10";
    if (col.includes("emerald")) bg = "bg-emerald-500/10";
    if (col.includes("amber")) bg = "bg-amber-500/10";
    if (col.includes("rose")) bg = "bg-rose-500/10";
    if (col.includes("indigo")) bg = "bg-indigo-500/10";

    setData((prev) => ({
      ...prev,
      iconColor: col,
      badgeBg: bg,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>{mode === "add" ? "Add New Trait Card" : "Edit Trait Card"}</span>
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Title
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Clean Architecture"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={data.description}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="e.g. Modularity, reusability, and maintainable codebase standards."
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-normal text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <NiceSelect
                    label="Trait Icon"
                    value={data.iconKey}
                    onChange={(val) =>
                      setData((prev) => ({ ...prev, iconKey: val }))
                    }
                    options={iconOptions}
                  />
                </div>

                <div>
                  <NiceSelect
                    label="Icon & Badge Color"
                    value={data.iconColor || "text-sky-500"}
                    onChange={handleColorChange}
                    options={colorOptions}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => onSave(data)}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 cursor-pointer"
              >
                {mode === "add" ? "Create Trait" : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
