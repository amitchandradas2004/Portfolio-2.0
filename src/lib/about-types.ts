export interface AboutTrait {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  iconColor?: string;
  badgeBg?: string;
}

export type StatType = "manual" | "experience" | "projects" | "github-commits";

export interface AboutStat {
  id: string;
  label: string;
  value: string;
  sub: string;
  iconKey: string;
  color: string;
  statType?: StatType;
  /** ISO date string, e.g. "2024-04-01" — used when statType is "experience" */
  experienceStartDate?: string;
  /** @deprecated use statType: "github-commits" instead; kept for backward compat */
  useLiveGithubCommits?: boolean;
}

export interface AboutTech {
  id: string;
  name: string;
  iconKey: string;
  color: string;
  enabled?: boolean;
}

export interface AboutLearning {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
}

export interface AboutData {
  _id?: string;
  badgeText: string;
  title: string;
  highlightedTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  traits: AboutTrait[];

  // Liquid glass overview card
  cardRole: string;
  cardStatus: string;
  cardStatusActive: boolean;
  githubUsername: string;
  stats: AboutStat[];
  currentTechs: AboutTech[];
  learningFocus: AboutLearning[];

  /** Auto-count projects from the projects collection instead of using a static value */
  autoCountProjects?: boolean;

  updatedAt?: string;
}

export const defaultAboutData: AboutData = {
  badgeText: "About Me",
  title: "Crafting Digital Solutions with",
  highlightedTitle: "Passion & Precision",
  paragraph1:
    "Hello! I'm Amit Chandra Das, a full-stack developer passionate about building modern, scalable, and user-friendly web applications. I work with React, Next.js, TypeScript, Node.js, and MongoDB to create seamless digital experiences with clean, responsive interfaces and reliable backend systems.",
  paragraph2:
    "My journey into web development began with curiosity about how interactive applications work behind the scenes. Since then, I've built real-world projects, developed RESTful APIs, implemented authentication and authorization, integrated payment systems, and worked with databases to deliver functional, full-stack solutions.",
  paragraph3:
    "Beyond coding, I enjoy exploring modern web technologies, refining UI interactions, collaborating with other developers, and solving real-world problems through software. I value clean, maintainable code, continuous learning, and building intuitive user experiences while growing as a developer through hands-on projects and collaboration.",
  traits: [
    {
      id: "clean-arch",
      title: "Clean Architecture",
      description: "Modularity, reusability, and maintainable codebase standards.",
      iconKey: "check",
      iconColor: "text-sky-500",
      badgeBg: "bg-sky-500/10",
    },
    {
      id: "user-centric",
      title: "User-Centric Design",
      description: "Smooth micro-interactions and pixel-perfect responsiveness.",
      iconKey: "sparkles",
      iconColor: "text-purple-500",
      badgeBg: "bg-purple-500/10",
    },
  ],
  cardRole: "Full Stack Developer",
  cardStatus: "Open to Work",
  cardStatusActive: true,
  githubUsername: "amitchandradas2004",
  autoCountProjects: true,
  stats: [
    {
      id: "experience",
      label: "Months Experience",
      value: "6+",
      sub: "Hands-on Building",
      iconKey: "terminal",
      color: "from-sky-500 to-blue-600",
      statType: "experience" as const,
      experienceStartDate: "2024-04-01",
      useLiveGithubCommits: false,
    },
    {
      id: "projects",
      label: "Projects Built",
      value: "10+",
      sub: "Full-Stack & Web Apps",
      iconKey: "code",
      color: "from-blue-500 to-purple-600",
      statType: "projects" as const,
      useLiveGithubCommits: false,
    },
    {
      id: "commits",
      label: "Git Commits",
      value: "1300+",
      sub: "Live GitHub Count",
      iconKey: "git",
      color: "from-purple-500 to-pink-600",
      statType: "github-commits" as const,
      useLiveGithubCommits: true,
    },
    {
      id: "quality",
      label: "Code Quality",
      value: "100%",
      sub: "Clean & Maintainable",
      iconKey: "zap",
      color: "from-emerald-500 to-teal-600",
      statType: "manual" as const,
      useLiveGithubCommits: false,
    },
  ],
  currentTechs: [
    { id: "react", name: "React", iconKey: "react", color: "text-cyan-400", enabled: true },
    { id: "nextjs", name: "Next.js", iconKey: "next", color: "text-slate-900 dark:text-white", enabled: true },
    { id: "typescript", name: "TypeScript", iconKey: "typescript", color: "text-blue-500", enabled: true },
    { id: "nodejs", name: "Node.js", iconKey: "node", color: "text-emerald-500", enabled: true },
    { id: "express", name: "Express", iconKey: "express", color: "text-slate-700 dark:text-slate-300", enabled: true },
    { id: "mongodb", name: "MongoDB", iconKey: "mongo", color: "text-emerald-600 dark:text-emerald-400", enabled: true },
    { id: "tailwind", name: "Tailwind CSS", iconKey: "tailwind", color: "text-sky-400", enabled: true },
    { id: "git", name: "Git", iconKey: "git", color: "text-orange-500", enabled: true },
  ],
  learningFocus: [
    {
      id: "ai-llms",
      title: "AI Integration & LLMs",
      desc: "Integrating intelligent agents & API workflows into web apps.",
      iconKey: "brain",
    },
    {
      id: "cloud-microservices",
      title: "Cloud & Microservices",
      desc: "Scalable serverless functions and modern container deployment.",
      iconKey: "rocket",
    },
    {
      id: "web-performance",
      title: "Web Performance",
      desc: "Optimizing Core Web Vitals, SSR, and rendering efficiency.",
      iconKey: "sparkles",
    },
  ],
};
