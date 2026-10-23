import React from "react";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Rocket,
  Heart,
  Star,
  Award,
  Target,
  Cpu,
  Terminal,
  FolderGit2,
  Briefcase,
  Coffee,
  Users,
  BrainCircuit,
  Cloud,
  Layers,
  Server,
  Globe,
  Flame,
  Layout,
  Wrench,
  BookOpen,
} from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaDocker,
  FaAws,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiFirebase,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiPrisma,
  SiFramer,
  SiVite,
  SiBun,
  SiSupabase,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export const TRAIT_ICON_OPTIONS = [
  { key: "check", label: "Checkmark", icon: CheckCircle2 },
  { key: "sparkles", label: "Sparkles", icon: Sparkles },
  { key: "zap", label: "Zap / Lightning", icon: Zap },
  { key: "shield", label: "Shield / Security", icon: ShieldCheck },
  { key: "code", label: "Code", icon: Code2 },
  { key: "rocket", label: "Rocket", icon: Rocket },
  { key: "target", label: "Target", icon: Target },
  { key: "award", label: "Award / Quality", icon: Award },
  { key: "star", label: "Star", icon: Star },
  { key: "heart", label: "Heart", icon: Heart },
  { key: "cpu", label: "CPU / Tech", icon: Cpu },
  { key: "terminal", label: "Terminal", icon: Terminal },
];

export const STAT_ICON_OPTIONS = [
  { key: "terminal", label: "Terminal", icon: Terminal },
  { key: "code", label: "Code", icon: Code2 },
  { key: "git", label: "Git / Commits", icon: FolderGit2 },
  { key: "zap", label: "Zap / Performance", icon: Zap },
  { key: "briefcase", label: "Briefcase", icon: Briefcase },
  { key: "coffee", label: "Coffee", icon: Coffee },
  { key: "award", label: "Award", icon: Award },
  { key: "users", label: "Users / Clients", icon: Users },
  { key: "rocket", label: "Rocket", icon: Rocket },
  { key: "globe", label: "Globe", icon: Globe },
];

export const LEARNING_ICON_OPTIONS = [
  { key: "brain", label: "AI / Brain", icon: BrainCircuit },
  { key: "rocket", label: "Rocket / Speed", icon: Rocket },
  { key: "sparkles", label: "Sparkles / Polish", icon: Sparkles },
  { key: "cloud", label: "Cloud", icon: Cloud },
  { key: "layers", label: "Layers / System Design", icon: Layers },
  { key: "server", label: "Server / Microservices", icon: Server },
  { key: "shield", label: "Security", icon: ShieldCheck },
  { key: "book", label: "Book / Learning", icon: BookOpen },
];

export const TECH_ICON_OPTIONS = [
  { key: "react", name: "React", defaultColor: "text-cyan-400" },
  { key: "next", name: "Next.js", defaultColor: "text-slate-900 dark:text-white" },
  { key: "typescript", name: "TypeScript", defaultColor: "text-blue-500" },
  { key: "javascript", name: "JavaScript", defaultColor: "text-yellow-400" },
  { key: "node", name: "Node.js", defaultColor: "text-emerald-500" },
  { key: "express", name: "Express", defaultColor: "text-slate-700 dark:text-slate-300" },
  { key: "mongo", name: "MongoDB", defaultColor: "text-emerald-600 dark:text-emerald-400" },
  { key: "tailwind", name: "Tailwind CSS", defaultColor: "text-sky-400" },
  { key: "git", name: "Git", defaultColor: "text-orange-500" },
  { key: "github", name: "GitHub", defaultColor: "text-slate-900 dark:text-white" },
  { key: "html", name: "HTML5", defaultColor: "text-orange-500" },
  { key: "css", name: "CSS3", defaultColor: "text-blue-500" },
  { key: "framer", name: "Framer Motion", defaultColor: "text-[#ff0055]" },
  { key: "vite", name: "Vite", defaultColor: "text-purple-400" },
  { key: "firebase", name: "Firebase", defaultColor: "text-amber-500" },
  { key: "postgres", name: "PostgreSQL", defaultColor: "text-sky-500" },
  { key: "redis", name: "Redis", defaultColor: "text-red-500" },
  { key: "graphql", name: "GraphQL", defaultColor: "text-pink-600" },
  { key: "prisma", name: "Prisma", defaultColor: "text-teal-500" },
  { key: "supabase", name: "Supabase", defaultColor: "text-emerald-400" },
  { key: "docker", name: "Docker", defaultColor: "text-sky-500" },
  { key: "aws", name: "AWS", defaultColor: "text-amber-500" },
  { key: "python", name: "Python", defaultColor: "text-blue-400" },
  { key: "vscode", name: "VS Code", defaultColor: "text-blue-500" },
];

