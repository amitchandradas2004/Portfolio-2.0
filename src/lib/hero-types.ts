export interface TechBadge {
  name: string;
  iconKey: string;
  colorClass: string;
  enabled: boolean;
}

export interface HeroData {
  _id?: string;
  greeting: string;
  name: string;
  designation: string;
  description: string;
  availabilityStatus?: string;
  isAvailable?: boolean;
  locationText?: string;
  resumeUrl: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  twitterUrl: string;
  email: string;
  techBadges: TechBadge[];
  updatedAt?: string;
}

export const defaultHeroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Amit Chandra Das",
  designation: "Full-Stack Developer",
  description:
    "I build scalable and modern web applications using React, Next.js, Node.js, and MongoDB. I love creating clean user experiences and solving real-world problems through technology.",
  availabilityStatus: "Available for Freelance & Full-Time Roles",
  isAvailable: true,
  locationText: "Dhaka, Bangladesh • Remote Worldwide",
  resumeUrl:
    "https://drive.google.com/file/d/1HHT7oDBDbTNMTAMEi9xEOqNkb_iP8vGP/view?usp=sharing",
  imageUrl: "/Amit_Image_3.png",
  githubUrl: "https://github.com/amitchandradas2004",
  linkedinUrl: "https://www.linkedin.com/in/amitchandradas2004",
  leetcodeUrl: "https://leetcode.com/u/amitchandradas2004",
  twitterUrl: "https://x.com/amitchandra2004",
  email: "amitchandradas950@gmail.com",
  techBadges: [
    { name: "React", iconKey: "react", colorClass: "text-cyan-400", enabled: true },
    { name: "Next.js", iconKey: "next", colorClass: "text-slate-900 dark:text-white", enabled: true },
    { name: "TypeScript", iconKey: "typescript", colorClass: "text-blue-500", enabled: true },
    { name: "Node.js", iconKey: "nodejs", colorClass: "text-emerald-500", enabled: true },
    { name: "MongoDB", iconKey: "mongodb", colorClass: "text-emerald-600 dark:text-emerald-400", enabled: true },
  ],
};

/**
 * Converts Google Drive share/view URLs into direct image CDN URLs.
 * Example input: https://drive.google.com/file/d/1LoW0JAgpuiXVjRpPp6brLi8tfVQzdLzy/view?usp=sharing
 * Transformed output: https://lh3.googleusercontent.com/d/1LoW0JAgpuiXVjRpPp6brLi8tfVQzdLzy
 */
export function formatImageUrl(url: string): string {
  if (!url) return "/Amit_Image_3.png";

  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);

  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }

  return url;
}
