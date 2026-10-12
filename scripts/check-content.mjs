import { existsSync } from "node:fs";
import path from "node:path";

import { site } from "../src/content/site.ts";
import { projects } from "../src/content/projects.ts";
import { skillGroups } from "../src/content/skills.ts";
import { education } from "../src/content/education.ts";
import { experience } from "../src/content/experience.ts";
import { posts } from "../src/content/blog.ts";
import { currentlyBuilding } from "../src/content/currently-building.ts";

const content = { site, projects, skillGroups, education, experience, posts, currentlyBuilding };

const OPTIONAL = {
  projects: ["hook", "summary", "role", "image", "caseStudy"],
  education: ["start"],
};

const PLACEHOLDER = /\b(todo|tbd|fixme|lorem|ipsum|placeholder|xxx+)\b/i;
const errors = [];
const pending = [];

function walk(value, where) {
  if (value === undefined) {
    pending.push(where);
  } else if (typeof value === "string") {
    if (value.trim() === "") errors.push(`${where} is an empty string`);
    else if (PLACEHOLDER.test(value)) errors.push(`${where} contains placeholder text: "${value}"`);
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${where}[${i}]`));
  } else if (value && typeof value === "object") {
    if (typeof value.src === "string" && "alt" in value) {
      const file = path.join("public", value.src);
      if (!existsSync(file)) errors.push(`${where}.src points at a missing file: ${file}`);
    }
    for (const [key, child] of Object.entries(value)) walk(child, `${where}.${key}`);
  }
}

for (const [name, value] of Object.entries(content)) walk(value, name);

for (const [list, keys] of Object.entries(OPTIONAL)) {
  content[list].forEach((entry, i) => {
    const label = entry.slug ?? entry.school ?? i;
    for (const key of keys) if (!(key in entry)) pending.push(`${list}[${label}].${key}`);
  });
}

const slugs = projects.map((p) => p.slug);
for (const slug of slugs) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    errors.push(`project slug "${slug}" must be lowercase words joined by hyphens`);
  if (slugs.indexOf(slug) !== slugs.lastIndexOf(slug)) errors.push(`project slug "${slug}" is used twice`);
}
if (projects.filter((p) => p.featured).length > 1) errors.push("more than one project has featured: true");

if (pending.length) {
  console.log(`Not written yet (${pending.length}) — the site shows nothing there:`);
  for (const p of [...new Set(pending)]) console.log(`  · ${p}`);
}
if (errors.length) {
  console.error(`\nContent check FAILED (${errors.length}):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\nContent check passed.");
