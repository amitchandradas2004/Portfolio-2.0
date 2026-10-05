import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/getProjectBySlug";
import { getProjects } from "@/lib/getProjects";
import { Metadata } from "next";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - ${project.subtitle} | Portfolio Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}

