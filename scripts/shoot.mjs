// Screenshots pages of the running dev server at three widths, in both themes.
//
//   npm run shoot                       → /lab at 1440, 834, 390, dark + light
//   npm run shoot -- /lab/font/inter    → any list of paths
//   OUT=assets/build/phase-03 npm run shoot
//
// Uses the Edge channel: the bundled Chromium is blocked on this machine.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "assets/build";
const WIDTHS = [1440, 834, 390];
const THEMES = ["dark", "light"];
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/lab"];

const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const theme of THEMES) {
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  // Set the saved theme before any page script runs, so ThemeScript picks it up.
  await context.addInitScript((t) => localStorage.setItem("theme", t), theme);

  for (const width of WIDTHS) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    for (const p of paths) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      // Hide Next's dev-mode badge so it never lands in a screenshot.
      await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
      // Scroll through once so every Reveal has fired, then back to the top.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
      const slug = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-");
      const file = path.join(OUT, `${slug}-${width}-${theme}.png`);
      await mkdir(path.dirname(file), { recursive: true });
      await page.screenshot({ path: file, fullPage: true });
      console.log("wrote", file);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
