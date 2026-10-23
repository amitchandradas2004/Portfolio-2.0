"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, X } from "lucide-react";
import { AboutTech } from "@/lib/about-types";
import { TECH_ICON_OPTIONS, renderAboutTechIcon } from "@/lib/about-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface TechModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  tech: AboutTech;
  onClose: () => void;
  onSave: (tech: AboutTech) => void;
}

export function TechModal({
  isOpen,
  mode,
  tech: initialTech,
  onClose,
  onSave,
}: TechModalProps) {
  const [data, setData] = React.useState<AboutTech>(initialTech);

  React.useEffect(() => {
    setData(initialTech);
  }, [initialTech, isOpen]);

  // Options for NiceSelect with visual icon previews
  const techOptions: NiceSelectOption[] = TECH_ICON_OPTIONS.map((item) => ({
    value: item.key,
    label: item.name,
    icon: (
      <div className={`p-1 rounded-md bg-slate-100 dark:bg-slate-800 ${item.defaultColor}`}>
        {renderAboutTechIcon(item.key, "w-4 h-4")}
      </div>
    ),
  }));

  const handleSelectPreset = (key: string) => {
    const match = TECH_ICON_OPTIONS.find((t) => t.key === key);
    setData((prev) => ({
      ...prev,
      iconKey: key,
      name: prev.name.trim() ? prev.name : match?.name || "",
      color: match?.defaultColor || prev.color,
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
            className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-500" />
                <span>{mode === "add" ? "Add Technology" : "Edit Technology"}</span>
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
                <NiceSelect
                  label="Preset & Icon"
                  value={data.iconKey}
                  onChange={handleSelectPreset}
                  options={techOptions}
                  placeholder="Choose an icon..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Technology Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Next.js"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Tailwind Color Class
                </label>
                <input
                  type="text"
                  value={data.color}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, color: e.target.value }))
                  }
                  placeholder="e.g. text-cyan-400"
                  className="w-full mt-1.5 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
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
                Save Technology
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
