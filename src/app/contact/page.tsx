import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Developer Portfolio",
  description: "Get in touch with Amit Chandra Das for full-stack web development projects and opportunities.",
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden pt-20 min-h-screen bg-white dark:bg-[#020617]">
      <Contact />
    </main>
  );
}
