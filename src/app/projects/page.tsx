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
    <main className="relative overflow-hidden pt-20 min-h-screen bg-white dark:bg-[#020617]">
      <Projects projects={projects} />
    </main>
  );
}
