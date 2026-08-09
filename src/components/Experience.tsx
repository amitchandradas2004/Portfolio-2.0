"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Code2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { RenderTechIcon } from "./RenderTechIcon";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyLink?: string;
  duration: string;
  description: string;
  responsibilities?: string[];
  skillsDeveloped?: string[];
  technologies?: { name: string; iconKey?: string; iconColor?: string }[];
  isCurrent?: boolean;
  badge?: string;
  offerLetter?: {
    text: string;
    link: string;
  };
}

const experienceData: ExperienceItem[] = [
  {
    id: "oasis-infobyte-web-development-intern",
    role: "Web Development and Designing Intern",
    company: "Oasis Infobyte",
    companyLink: "https://www.linkedin.com/company/oasis-infobyte/",
    duration: "August 5th 2026 - September 5th 2026",

    description:
      "Working as a Web Development and Designing Intern at Oasis Infobyte, gaining practical experience through hands-on projects involving frontend development, responsive web design, and modern web development practices.",

    isCurrent: true,
    badge: "Remote Internship",

    offerLetter: {
      text: "View Offer Letter",
      link: "https://drive.google.com/file/d/1vf4Qr7meno7PrFVxjMwOtzSNKPUb7QNg/view?usp=sharing",
    },

    responsibilities: [
      "Developed responsive and user-friendly web interfaces using modern frontend technologies",
      "Implemented web development concepts through practical project-based tasks",
      "Applied HTML, CSS, JavaScript, and responsive design principles to build functional websites",
      "Improved UI/UX implementation skills by focusing on clean and intuitive designs",
      "Maintained organized code structure and followed best practices for web development",
      "Documented project work and maintained GitHub repositories with proper README files",
    ],

    technologies: [
      {
        name: "HTML5",
        iconKey: "html",
        iconColor: "text-orange-500",
      },
      {
        name: "CSS3",
        iconKey: "css",
        iconColor: "text-blue-500",
      },
      {
        name: "Tailwind CSS",
        iconKey: "tailwind",
        iconColor: "text-sky-400",
      },
      {
        name: "JavaScript(ES6+)",
        iconKey: "javascript",
        iconColor: "text-yellow-400",
      },
      {
        name: "React.js",
        iconKey: "react",
        iconColor: "text-cyan-400",
      },
      {
        name: "Next.js",
        iconKey: "nextjs",
        iconColor: "text-slate-900 dark:text-white",
      },
      {
        name: "Responsive Web Design",
        iconKey: "responsive",
        iconColor: "text-purple-500",
      },
      {
        name: "Git & GitHub",
        iconKey: "github",
        iconColor: "text-slate-900 dark:text-white",
      },
    ],
  },
  {
    id: "codveda-fullstack-intern",
    role: "Full Stack Development Intern",
    company: "Codveda Technologies",
    companyLink: "https://www.linkedin.com/company/codveda-technologies",
    duration: "August 2nd 2026 - September 2nd 2026",
    description:
      "Working as a Full Stack Development Intern at Codveda Technologies, gaining hands-on experience in building modern web applications, developing REST APIs, integrating frontend interfaces, and implementing full-stack development practices.",
    isCurrent: true,
    badge: "Remote Internship",
    offerLetter: {
      text: "View Offer Letter",
      link: "https://drive.google.com/file/d/1NlPDTt66nAFJ4wGGM6MnymgdsJWcoUAZ/view?usp=sharing",
    },
    responsibilities: [
      "Developed backend REST APIs using Node.js and Express.js",
      "Implemented CRUD operations and API routing following REST principles",
      "Built responsive frontend interfaces using HTML, CSS, and JavaScript",
      "Integrated frontend applications with backend APIs using Fetch API",
      "Worked on database integration and full-stack application workflows",
      "Tested APIs using tools like Postman and Thunder Client",
    ],
    technologies: [
      {
        name: "Node.js",
        iconKey: "nodejs",
        iconColor: "text-emerald-500",
      },
      {
        name: "Express.js",
        iconKey: "express",
        iconColor: "text-slate-900 dark:text-white",
      },
      {
        name: "JavaScript(ES6+)",
        iconKey: "javascript",
        iconColor: "text-yellow-400",
      },
      {
        name: "REST API",
        iconKey: "api",
        iconColor: "text-blue-500",
      },
      {
        name: "MongoDB",
        iconKey: "mongodb",
        iconColor: "text-emerald-500",
      },
      {
        name: "Git & GitHub",
        iconKey: "github",
        iconColor: "text-slate-900 dark:text-white",
      },
    ],
  },
  {
    id: "fullstack-dev",
    role: "Full Stack Developer",
    company: "Personal Projects",
    duration: "2025 - Present",
    description:
      "Building modern full-stack web applications using Next.js, TypeScript, Node.js, Express.js, and MongoDB.",
    isCurrent: true,
    badge: "Full-Time Development",
    responsibilities: [
      "Developed responsive frontend applications with Next.js & Tailwind CSS",
      "Built robust RESTful APIs using Express.js & Node.js",
      "Designed & optimized MongoDB database schemas",
      "Implemented secure authentication systems (Better Auth & OAuth)",
      "Improved application load performance & SEO score",
    ],
    technologies: [
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-slate-900 dark:text-white" },
      { name: "React", iconKey: "react", iconColor: "text-cyan-400" }, {
        name: "JavaScript(ES6+)",
        iconKey: "javascript",
        iconColor: "text-yellow-400",
      },
      { name: "TypeScript", iconKey: "typescript", iconColor: "text-blue-500" },
      { name: "Node.js", iconKey: "nodejs", iconColor: "text-emerald-500" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
      { name: "Tailwind CSS", iconKey: "tailwind", iconColor: "text-sky-400" },
    ],
  },
  {
    id: "web-dev-student",
    role: "Web Development Student",
    company: "Programming Hero",
    companyLink: "https://www.programming-hero.com",
    duration: "2026",
    description:
      "Completed the Complete Web Development Course and gained practical experience building real-world applications.",
    isCurrent: false,
    badge: "Course & Practical Labs",
    skillsDeveloped: [
      "Frontend development with React & modern HTML5/CSS3",
      "Backend API development with Node.js & Express.js",
      "Database management & aggregation queries with MongoDB",
      "Production deployment to Vercel, Netlify, & Cloud platforms",
    ],
    technologies: [
      { name: "HTML5", iconKey: "html5", iconColor: "text-red-500" },
      { name: "CSS3", iconKey: "css3", iconColor: "text-blue-500" },
      { name: "React.js", iconKey: "react", iconColor: "text-cyan-400" },
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-slate-900 dark:text-white" },
      { name: "Node.js", iconKey: "nodejs", iconColor: "text-emerald-500" },
      {
        name: "JavaScript(ES6+)",
        iconKey: "javascript",
        iconColor: "text-yellow-400",
      },
      { name: "Express.js", iconKey: "express", iconColor: "text-slate-700 dark:text-slate-300" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 relative overflow-hidden bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <Briefcase className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Work & Practical Growth</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            My development journey, projects, and practical experience.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative container mx-auto">
          {/* Vertical Central Line (Desktop center, Mobile left side) */}
          <div className="absolute top-0 bottom-0 left-6 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500 via-blue-600 to-purple-600 opacity-30 dark:opacity-40" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-12 lg:space-y-16"
          >
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center"
                >
                  {/* TIMELINE NODE DOT */}
                  <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-1.5 lg:top-1/2 lg:-translate-y-1/2 z-20 -translate-x-1/2 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-[#020617] border-2 border-sky-500 shadow-md shadow-sky-500/20">
                      <div
                        className={`w-3 h-3 rounded-full ${item.isCurrent
                          ? "bg-sky-500 animate-pulse"
                          : "bg-blue-600 dark:bg-sky-400"
                          }`}
                      />
                    </div>
                  </div>

                  {/* DESKTOP ALTERNATING CARD POSITIONS */}
                  {/* Left Side Container (For even items on desktop) */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-0 lg:pr-12 lg:text-right">
                    {isEven && (
                      <motion.div
                        variants={cardLeftVariants}
                        whileHover={{ y: -6 }}
                        className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-lg shadow-slate-900/5 dark:shadow-black/30 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-300 p-6 sm:p-7"
                      >
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3 lg:justify-end">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                              {item.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/60">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>{item.duration}</span>
                          </span>
                          {item.offerLetter && (
                            <a
                              href={item.offerLetter.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200 cursor-pointer shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{item.offerLetter.text}</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                          )}
                        </div>

                        {/* Role Title */}
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                          {item.role}
                        </h3>

                        {/* Company / Organization Name */}
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 mb-4 lg:justify-end">
                          <Building2 className="w-4 h-4 shrink-0" />
                          {item.companyLink ? (
                            <a
                              href={item.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-sky-500 dark:hover:text-sky-300 transition-colors duration-200"
                            >
                              {item.company}
                            </a>
                          ) : (
                            <span>{item.company}</span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                          {item.description}
                        </p>

                        {/* Responsibilities List */}
                        {item.responsibilities && (
                          <div className="mb-5 text-left">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 lg:text-right">
                              Key Responsibilities & Highlights
                            </h4>
                            <ul className="space-y-2">
                              {item.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 lg:flex-row-reverse"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="lg:text-right">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills Developed List */}
                        {item.skillsDeveloped && (
                          <div className="mb-5 text-left">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 lg:text-right">
                              Skills Developed & Practical Labs
                            </h4>
                            <ul className="space-y-2">
                              {item.skillsDeveloped.map((skill, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 lg:flex-row-reverse"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="lg:text-right">{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technology Badges */}
                        {item.technologies && (
                          <div className="flex flex-wrap gap-1.5 lg:justify-end pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech.name}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-200/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-slate-700/70 hover:border-sky-500/40 dark:hover:border-sky-400/40 hover:scale-105 transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-default"
                              >
                                <RenderTechIcon
                                  iconKey={tech.iconKey}
                                  className={`w-3.5 h-3.5 shrink-0 ${tech.iconColor || ""}`}
                                />
                                <span>{tech.name}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Container (For odd items on desktop) */}
                  <div className="w-full lg:w-1/2 pl-14 lg:pl-12 lg:text-left">
                    {!isEven && (
                      <motion.div
                        variants={cardRightVariants}
                        whileHover={{ y: -6 }}
                        className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 dark:hover:border-sky-400/40 shadow-lg shadow-slate-900/5 dark:shadow-black/30 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-sky-400/10 transition-all duration-300 p-6 sm:p-7"
                      >
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                              {item.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700/60">
                            <Calendar className="w-3.5 h-3.5 text-sky-500" />
                            <span>{item.duration}</span>
                          </span>
                          {item.offerLetter && (
                            <a
                              href={item.offerLetter.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200 cursor-pointer shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{item.offerLetter.text}</span>
                              <ExternalLink className="w-3 h-3 opacity-70" />
                            </a>
                          )}
                        </div>

                        {/* Role Title */}
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
                          {item.role}
                        </h3>

                        {/* Company / Organization Name */}
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 mb-4">
                          <Building2 className="w-4 h-4 shrink-0" />
                          {item.companyLink ? (
                            <a
                              href={item.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-sky-500 dark:hover:text-sky-300 transition-colors duration-200"
                            >
                              {item.company}
                            </a>
                          ) : (
                            <span>{item.company}</span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                          {item.description}
                        </p>

                        {/* Responsibilities List */}
                        {item.responsibilities && (
                          <div className="mb-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                              Key Responsibilities & Highlights
                            </h4>
                            <ul className="space-y-2">
                              {item.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills Developed List */}
                        {item.skillsDeveloped && (
                          <div className="mb-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                              Skills Developed & Practical Labs
                            </h4>
                            <ul className="space-y-2">
                              {item.skillsDeveloped.map((skill, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technology Badges */}
                        {item.technologies && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech.name}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-200/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-slate-700/70 hover:border-sky-500/40 dark:hover:border-sky-400/40 hover:scale-105 transition-all duration-200 flex items-center gap-1.5 shadow-2xs cursor-default"
                              >
                                <RenderTechIcon
                                  iconKey={tech.iconKey}
                                  className={`w-3.5 h-3.5 shrink-0 ${tech.iconColor || ""}`}
                                />
                                <span>{tech.name}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
