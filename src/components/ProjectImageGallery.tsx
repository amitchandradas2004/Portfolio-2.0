"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

interface ProjectImageGalleryProps {
  images: string[];
  title: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 0.97,
    x: direction > 0 ? 40 : direction < 0 ? -40 : 0,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.97,
    x: direction > 0 ? -40 : direction < 0 ? 40 : 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function ProjectImageGallery({
  images,
  title,
}: ProjectImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);

  const galleryImages = images && images.length > 0 ? images : [];

  const handleSelectImage = (index: number) => {
    if (index === activeImageIndex) return;
    setDirection(index > activeImageIndex ? 1 : -1);
    setActiveImageIndex(index);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrevLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (lightboxIndex === null) return;
      setDirection(-1);
      setLightboxIndex((prev) =>
        prev === null ? 0 : prev === 0 ? galleryImages.length - 1 : prev - 1
      );
    },
    [lightboxIndex, galleryImages.length]
  );

  const handleNextLightbox = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (lightboxIndex === null) return;
      setDirection(1);
      setLightboxIndex((prev) =>
        prev === null ? 0 : prev === galleryImages.length - 1 ? 0 : prev + 1
      );
    },
    [lightboxIndex, galleryImages.length]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevLightbox();
      } else if (e.key === "ArrowRight") {
        handleNextLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleCloseLightbox, handlePrevLightbox, handleNextLightbox]);

  if (galleryImages.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Cover / Main Banner Image with Framer Motion Smooth Transition */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={galleryImages[activeImageIndex]}
              alt={`${title} Screenshot ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Action Overlay: Enlarge */}
        <div
          onClick={() => handleOpenLightbox(activeImageIndex)}
          className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] cursor-pointer z-10"
        >
          <div className="px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-white/20">
            <Maximize2 className="w-4 h-4 text-sky-500" />
            <span>Enlarge Screenshot</span>
          </div>
        </div>

        {/* Banner Navigation Arrows (shown if multiple images exist) */}
        {galleryImages.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectImage(
                  activeImageIndex === 0 ? galleryImages.length - 1 : activeImageIndex - 1
                );
              }}
              aria-label="Previous Image"
              className="p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-sky-600 border border-white/10 backdrop-blur-md transition-all shadow-lg pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectImage(
                  activeImageIndex === galleryImages.length - 1 ? 0 : activeImageIndex + 1
                );
              }}
              aria-label="Next Image"
              className="p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-sky-600 border border-white/10 backdrop-blur-md transition-all shadow-lg pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Gallery Screenshots Grid / Thumbnails */}
      {galleryImages.length > 1 && (
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
            <span>Project Screenshots ({galleryImages.length})</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((imgSrc, idx) => {
              const isActive = activeImageIndex === idx;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectImage(idx)}
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200 shadow-md ${
                    isActive
                      ? "border-sky-500 ring-2 ring-sky-500/30 dark:ring-sky-400/30"
                      : "border-slate-200 dark:border-slate-800 hover:border-sky-500/50"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${title} screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${
                      isActive ? "bg-transparent" : "bg-slate-950/20 hover:bg-transparent"
                    }`}
                  />

                  {idx === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500 text-white shadow-sm z-10">
                      Cover
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL WITH SMOOTH TRANSITION */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center z-10 p-2 sm:p-4"
            >
              {/* Top Controls Bar */}
              <div className="w-full flex items-center justify-between text-white mb-3 px-2">
                <span className="text-xs sm:text-sm font-semibold tracking-wide bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                  {title} • {lightboxIndex + 1} of {galleryImages.length}
                </span>

                <button
                  onClick={handleCloseLightbox}
                  aria-label="Close Lightbox"
                  className="p-2 rounded-full bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Expanded Image View with Framer Motion Transitions */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={lightboxIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={galleryImages[lightboxIndex]}
                      alt={`${title} expanded view ${lightboxIndex + 1}`}
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Arrow Navigation */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevLightbox}
                      aria-label="Previous Image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white hover:bg-sky-600 border border-white/10 backdrop-blur-md transition-all shadow-lg cursor-pointer z-20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={handleNextLightbox}
                      aria-label="Next Image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white hover:bg-sky-600 border border-white/10 backdrop-blur-md transition-all shadow-lg cursor-pointer z-20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
