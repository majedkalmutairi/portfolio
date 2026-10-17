import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "private/screenshots";
const WIDTHS = [1440, 834, 390];
const THEMES = ["dark", "light"];
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/lab"];
const loaded = () => document.fonts.status === "loaded" && [...document.images].every((img) => img.complete);

const browser = await chromium.launch({ channel: "msedge", headless: true });

for (const theme of THEMES) {
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  await context.addInitScript((t) => {
    localStorage.setItem("theme", t);
    sessionStorage.setItem("intro", "1");
  }, theme);

  for (const width of WIDTHS) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    for (const p of paths) {
      await page.goto(BASE + p, { waitUntil: "load" });
      await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page.waitForFunction(loaded, null, { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(4000);
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
