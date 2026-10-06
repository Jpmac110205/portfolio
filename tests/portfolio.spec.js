import { test, expect } from '@playwright/test';
import { projects, profile } from '../src/content.js';

test('homepage presents the resume and links to every featured project', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('working system');
  await expect(page.getByRole('heading', { name: 'NJM Insurance Group' })).toBeVisible();
  await expect(page.getByText('96%', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What I work with.' })).toBeVisible();
  for (const project of projects.filter(item => item.featured)) {
    await expect(page.getByRole('link', { name: `View ${project.name} details`, exact: true })).toHaveAttribute('href', `./project.html?project=${project.id}`);
  }
  expect(errors).toEqual([]);
});

test('project filters narrow the archive and can be reset', async ({ page }) => {
  await page.goto('/projects.html');
  await expect(page.locator('.project-card')).toHaveCount(projects.length);
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'BeneFit', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('1 project');
  await expect(page.getByRole('button', { name: 'Mobile', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(projects.length);
});

for (const project of projects) {
  test(`${project.name} has a complete project page with only configured external links`, async ({ page }) => {
    await page.goto(`/project.html?project=${project.id}`);
    await expect(page).toHaveTitle(`${project.name} — James McAllister`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(project.name);
    await expect(page.locator('.detail-highlights li')).toHaveCount(project.highlights.length);
    const links = Object.values(project.links).filter(Boolean);
    await expect(page.locator('.detail-links a')).toHaveCount(links.length);
    for (const url of links) await expect(page.locator(`.detail-links a[href="${url}"]`)).toHaveAttribute('rel', 'noopener noreferrer');
    await page.getByRole('link', { name: '← All projects' }).click();
    await expect(page).toHaveURL(/projects\.html$/);
  });
}

test('unknown project is recoverable without rendering query text', async ({ page }) => {
  await page.goto('/project.html?project=%3Cscript%3Ealert(1)%3C/script%3E');
  await expect(page.getByRole('heading', { name: 'Let’s find the right project.' })).toBeVisible();
  await page.getByRole('link', { name: 'Browse projects' }).click();
  await expect(page).toHaveURL(/projects\.html$/);
});

test('navigation works at the current screen size', async ({ page }, testInfo) => {
  await page.goto('/');
  const nav = page.getByRole('navigation');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Open navigation' });
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(nav).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/contact\.html$/);
  await expect(page.getByRole('link', { name: 'Send an email' })).toHaveAttribute('href', `mailto:${profile.email}`);
});

test('contact can copy an email and offers a real current resume PDF', async ({ page, context, request }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/contact.html');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('button', { name: 'Email copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email);
  const response = await request.get('/James-McAllister-Resume.pdf');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  await page.goto('/resume.html');
  await expect(page.getByRole('heading', { name: profile.name, exact: true })).toBeVisible();
  await expect(page.locator('.resume-paper')).toContainText('June — August 2026');
  await expect(page.locator('.resume-paper')).toContainText('CaesarOS');
});

test('all pages fit the viewport and have working local links', async ({ page, request }) => {
  const paths = ['/', '/projects.html', '/contact.html', '/resume.html', ...projects.map(project => `/project.html?project=${project.id}`)];
  const localLinks = new Set();
  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow at ${path}`).toBeTruthy();
    const links = await page.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href')));
    for (const link of links) {
      if (link.startsWith('#')) {
        expect(await page.locator(link).count(), `missing anchor ${link} at ${path}`).toBeGreaterThan(0);
      } else if (link.startsWith('./')) localLinks.add(link);
    }
  }
  for (const link of localLinks) expect((await request.get(link)).ok(), `broken link ${link}`).toBeTruthy();
});

test('key pages pass automated accessibility checks', async ({ page }) => {
  const { default: AxeBuilder } = await import('@axe-core/playwright');
  for (const path of ['/', '/projects.html', '/contact.html', '/resume.html', '/project.html?project=prodigy', '/project.html?project=lifelens', '/project.html?project=benefit', '/project.html?project=caesaros']) {
    await page.goto(path);
    await page.locator('main').waitFor();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, `accessibility at ${path}`).toEqual([]);
  }
});
