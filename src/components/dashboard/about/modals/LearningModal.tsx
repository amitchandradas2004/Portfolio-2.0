"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, X } from "lucide-react";
import { AboutLearning } from "@/lib/about-types";
import { LEARNING_ICON_OPTIONS, renderLearningIcon } from "@/lib/about-icons";
import { NiceSelect, NiceSelectOption } from "@/components/dashboard/NiceSelect";

interface LearningModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  item: AboutLearning;
  onClose: () => void;
  onSave: (item: AboutLearning) => void;
}

export function LearningModal({
  isOpen,
  mode,
  item: initialItem,
  onClose,
  onSave,
}: LearningModalProps) {
  const [data, setData] = React.useState<AboutLearning>(initialItem);

  React.useEffect(() => {
    setData(initialItem);
  }, [initialItem, isOpen]);

  // Options for NiceSelect with visual learning icon previews
  const iconOptions: NiceSelectOption[] = LEARNING_ICON_OPTIONS.map((opt) => ({
    value: opt.key,
    label: opt.label,
    icon: (
      <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-purple-500">
        {renderLearningIcon(opt.key, "w-4 h-4")}
      </div>
    ),
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-500" />
                <span>
                  {mode === "add" ? "Add Learning Focus" : "Edit Learning Focus"}
                </span>
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
                  Topic / Title
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. AI Integration & LLMs"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Description
                </label>
                <input
                  type="text"
                  value={data.desc}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, desc: e.target.value }))
                  }
                  placeholder="e.g. Integrating intelligent agents & API workflows into web apps."
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-normal text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>

              <div>
                <NiceSelect
                  label="Category Icon"
                  value={data.iconKey}
                  onChange={(val) => setData((prev) => ({ ...prev, iconKey: val }))}
                  options={iconOptions}
                  placeholder="Choose an icon..."
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
                className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-500/20 cursor-pointer"
              >
                Save Item
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
