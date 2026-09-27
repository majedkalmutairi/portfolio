// Makes src/app/apple-icon.png (180px) from src/app/icon.svg, so the two never drift apart.
//
//   npm run icons
//
// Apple rounds the corners itself and dislikes transparency, so the square is drawn full-bleed.
// Uses the Edge channel: the bundled Chromium is blocked on this machine.
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const svg = (await readFile("src/app/icon.svg", "utf8")).replace(/ rx="[^"]*"/, "");

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
await page.setContent(
  `<style>html,body{margin:0}svg{display:block;width:180px;height:180px}</style>${svg}`,
);
await page.screenshot({ path: "src/app/apple-icon.png" });
await browser.close();
console.log("wrote src/app/apple-icon.png");