export function renderTraitIcon(iconKey: string, className = "w-5 h-5") {
  const key = (iconKey || "").toLowerCase().trim();
  switch (key) {
    case "check":
      return <CheckCircle2 className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "code":
      return <Code2 className={className} />;
    case "rocket":
      return <Rocket className={className} />;
    case "target":
      return <Target className={className} />;
    case "award":
      return <Award className={className} />;
    case "star":
      return <Star className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "terminal":
      return <Terminal className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function renderStatIcon(iconKey: string, className = "w-3.5 h-3.5") {
  const key = (iconKey || "").toLowerCase().trim();
  switch (key) {
    case "terminal":
      return <Terminal className={className} />;
    case "code":
      return <Code2 className={className} />;
    case "git":
    case "github":
    case "commits":
      return <FolderGit2 className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "briefcase":
      return <Briefcase className={className} />;
    case "coffee":
      return <Coffee className={className} />;
    case "award":
      return <Award className={className} />;
    case "users":
      return <Users className={className} />;
    case "rocket":
      return <Rocket className={className} />;
    case "globe":
      return <Globe className={className} />;
    default:
      return <Code2 className={className} />;
  }
}

export function renderLearningIcon(iconKey: string, className = "w-4 h-4") {
  const key = (iconKey || "").toLowerCase().trim();
  switch (key) {
    case "brain":
    case "ai":
      return <BrainCircuit className={className} />;
    case "rocket":
      return <Rocket className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "cloud":
      return <Cloud className={className} />;
    case "layers":
      return <Layers className={className} />;
    case "server":
      return <Server className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "book":
      return <BookOpen className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function renderAboutTechIcon(iconKey: string, className = "w-3.5 h-3.5") {
  const key = (iconKey || "").toLowerCase().trim();
  if (key.includes("next")) return <SiNextdotjs className={className} />;
  if (key.includes("react")) return <FaReact className={className} />;
  if (key.includes("typescript") || key === "ts") return <SiTypescript className={className} />;
  if (key.includes("javascript") || key === "js") return <FaJs className={className} />;
  if (key.includes("node")) return <FaNodeJs className={className} />;
  if (key.includes("express")) return <SiExpress className={className} />;
  if (key.includes("mongo")) return <SiMongodb className={className} />;
  if (key.includes("tailwind")) return <SiTailwindcss className={className} />;
  if (key.includes("github")) return <FaGithub className={className} />;
  if (key.includes("git")) return <FaGitAlt className={className} />;
  if (key.includes("html")) return <FaHtml5 className={className} />;
  if (key.includes("css")) return <FaCss3Alt className={className} />;
  if (key.includes("framer")) return <SiFramer className={className} />;
  if (key.includes("vite")) return <SiVite className={className} />;
  if (key.includes("firebase")) return <SiFirebase className={className} />;
  if (key.includes("postgres")) return <SiPostgresql className={className} />;
  if (key.includes("redis")) return <SiRedis className={className} />;
  if (key.includes("graphql")) return <SiGraphql className={className} />;
  if (key.includes("prisma")) return <SiPrisma className={className} />;
  if (key.includes("supabase")) return <SiSupabase className={className} />;
  if (key.includes("docker")) return <FaDocker className={className} />;
  if (key.includes("aws")) return <FaAws className={className} />;
  if (key.includes("python")) return <FaPython className={className} />;
  if (key.includes("vscode")) return <VscCode className={className} />;
  if (key.includes("bun")) return <SiBun className={className} />;

  return <Code2 className={className} />;
}
