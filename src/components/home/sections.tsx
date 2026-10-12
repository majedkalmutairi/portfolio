import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/home/project-card";
import { Button } from "@/components/ui/button";
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

const HOME_GRID = 2;

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

export function ProjectsSection() {
  if (projects.length === 0) return null;
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);
  const shown = rest.slice(0, HOME_GRID);
  return (
    <Container>
      <Section id="projects" heading="Projects">
        <div className="space-y-6">
          <ProjectCard project={featured} variant="featured" />
          {shown.length ? (
            <ul className="grid gap-6 sm:grid-cols-2">
              {shown.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} variant="grid" />
                </li>
              ))}
            </ul>
          ) : null}
          {rest.length > shown.length ? (
            <div className="flex justify-center pt-4">
              <Button href="/projects">View all projects</Button>
            </div>
          ) : null}
        </div>
      </Section>
    </Container>
  );
}

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
              {site.flags.showCoursework && entry.coursework.length ? (
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
