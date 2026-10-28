import React from "react";
import ContactSkeleton from "@/components/skeletons/ContactSkeleton";

export default function ContactLoading() {
  return (
    <main className="relative overflow-hidden pt-10 min-h-screen bg-white dark:bg-[#020617]">
      <ContactSkeleton />
    </main>
  );
}
