import { AboutSection } from "@/components/home/about-section";
import { ActivitySection } from "@/components/home/activity-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import {
  CurrentlyBuildingSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  WorkSection,
} from "@/components/home/sections";

// The homepage, top to bottom. Every section reads its own content file; sections that are
// switched off (site.flags) or empty render nothing. To reorder the page, reorder these lines.
export default function Home() {
  return (
    <div className="pb-12">
      <Hero />
      <CurrentlyBuildingSection />
      <WorkSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
      <AboutSection />
      <ActivitySection />
      <ContactSection />
    </div>
  );
}
