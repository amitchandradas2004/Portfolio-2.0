import React from "react";
import { ShieldCheck, Sparkles, Layout, Globe } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
} from "react-icons/fa6";
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

  const key = iconKey.toLowerCase();

  if (key.includes("next")) return <SiNextdotjs className={className} />;
  if (key.includes("type")) return <SiTypescript className={className} />;
  if (key.includes("mongo")) return <SiMongodb className={className} />;
  if (key.includes("express")) return <SiExpress className={className} />;
  if (key.includes("tailwind")) return <SiTailwindcss className={className} />;
  if (key.includes("stripe")) return <SiStripe className={className} />;
  if (key.includes("react")) return <FaReact className={className} />;
  if (key.includes("node")) return <FaNodeJs className={className} />;
  if (key.includes("betterauth")) return <ShieldCheck className={className} />;
  if (key.includes("gemini")) return <SiGooglegemini className={className} />;
  if (key.includes("html")) return <FaHtml5 className={className} />;
  if (key.includes("css")) return <FaCss3Alt className={className} />;
  if (key.includes("javascript") || key === "js") return <FaJs className={className} />;
  if (key.includes("github")) return <FaGithub className={className} />;
  if (key.includes("git")) return <FaGitAlt className={className} />;
  if (key.includes("responsive")) return <Layout className={className} />;
  if (key.includes("api")) return <Globe className={className} />;

  return null;
}
