import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/home/project-card";
import { DashedCard } from "@/components/ui/dashed-card";
import { MicroLabel } from "@/components/ui/micro-label";
import { Pill } from "@/components/ui/pill";
import { TechPill } from "@/components/ui/tech-pill";
import { TimelineDetail, TimelineRow, TimelineSubtitle, TimelineTitle } from "@/components/ui/timeline-row";
import { currentlyBuilding } from "@/content/currently-building";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

// The homepage's plain sections. Each one reads its content file and renders nothing at all when
// it is switched off or empty — so a hidden section is absent from the page, not just invisible.

/** Something in progress that isn't a project yet. Off at launch. */
export function CurrentlyBuildingSection() {
  if (!site.flags.showCurrentlyBuilding || currentlyBuilding.length === 0) return null;
  return (
    <Container>
      <Section id="now" heading="Currently building">
        <ul className="space-y-4">
          {currentlyBuilding.map((item) => (
            <li key={item.name}>
              <DashedCard className="p-5">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.name} ↗
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="mt-1 text-body text-fg-secondary">{item.note}</p>
              </DashedCard>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

/** Every project, one full-width card each, in the order of projects.ts. Never a grid. */
export function WorkSection() {
  if (projects.length === 0) return null;
  return (
    <Container>
      <Section id="work" heading="Work">
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}

/** The skills, group name on the left, chips on the right. Empty groups are left out. */
export function SkillsSection() {
  const groups = skillGroups.filter((group) => group.skills.length > 0);
  if (groups.length === 0) return null;
  return (
    <Container>
      <Section id="skills" heading="Skills">
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.heading} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="sm:pt-1.5">
                <MicroLabel>{group.heading}</MicroLabel>
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <TechPill id={skill.tech} label={skill.name} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}

/** The degree, with the GPA on its own line and the coursework as small chips. */
export function EducationSection() {
  if (education.length === 0) return null;
  return (
    <Container>
      <Section id="education" heading="Education">
        <div className="space-y-12">
          {education.map((entry) => (
            <TimelineRow key={entry.school} date={entry.start ? `${entry.start} – ${entry.end}` : entry.end}>
              <TimelineTitle>{entry.degree}</TimelineTitle>
              <TimelineSubtitle>{entry.school}</TimelineSubtitle>
              {entry.location ? <TimelineDetail>{entry.location}</TimelineDetail> : null}
              <p className="mt-4 text-lg font-semibold tracking-tight text-fg">
                GPA {site.gpa.value} / {site.gpa.scale}
              </p>
              {entry.coursework.length ? (
                <div className="mt-6">
                  <MicroLabel>Relevant coursework</MicroLabel>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {entry.coursework.map((course) => (
                      <li key={course}>
                        <Pill label={course} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </TimelineRow>
          ))}
        </div>
      </Section>
    </Container>
  );
}

/** Work history, as a typographic timeline. Off at launch. */
export function ExperienceSection() {
  if (!site.flags.showExperience || experience.length === 0) return null;
  return (
    <Container>
      <Section id="experience" heading="Experience">
        <div className="space-y-12">
          {experience.map((entry) => (
            <TimelineRow key={`${entry.role}-${entry.organisation}`} date={entry.dates}>
              <TimelineTitle>{entry.role}</TimelineTitle>
              <TimelineSubtitle>{entry.organisation}</TimelineSubtitle>
              {entry.location ? <TimelineDetail>{entry.location}</TimelineDetail> : null}
              {entry.points.length ? (
                <ul className="mt-3 space-y-1.5 text-body text-fg-secondary">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </TimelineRow>
          ))}
        </div>
      </Section>
    </Container>
  );
}
