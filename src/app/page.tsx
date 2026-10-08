import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import FeaturedProjects from "@/components/FeaturedProjects";
import GithubContribution from "@/components/GithubContribution";
import Contact from "@/components/Contact";
import { getFeaturedProjects } from "@/lib/getFeaturedProjects";
import { getHeroData } from "@/lib/getHeroData";

export default async function Home() {
  const [heroData, featuredProjects] = await Promise.all([
    getHeroData(),
    getFeaturedProjects(),
  ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects projects={featuredProjects} />
      <Education />
      <Contact />
      <GithubContribution />
    </main>
  );
}
