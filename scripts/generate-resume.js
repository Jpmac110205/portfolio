import { chromium } from '@playwright/test';
import { createServer } from 'vite';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const server = await createServer({ server: { host: '127.0.0.1', port: 0 } });
let browser;
try {
  await server.listen();
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${server.resolvedUrls.local[0]}resume.html`, { waitUntil: 'networkidle' });
  await page.locator('.resume-paper').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await mkdir(fileURLToPath(new URL('../public/', import.meta.url)), { recursive: true });
  await page.pdf({
    path: fileURLToPath(new URL('../public/James-McAllister-Resume.pdf', import.meta.url)),
    format: 'A4', preferCSSPageSize: true, printBackground: true,
  });
  console.log('Updated public/James-McAllister-Resume.pdf from src/content.js.');
} finally {
  await browser?.close();
  await server.close();
}
