import {
  Boxes,
  BrainCircuit,
  Cloud,
  Code,
  Cpu,
  Database,
  Folder,
  Globe,
  Layers,
  Layout,
  type LucideIcon,
  Package,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import { BsStripe } from "react-icons/bs";
import {
  FaAngular,
  FaAws,
  FaCss3Alt,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaGolang,
  FaHtml5,
  FaJava,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRust,
  FaSass,
  FaVuejs,
} from "react-icons/fa6";
import {
  SiBetterauth,
  SiBun,
  SiCloudinary,
  SiCplusplus,
  SiDaisyui,
  SiDjango,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiHeroui,
  SiJsonwebtokens,
  SiKubernetes,
  SiLeetcode,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

export interface IconOption {
  key: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "general";
  defaultColor: string;
}

export interface CategoryIconOption {
  key: string;
  name: string;
  icon: LucideIcon;
}

export const POPULAR_SKILL_ICONS: IconOption[] = [
  // Frontend
  {
    key: "react",
    name: "React.js",
    category: "frontend",
    defaultColor: "text-cyan-400",
  },
  {
    key: "next",
    name: "Next.js",
    category: "frontend",
    defaultColor: "text-slate-900 dark:text-white",
  },
  {
    key: "typescript",
    name: "TypeScript",
    category: "frontend",
    defaultColor: "text-blue-500",
  },
  {
    key: "javascript",
    name: "JavaScript",
    category: "frontend",
    defaultColor: "text-yellow-400",
  },
  {
    key: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    defaultColor: "text-sky-400",
  },
  {
    key: "html5",
    name: "HTML5",
    category: "frontend",
    defaultColor: "text-orange-500",
  },
  {
    key: "css3",
    name: "CSS3",
    category: "frontend",
    defaultColor: "text-blue-500",
  },
  {
    key: "framer",
    name: "Framer Motion",
    category: "frontend",
    defaultColor: "text-[#ff0055]",
  },
  {
    key: "daisyui",
    name: "DaisyUI",
    category: "frontend",
    defaultColor: "text-yellow-400",
  },
  {
    key: "heroui",
    name: "HeroUI",
    category: "frontend",
    defaultColor: "text-white",
  },
  {
    key: "vue",
    name: "Vue.js",
    category: "frontend",
    defaultColor: "text-emerald-500",
  },
  {
    key: "angular",
    name: "Angular",
    category: "frontend",
    defaultColor: "text-red-600",
  },
  {
    key: "sass",
    name: "Sass",
    category: "frontend",
    defaultColor: "text-pink-500",
  },
  {
    key: "vite",
    name: "Vite",
    category: "frontend",
    defaultColor: "text-purple-400",
  },
  {
    key: "oauth",
    name: "O-Auth",
    category: "frontend",
    defaultColor: "text-blue-500",
  },
  {
    key: "betterauth",
    name: "Better-Auth",
    category: "frontend",
    defaultColor: "text-red-500",
  },
  {
    key: "stripe",
    name: "Stripe",
    category: "frontend",
    defaultColor: "text-sky-500",
  },

  // Backend
  {
    key: "nodejs",
    name: "Node.js",
    category: "backend",
    defaultColor: "text-emerald-500",
  },
  {
    key: "express",
    name: "Express.js",
    category: "backend",
    defaultColor: "text-slate-700 dark:text-slate-300",
  },
  {
    key: "restapi",
    name: "REST API",
    category: "backend",
    defaultColor: "text-sky-500",
  },
  {
    key: "auth",
    name: "Authentication",
    category: "backend",
    defaultColor: "text-amber-500",
  },
  {
    key: "zod",
    name: "ZOD",
    category: "backend",
    defaultColor: "text-amber-500",
  },
  {
    key: "jwt",
    name: "JWT",
    category: "backend",
    defaultColor: "text-pink-500",
  },
  {
    key: "python",
    name: "Python",
    category: "backend",
    defaultColor: "text-blue-400",
  },
  {
    key: "django",
    name: "Django",
    category: "backend",
    defaultColor: "text-emerald-600",
  },
  {
    key: "fastapi",
    name: "FastAPI",
    category: "backend",
    defaultColor: "text-teal-400",
  },
  {
    key: "golang",
    name: "Go / Golang",
    category: "backend",
    defaultColor: "text-cyan-400",
  },
  {
    key: "rust",
    name: "Rust",
    category: "backend",
    defaultColor: "text-orange-600",
  },
  {
    key: "java",
    name: "Java",
    category: "backend",
    defaultColor: "text-red-500",
  },
  {
    key: "cplusplus",
    name: "C++",
    category: "backend",
    defaultColor: "text-blue-600",
  },
  {
    key: "bun",
    name: "Bun",
    category: "backend",
    defaultColor: "text-amber-200",
  },
  {
    key: "graphql",
    name: "GraphQL",
    category: "backend",
    defaultColor: "text-pink-600",
  },
  {
    key: "prisma",
    name: "Prisma",
    category: "backend",
    defaultColor: "text-teal-500",
  },

  // Database
  {
    key: "mongodb",
    name: "MongoDB",
    category: "database",
    defaultColor: "text-emerald-500",
  },
  {
    key: "mongodb-atlas",
    name: "MongoDB Atlas",
    category: "database",
    defaultColor: "text-emerald-400",
  },
  {
    key: "postgresql",
    name: "PostgreSQL",
    category: "database",
    defaultColor: "text-sky-500",
  },
  {
    key: "mysql",
    name: "MySQL",
    category: "database",
    defaultColor: "text-blue-500",
  },
  {
    key: "redis",
    name: "Redis",
    category: "database",
    defaultColor: "text-red-500",
  },
  {
    key: "supabase",
    name: "Supabase",
    category: "database",
    defaultColor: "text-emerald-400",
  },
  {
    key: "firebase",
    name: "Firebase",
    category: "database",
    defaultColor: "text-amber-500",
  },
  {
    key: "cloudinary",
    name: "Cloudinary",
    category: "database",
    defaultColor: "text-blue-400",
  },

  // Tools & Others
  {
    key: "git",
    name: "Git",
    category: "tools",
    defaultColor: "text-orange-500",
  },
  {
    key: "github",
    name: "GitHub",
    category: "tools",
    defaultColor: "text-slate-900 dark:text-white",
  },
  {
    key: "vscode",
    name: "VS Code",
    category: "tools",
    defaultColor: "text-blue-500",
  },
  {
    key: "antigravity",
    name: "Antigravity-IDE",
    category: "tools",
    defaultColor: "text-blue-500",
  },
  {
    key: "vercel",
    name: "Vercel",
    category: "tools",
    defaultColor: "text-slate-900 dark:text-white",
  },
  {
    key: "postman",
    name: "Postman",
    category: "tools",
    defaultColor: "text-orange-500",
  },
  {
    key: "docker",
    name: "Docker",
    category: "tools",
    defaultColor: "text-sky-500",
  },
  {
    key: "kubernetes",
    name: "Kubernetes",
    category: "tools",
    defaultColor: "text-blue-500",
  },
  {
    key: "aws",
    name: "AWS",
    category: "tools",
    defaultColor: "text-amber-500",
  },
  {
    key: "linux",
    name: "Linux",
    category: "tools",
    defaultColor: "text-yellow-500",
  },
  {
    key: "figma",
    name: "Figma",
    category: "tools",
    defaultColor: "text-purple-400",
  },
  {
    key: "leetcode",
    name: "LeetCode",
    category: "tools",
    defaultColor: "text-amber-500",
  },

  // General / Growth
  {
    key: "brain",
    name: "AI / Brain",
    category: "general",
    defaultColor: "text-purple-400",
  },
  {
    key: "layers",
    name: "System Design",
    category: "general",
    defaultColor: "text-sky-400",
  },
  {
    key: "cloud",
    name: "Cloud Tech",
    category: "general",
    defaultColor: "text-emerald-400",
  },
  {
    key: "code",
    name: "Coding",
    category: "general",
    defaultColor: "text-blue-400",
  },
  {
    key: "terminal",
    name: "Terminal",
    category: "general",
    defaultColor: "text-emerald-400",
  },
  {
    key: "sparkles",
    name: "Sparkles",
    category: "general",
    defaultColor: "text-amber-400",
  },
];

export const SKILL_COLOR_PRESETS = [
  { name: "Cyan", value: "text-cyan-400", bg: "bg-cyan-400" },
  { name: "Sky", value: "text-sky-400", bg: "bg-sky-400" },
  { name: "Blue", value: "text-blue-500", bg: "bg-blue-500" },
  { name: "Indigo", value: "text-indigo-400", bg: "bg-indigo-400" },
  { name: "Purple", value: "text-purple-500", bg: "bg-purple-500" },
  { name: "Pink", value: "text-pink-500", bg: "bg-pink-500" },
  { name: "Rose", value: "text-rose-500", bg: "bg-rose-500" },
  { name: "Red", value: "text-red-500", bg: "bg-red-500" },
  { name: "Orange", value: "text-orange-500", bg: "bg-orange-500" },
  { name: "Amber", value: "text-amber-500", bg: "bg-amber-500" },
  { name: "Yellow", value: "text-yellow-400", bg: "bg-yellow-400" },
  { name: "Emerald", value: "text-emerald-500", bg: "bg-emerald-500" },
  { name: "Teal", value: "text-teal-400", bg: "bg-teal-400" },
  {
    name: "Light/Dark",
    value: "text-slate-900 dark:text-white",
    bg: "bg-slate-400",
  },
  {
    name: "White",
    value: "text-white",
    bg: "bg-white border border-slate-300",
  },
];

export const CATEGORY_ICON_OPTIONS: CategoryIconOption[] = [
  { key: "layout", name: "Layout (Frontend)", icon: Layout },
  { key: "server", name: "Server (Backend)", icon: Server },
  { key: "database", name: "Database (Cloud)", icon: Database },
  { key: "wrench", name: "Wrench (Tools)", icon: Wrench },
  { key: "cpu", name: "CPU / Hardware", icon: Cpu },
  { key: "code", name: "Code", icon: Code },
  { key: "globe", name: "Globe / Web", icon: Globe },
  { key: "terminal", name: "Terminal / CLI", icon: Terminal },
  { key: "shield", name: "Shield / Security", icon: ShieldCheck },
  { key: "cloud", name: "Cloud / DevOps", icon: Cloud },
  { key: "layers", name: "Layers / Architecture", icon: Layers },
  { key: "brain", name: "Brain / AI", icon: BrainCircuit },
  { key: "sparkles", name: "Sparkles", icon: Sparkles },
  { key: "boxes", name: "Boxes / Packages", icon: Boxes },
  { key: "zap", name: "Zap / Performance", icon: Zap },
];

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  ...Object.fromEntries(
    CATEGORY_ICON_OPTIONS.map(({ key, icon }) => [key, icon]),
  ),
  frontend: Layout,
  backend: Server,
  db: Database,
  "cloud-db": Database,
  tools: Wrench,
  web: Globe,
  auth: ShieldCheck,
  security: ShieldCheck,
  ai: BrainCircuit,
};

export function renderCategoryIcon(iconKey: string, className = "w-5 h-5") {
  const key = (iconKey || "").toLowerCase().trim();
  const Icon = CATEGORY_ICON_MAP[key] ?? Sparkles;
  return <Icon className={className} />;
}

export function renderSkillIcon(iconKey: string, className = "w-4 h-4") {
  const key = (iconKey || "").toLowerCase().trim();

  // Frontend
  if (key.includes("next")) return <SiNextdotjs className={className} />;
  if (key.includes("react")) return <FaReact className={className} />;
  if (key.includes("typescript") || key === "ts")
    return <SiTypescript className={className} />;
  if (key.includes("javascript") || key === "js")
    return <FaJs className={className} />;
  if (key.includes("tailwind")) return <SiTailwindcss className={className} />;
  if (key.includes("html")) return <FaHtml5 className={className} />;
  if (key.includes("css")) return <FaCss3Alt className={className} />;
  if (key.includes("framer") || key.includes("motion"))
    return <SiFramer className={className} />;
  if (key.includes("daisy")) return <SiDaisyui className={className} />;
  if (key.includes("hero")) return <SiHeroui className={className} />;
  if (key.includes("vue")) return <FaVuejs className={className} />;
  if (key.includes("angular")) return <FaAngular className={className} />;
  if (key.includes("sass") || key.includes("scss"))
    return <FaSass className={className} />;
  if (key.includes("vite")) return <SiVite className={className} />;
  if (key.includes("betterauth")) return <SiBetterauth className={className} />;
  if (key.includes("oauth") || key.includes("shield") || key.includes("auth")) {
    return <ShieldCheck className={className} />;
  }
  if (key.includes("stripe")) return <BsStripe className={className} />;

  // Backend
  if (key.includes("node")) return <FaNodeJs className={className} />;
  if (key.includes("express")) return <SiExpress className={className} />;
  if (key.includes("fastapi")) return <SiFastapi className={className} />;
  if (key.includes("rest") || key.includes("api"))
    return <Globe className={className} />;
  if (key.includes("zod")) return <SiZod className={className} />;
  if (key.includes("jwt") || key.includes("token"))
    return <SiJsonwebtokens className={className} />;
  if (key.includes("python") || key === "py")
    return <FaPython className={className} />;
  if (key.includes("django")) return <SiDjango className={className} />;
  if (key.includes("golang") || key === "go")
    return <FaGolang className={className} />;
  if (key.includes("rust")) return <FaRust className={className} />;
  if (key.includes("java")) return <FaJava className={className} />;
  if (key.includes("c++") || key.includes("cplusplus") || key.includes("cpp")) {
    return <SiCplusplus className={className} />;
  }
  if (key.includes("bun")) return <SiBun className={className} />;
  if (key.includes("graphql") || key.includes("gql"))
    return <SiGraphql className={className} />;
  if (key.includes("prisma")) return <SiPrisma className={className} />;

  // Database
  if (key.includes("mongo")) return <SiMongodb className={className} />;
  if (key.includes("postgres")) return <SiPostgresql className={className} />;
  if (key.includes("mysql") || key.includes("sql"))
    return <SiMysql className={className} />;
  if (key.includes("redis")) return <SiRedis className={className} />;
  if (key.includes("supabase")) return <SiSupabase className={className} />;
  if (key.includes("firebase")) return <SiFirebase className={className} />;
  if (key.includes("cloudinary")) return <SiCloudinary className={className} />;

  // Tools & Others
  if (key.includes("github")) return <FaGithub className={className} />;
  if (key.includes("git")) return <FaGitAlt className={className} />;
  if (key.includes("vscode") || key.includes("antigravity"))
    return <VscCode className={className} />;
  if (key.includes("vercel")) return <SiVercel className={className} />;
  if (key.includes("postman")) return <SiPostman className={className} />;
  if (key.includes("docker")) return <FaDocker className={className} />;
  if (key.includes("k8s") || key.includes("kubernetes"))
    return <SiKubernetes className={className} />;
  if (key.includes("aws")) return <FaAws className={className} />;
  if (key.includes("linux")) return <FaLinux className={className} />;
  if (key.includes("figma")) return <FaFigma className={className} />;
  if (key.includes("leetcode")) return <SiLeetcode className={className} />;

  // General Lucide icons
  if (key.includes("brain") || key.includes("ai"))
    return <BrainCircuit className={className} />;
  if (key.includes("layer")) return <Layers className={className} />;
  if (key.includes("cloud")) return <Cloud className={className} />;
  if (key.includes("terminal")) return <Terminal className={className} />;
  if (key.includes("code")) return <Code className={className} />;
  if (key.includes("cpu")) return <Cpu className={className} />;
  if (key.includes("sparkle")) return <Sparkles className={className} />;
  if (key.includes("zap")) return <Zap className={className} />;
  if (key.includes("package")) return <Package className={className} />;
  if (key.includes("folder")) return <Folder className={className} />;

  return <Code className={className} />;
}
