"use client";

import React from "react";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";

export default function ProjectsLoading() {
  return (
    <main className="relative overflow-hidden pt-20 min-h-screen bg-white dark:bg-[#020617]">
      <ProjectsSkeleton />
    </main>
  );
}
