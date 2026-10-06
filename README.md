# James McAllister · Portfolio

A responsive software engineering portfolio with a homepage, filterable project archive, individual project pages, contact page, and printable/downloadable resume. Built with vanilla JavaScript, CSS, and Vite. Fonts are bundled locally; the site does not need a backend, API keys, or third-party services to render.

## Run locally

Use Node.js 22.12+ (or 20.19+).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build     # Outputs the complete static site to dist/
npm run preview   # Preview the production build
```

Deploy the contents of `dist/` to any static host. All five HTML entry points are built, and relative asset URLs support hosting in a subdirectory. No SPA routing fallback is required. The old Discord chat, payment route, and server dependencies have been removed. Original image files and the old PDF are kept in the repository but are not part of the deployed build.

## Update content

Edit **`src/content.js`**. It contains your profile, education, experience, skills, and projects. Homepage cards, the archive, project details, and the resume all use this content.

### Link an existing project

Each project has three optional links:

```js
links: {
  live: 'https://your-app.example.com',
  github: 'https://github.com/your-account/your-repository',
  writeup: 'https://your-writeup.example.com',
},
```

Use an empty string for a link you do not have yet. Only valid HTTP/HTTPS URLs render. Prodigy's supplied live URL is already configured. Repository URLs and other unknown URLs are intentionally left blank.

### Add a project

Append an object to the `projects` array. Give it a unique, stable `id` using lowercase letters, numbers, and hyphens:

```js
{
  id: 'new-project',
  name: 'New Project',
  category: 'Web',              // Automatically adds an archive filter
  discipline: 'Full-stack application',
  visual: 'system',             // prodigy, lifelens, benefit, caesar, or system
  featured: true,               // Include on the homepage
  role: 'Software Engineer',
  dates: 'October 2026 — Present',
  status: 'In progress',        // Or 'Completed'
  description: 'A short description for the project card.',
  overview: 'A longer explanation of the project and your contribution.',
  stack: ['React', 'FastAPI'],
  metrics: [{ value: '100+', label: 'Meaningful, verified result' }], // Or []
  highlights: ['Explain a feature or engineering decision.'],
  links: { live: '', github: '', writeup: '' },
},
```

The project is available at `project.html?project=new-project`. No additional page or layout changes are necessary. Array order determines display order.

To use a real screenshot, add `image: 'projects/new-project.webp'` to the project and place the file in `public/projects/`. Public paths should be relative (no leading slash) for subdirectory hosting. Without an image, a system illustration is used. Diagrams are labeled as system overviews and are not presented as product screenshots.

### Regenerate the downloadable resume

The resume page updates immediately when content changes. The downloadable PDF is a generated snapshot, so regenerate it before deploying updated content:

```sh
npx playwright install chromium  # Only needed once
npm run resume
npm run build
```

This generates `public/James-McAllister-Resume.pdf` from `resume.html` using the print stylesheet. The original older PDF is not linked. You can also use **Print resume** on the resume page.

## Verify

```sh
npx playwright install chromium
npm run build
npm test
```

Browser checks cover desktop and mobile navigation, project filtering, all project pages, invalid project links, clipboard behavior, current PDF delivery, local links, viewport overflow, and accessibility. Project details derive metadata from the content, while each entry page includes title and description metadata. Accessibility includes keyboard focus, a skip link, semantic headings, labeled navigation, filter announcements, and reduced-motion support.
