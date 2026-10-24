"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface ResetAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetAboutModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetAboutModalProps) {
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
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Reset Form to Default Template?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will reload all form fields with standard defaults. You can review them before clicking &quot;Save Changes&quot;.
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
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer"
              >
                Yes, Reset Form
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
