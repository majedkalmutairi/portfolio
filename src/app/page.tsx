import { ActivitySection } from "@/components/home/activity-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import {
  CurrentlyBuildingSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/home/sections";

export default function Home() {
  return (
    <div className="pb-12">
      <Intro />
      <Hero />
      <CurrentlyBuildingSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
      <ActivitySection />
      <ContactSection />
    </div>
  );
}
