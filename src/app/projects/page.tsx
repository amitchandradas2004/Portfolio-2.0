// import React from "react";
// import Projects from "@/components/Projects";
// import { getProjects } from "@/lib/getProjects";

// export const metadata = {
//   title: "All Projects | Portfolio Showcase",
//   description: "Browse all featured full-stack applications, SaaS platforms, and developer tools.",
// };

// export default async function ProjectsPage() {
//   const projects = await getProjects();

//   return (
//     <main className="relative overflow-hidden pt-20 min-h-screen bg-white dark:bg-[#020617]">
//       <Projects projects={projects} />
//     </main>
//   );
// }
import React from "react";
import Projects from "@/components/Projects";
import { getProjects } from "@/lib/getProjects";

export const metadata = {
  title: "All Projects | Portfolio Showcase",
  description: "Browse all featured full-stack applications, SaaS platforms, and developer tools.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="relative overflow-hidden pt-28 pb-24 min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* 🌟 Ambient Liquid Glass Lighting Blobs (Crucial for glass refraction) */}
      <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-500/25 via-blue-500/15 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-12 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 via-indigo-500/15 to-transparent blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 via-sky-500/15 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-1 sm:px-1 lg:px-0 xl:px-0">
        {/* Projects Grid Container */}
        <Projects projects={projects} />

      </div>
    </main>
  );
}