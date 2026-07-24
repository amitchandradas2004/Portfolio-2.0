import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiStripe,
  SiGooglegemini,
} from "react-icons/si";

interface RenderTechIconProps {
  iconKey?: string;
  className?: string;
}

export function RenderTechIcon({ iconKey, className }: RenderTechIconProps) {
  if (!iconKey) return null;

  switch (iconKey.toLowerCase()) {
    case "nextjs":
      return <SiNextdotjs className={className} />;
    case "typescript":
      return <SiTypescript className={className} />;
    case "mongodb":
      return <SiMongodb className={className} />;
    case "express":
      return <SiExpress className={className} />;
    case "tailwind":
      return <SiTailwindcss className={className} />;
    case "stripe":
      return <SiStripe className={className} />;
    case "react":
      return <FaReact className={className} />;
    case "nodejs":
      return <FaNodeJs className={className} />;
    case "betterauth":
      return <ShieldCheck className={className} />;
    case "gemini":
      return <SiGooglegemini className={className} />;
    default:
      return null;
  }
}
