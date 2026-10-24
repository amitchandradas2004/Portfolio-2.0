"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { AboutTech } from "@/lib/about-types";
import { renderAboutTechIcon } from "@/lib/about-icons";

interface DeleteTechModalProps {
  isOpen: boolean;
  tech: AboutTech | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTechModal({
  isOpen,
  tech,
  onClose,
  onConfirm,
}: DeleteTechModalProps) {
  if (!tech) return null;

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
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Delete Technology Chip?
              </h3>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold">
                <span className={tech.color}>
                  {renderAboutTechIcon(tech.iconKey, "w-4 h-4")}
                </span>
                <span>{tech.name}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Are you sure you want to remove &quot;{tech.name}&quot; from your Overview card technologies? You will still need to click &quot;Save Changes&quot; to apply to the database.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 cursor-pointer"
              >
                Yes, Delete Technology
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
