import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import { getFeaturedProjects } from "@/lib/getFeaturedProjects";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects projects={featuredProjects} />
    </main>
  );
}
