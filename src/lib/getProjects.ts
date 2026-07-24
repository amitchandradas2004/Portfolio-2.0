import { Project, projectsData } from "./projectsData";

/**
 * Async data fetching helper to retrieve all projects.
 * Easily replaceable with database calls or headless CMS API requests.
 */
export async function getProjects(): Promise<Project[]> {
  // Simulate async I/O or API boundary
  return Promise.resolve(projectsData);
}
