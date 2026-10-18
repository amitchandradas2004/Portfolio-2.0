"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type IntensityScale = "none" | "xs" | "sm" | "md" | "lg" | "xl";

interface LiquidGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  borderRadius?: string;
  blurIntensity?: IntensityScale;
  glowIntensity?: IntensityScale;
  shadowIntensity?: IntensityScale;
  draggable?: boolean;
  style?: React.CSSProperties;
}

const blurMap: Record<IntensityScale, string> = {
  none: "backdrop-blur-none",
  xs: "backdrop-blur-xs",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

export function LiquidGlassCard({
  children,
  className,
  borderRadius = "16px",
  blurIntensity = "md",
  glowIntensity = "sm",
  shadowIntensity = "md",
  draggable = false,
  style,
}: LiquidGlassCardProps) {
  const filterId = useId();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragOrigin = useRef<{ mx: number; my: number; ox: number; oy: number } | null>(null);

  function onMouseDown(e: React.MouseEvent) {
    if (!draggable) return;
    dragOrigin.current = { mx: e.clientX, my: e.clientY, ox: pos.x, oy: pos.y };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragOrigin.current) return;
    setPos({
      x: dragOrigin.current.ox + e.clientX - dragOrigin.current.mx,
      y: dragOrigin.current.oy + e.clientY - dragOrigin.current.my,
    });
  }

  function onMouseUp() {
    dragOrigin.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  const transformStyle: React.CSSProperties = draggable
    ? { transform: "translate(" + pos.x + "px, " + pos.y + "px)", cursor: "grab" }
    : {};

  const glowShadows: Record<IntensityScale, string> = {
    none: "none",
    xs: "0 0 8px 1px rgba(148,163,184,0.12)",
    sm: "0 0 16px 3px rgba(148,163,184,0.18)",
    md: "0 0 28px 6px rgba(148,163,184,0.22)",
    lg: "0 2px 40px 8px rgba(99,179,237,0.18), 0 0 0 1px rgba(255,255,255,0.13)",
    xl: "0 2px 64px 16px rgba(99,179,237,0.28), 0 0 0 1.5px rgba(255,255,255,0.18)",
  };

  const dropShadows: Record<IntensityScale, string> = {
    none: "none",
    xs: "0 1px 4px rgba(0,0,0,0.06)",
    sm: "0 2px 8px rgba(0,0,0,0.08)",
    md: "0 4px 20px rgba(0,0,0,0.12)",
    lg: "0 8px 40px rgba(0,0,0,0.18)",
    xl: "0 16px 64px rgba(0,0,0,0.28)",
  };

  return (
    <>
      {/* SVG filter definition — only used on the background blur layer */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id={"lg-f-" + filterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.55 0.45" numOctaves="4" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.3" />
          </filter>
        </defs>
      </svg>

      {/* Outer wrapper — handles positioning and shadow */}
      <div
        onMouseDown={onMouseDown}
        style={{
          borderRadius,
          boxShadow: glowShadows[glowIntensity] + (dropShadows[shadowIntensity] !== "none" ? ", " + dropShadows[shadowIntensity] : ""),
          ...transformStyle,
          ...style,
        }}
        className={cn("relative isolate overflow-hidden", className)}
      >
        {/* LAYER 1: The backdrop blur glass layer (filtered for liquid wobble) */}
        <div
          style={{
            borderRadius: "inherit",
            filter: "url(#lg-f-" + filterId + ")",
          }}
          className={cn(
            "absolute inset-0",
            blurMap[blurIntensity],
            "bg-white/30 dark:bg-slate-900/50"
          )}
          aria-hidden="true"
        />

        {/* LAYER 2: Border/shimmer overlay — unfiltered so edges stay crisp */}
        <div
          style={{ borderRadius: "inherit" }}
          className="absolute inset-0 border border-white/50 dark:border-white/12 pointer-events-none"
          aria-hidden="true"
        />

        {/* LAYER 3: Top-edge specular shine */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
        />

        {/* LAYER 4: Left-edge shine */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[1.5px] bg-gradient-to-b from-white/60 via-white/20 to-transparent dark:from-white/20"
        />

        {/* LAYER 5: Radial inner glow (top-left corner light source) */}
        <span
          aria-hidden="true"
          style={{ borderRadius: "inherit" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(255,255,255,0.22)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(255,255,255,0.07)_0%,transparent_70%)]"
        />

        {/* CONTENT — completely isolated from all filters */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}