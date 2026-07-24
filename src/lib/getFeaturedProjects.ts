import { Project, projectsData } from "./projectsData";

/**
 * Async data fetching helper to retrieve only featured projects.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const featured = projectsData.filter((p) => p.isFeatured === true);
  return Promise.resolve(featured);
}
