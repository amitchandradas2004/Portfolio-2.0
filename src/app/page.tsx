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
import { getSkillsData } from "@/lib/getSkillsData";
import { getAboutData } from "@/lib/getAboutData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [heroData, aboutData, skillsData, featuredProjects] = await Promise.all([
    getHeroData(),
    getAboutData(),
    getSkillsData(),
    getFeaturedProjects(),
  ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <About aboutData={aboutData} />
      <Skills initialSkills={skillsData} />
      <Experience />
      <FeaturedProjects projects={featuredProjects} />
      <Education />
      <Contact />
      <GithubContribution />
    </main>
  );
}
