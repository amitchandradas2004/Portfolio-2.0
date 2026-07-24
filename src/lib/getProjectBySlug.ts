import { Project, projectsData } from "./projectsData";

/**
 * Async data fetching helper to retrieve a project by its unique slug.
 * Returns null if no project matches the given slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = projectsData.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  return Promise.resolve(project || null);
}
