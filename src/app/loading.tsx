"use client";

import React from "react";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import AboutSkeleton from "@/components/skeletons/AboutSkeleton";
import SkillsSkeleton from "@/components/skeletons/SkillsSkeleton";
import ExperienceSkeleton from "@/components/skeletons/ExperienceSkeleton";
import FeaturedProjectsSkeleton from "@/components/skeletons/FeaturedProjectsSkeleton";
import EducationSkeleton from "@/components/skeletons/EducationSkeleton";
import ContactSkeleton from "@/components/skeletons/ContactSkeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-300 overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10 skeleton-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10 skeleton-glow" style={{ animationDelay: "-3s" }} />

      {/* 1. HERO SECTION SKELETON */}
      <HeroSkeleton />

      {/* 2. ABOUT SECTION SKELETON */}
      <AboutSkeleton />

      {/* 3. SKILLS SECTION SKELETON */}
      <SkillsSkeleton />

      {/* 4. EXPERIENCE SECTION SKELETON */}
      <ExperienceSkeleton />

      {/* 5. FEATURED PROJECTS SECTION SKELETON */}
      <FeaturedProjectsSkeleton />

      {/* 6. EDUCATION SECTION SKELETON */}
      <EducationSkeleton />

      {/* 7. CONTACT SECTION SKELETON */}
      <ContactSkeleton />
    </div>
  );
}
