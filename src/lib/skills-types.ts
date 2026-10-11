export interface SkillItem {
  id: string;
  name: string;
  iconKey: string;
  iconColor?: string;
  proficiency?: number;
  level?: string;
  enabled?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconKey: string;
  iconColor?: string;
  badgeBg?: string;
  glowColor?: string;
  skills: SkillItem[];
}

export interface LearningItem {
  id: string;
  name: string;
  iconKey: string;
  color?: string;
}

export interface SkillsData {
  _id?: string;
  badgeText: string;
  title: string;
  highlightedTitle: string;
  description: string;
  learningBadgeText: string;
  learningSectionTitle: string;
  learningSectionSubtitle: string;
  categories: SkillCategory[];
  learningItems: LearningItem[];
  updatedAt?: string;
}

export const defaultSkillsData: SkillsData = {
  badgeText: "Skills & Expertise",
  title: "Skills &",
  highlightedTitle: "Technologies",
  description: "Technologies and tools I use to build modern, scalable applications.",
  learningBadgeText: "Growth Mindset",
  learningSectionTitle: "Currently Learning & Exploring",
  learningSectionSubtitle: "Continuously expanding technical depth to build next-generation applications.",
  categories: [
    {
      id: "frontend",
      title: "Frontend Development",
      iconKey: "layout",
      iconColor: "text-sky-500 dark:text-[#38BDF8]",
      badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-400",
      glowColor: "from-sky-500/20 via-blue-500/10 to-transparent",
      skills: [
        { id: "nextjs", name: "Next.js", iconKey: "next", iconColor: "text-slate-900 dark:text-white", proficiency: 92, level: "Advanced", enabled: true },
        { id: "react", name: "React.js", iconKey: "react", iconColor: "text-cyan-400", proficiency: 95, level: "Expert", enabled: true },
        { id: "typescript", name: "TypeScript", iconKey: "typescript", iconColor: "text-blue-500", proficiency: 90, level: "Advanced", enabled: true },
        { id: "javascript", name: "JavaScript", iconKey: "javascript", iconColor: "text-yellow-400", proficiency: 94, level: "Expert", enabled: true },
        { id: "oauth", name: "O-Auth", iconKey: "oauth", iconColor: "text-blue-500", proficiency: 85, level: "Proficient", enabled: true },
        { id: "betterauth", name: "Better-Auth", iconKey: "betterauth", iconColor: "text-red-500", proficiency: 88, level: "Proficient", enabled: true },
        { id: "stripe", name: "Stripe", iconKey: "stripe", iconColor: "text-sky-500", proficiency: 82, level: "Proficient", enabled: true },
        { id: "tailwind", name: "Tailwind CSS", iconKey: "tailwind", iconColor: "text-sky-400", proficiency: 96, level: "Expert", enabled: true },
        { id: "html5", name: "HTML5", iconKey: "html5", iconColor: "text-orange-500", proficiency: 98, level: "Expert", enabled: true },
        { id: "css3", name: "CSS3", iconKey: "css3", iconColor: "text-blue-500", proficiency: 95, level: "Expert", enabled: true },
        { id: "framer", name: "Framer Motion", iconKey: "framer", iconColor: "text-[#ff0055]", proficiency: 88, level: "Advanced", enabled: true },
        { id: "daisyui", name: "DaisyUI", iconKey: "daisyui", iconColor: "text-yellow-400", proficiency: 90, level: "Advanced", enabled: true },
        { id: "heroui", name: "HeroUI", iconKey: "heroui", iconColor: "text-white dark:text-white", proficiency: 85, level: "Proficient", enabled: true },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      iconKey: "server",
      iconColor: "text-purple-500 dark:text-purple-400",
      badgeBg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      glowColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
      skills: [
        { id: "nodejs", name: "Node.js", iconKey: "nodejs", iconColor: "text-emerald-500", proficiency: 90, level: "Advanced", enabled: true },
        { id: "express", name: "Express.js", iconKey: "express", iconColor: "text-slate-700 dark:text-slate-300", proficiency: 88, level: "Advanced", enabled: true },
        { id: "restapi", name: "REST API", iconKey: "restapi", iconColor: "text-sky-500", proficiency: 92, level: "Expert", enabled: true },
        { id: "auth", name: "Authentication", iconKey: "auth", iconColor: "text-amber-500", proficiency: 87, level: "Proficient", enabled: true },
        { id: "zod", name: "ZOD", iconKey: "zod", iconColor: "text-amber-500", proficiency: 86, level: "Proficient", enabled: true },
        { id: "jwt", name: "JWT", iconKey: "jwt", iconColor: "text-pink-500", proficiency: 89, level: "Advanced", enabled: true },
      ],
    },
    {
      id: "database",
      title: "Database & Cloud",
      iconKey: "database",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      badgeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
      skills: [
        { id: "mongodb", name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500", proficiency: 92, level: "Advanced", enabled: true },
        { id: "mongodb-atlas", name: "MongoDB Atlas", iconKey: "mongodb-atlas", iconColor: "text-emerald-400", proficiency: 90, level: "Advanced", enabled: true },
        { id: "firebase", name: "Firebase", iconKey: "firebase", iconColor: "text-amber-500", proficiency: 82, level: "Proficient", enabled: true },
        { id: "cloudinary", name: "Cloudinary", iconKey: "cloudinary", iconColor: "text-blue-400", proficiency: 85, level: "Proficient", enabled: true },
      ],
    },
    {
      id: "tools",
      title: "Tools & Others",
      iconKey: "wrench",
      iconColor: "text-amber-500 dark:text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      glowColor: "from-amber-500/20 via-orange-500/10 to-transparent",
      skills: [
        { id: "git", name: "Git", iconKey: "git", iconColor: "text-orange-500", proficiency: 92, level: "Advanced", enabled: true },
        { id: "github", name: "GitHub", iconKey: "github", iconColor: "text-slate-900 dark:text-white", proficiency: 94, level: "Advanced", enabled: true },
        { id: "vscode", name: "VS Code", iconKey: "vscode", iconColor: "text-blue-500", proficiency: 96, level: "Expert", enabled: true },
        { id: "antigravity", name: "Antigravity-IDE", iconKey: "antigravity", iconColor: "text-blue-500", proficiency: 95, level: "Expert", enabled: true },
        { id: "vercel", name: "Vercel", iconKey: "vercel", iconColor: "text-slate-900 dark:text-white", proficiency: 88, level: "Advanced", enabled: true },
        { id: "postman", name: "Postman", iconKey: "postman", iconColor: "text-orange-500", proficiency: 89, level: "Advanced", enabled: true },
      ],
    },
  ],
  learningItems: [
    { id: "ai", name: "AI Integration", iconKey: "brain", color: "text-purple-400" },
    { id: "system-design", name: "System Design", iconKey: "layers", color: "text-sky-400" },
    { id: "adv-ts", name: "Advanced TypeScript", iconKey: "typescript", color: "text-blue-500" },
    { id: "cloud", name: "Cloud Technologies", iconKey: "cloud", color: "text-emerald-400" },
  ],
};
