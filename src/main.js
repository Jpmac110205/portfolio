import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/dm-mono/latin-400.css';
import './styles.css';
import { profile, projects, experience, education, skills } from './content.js';
import { visuals } from './visuals.js';

const page = document.body.dataset.page;
const escape = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
const external = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5"/></svg>';
const download = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" stroke="currentColor" stroke-width="1.5"/></svg>';
const externalLink = (href, label, className = 'text-link') => `<a class="${className}" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)}${external}<span class="sr-only"> (opens in a new tab)</span></a>`;
// External project links must be real HTTP(S) URLs. Empty or unsafe values never become links.
const isWebUrl = value => { try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; } };
const projectHref = project => `./project.html?project=${encodeURIComponent(project.id)}`;
const tags = items => `<ul class="tags" aria-label="Technologies">${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const projectLinks = project => Object.entries({ live: 'Live demo', github: 'Source code', writeup: 'Read write-up' }).filter(([key]) => isWebUrl(project.links?.[key])).map(([key, label]) => externalLink(project.links[key], label)).join('');
const metrics = items => `<dl class="metrics">${items.map(item => `<div><dt>${escape(item.label)}</dt><dd>${escape(item.value)}</dd></div>`).join('')}</dl>`;

function header() {
  const home = page === 'index';
  const active = (name) => page === name || (name === 'projects' && page === 'project');
  return `<header class="site-header"><div class="container header-inner">
    <a class="brand" href="./index.html" aria-label="James McAllister, home"><span class="monogram" aria-hidden="true">jm<span>.</span></span><span class="brand-name">James McAllister</span></a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false"><span></span><span></span></button>
    <nav id="navigation" aria-label="Main navigation">
      <a href="${home ? '#work' : './projects.html'}" ${active('projects') ? 'aria-current="page"' : ''}>Work</a>
      <a href="${home ? '#experience' : './index.html#experience'}">Experience</a>
      <a href="${home ? '#about' : './index.html#about'}">About</a>
      <a href="./contact.html" ${active('contact') ? 'aria-current="page"' : ''}>Contact</a>
      <a class="nav-resume" href="./resume.html" ${active('resume') ? 'aria-current="page"' : ''}>Resume ${external}</a>
    </nav>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer container"><span>© ${new Date().getFullYear()} James McAllister</span><span class="footer-note">Software engineering · Class of 2028</span><a href="#top">Back to top ↑</a></footer>`;
}

function contactBand() {
  return `<section class="contact-band" aria-labelledby="contact-heading"><div class="container contact-inner"><div><p class="eyebrow">LET’S CONNECT</p><h2 id="contact-heading">Have something in mind?</h2><p>I’d love to hear about your team, an interesting problem, or a project.</p></div><a href="mailto:${profile.email}" class="button light-button">Get in touch ${external}</a></div></section>`;
}

function visual(project, full = false) {
  const image = project.image;
  return `<div class="project-visual visual-${escape(project.visual || 'system')} ${full ? 'full-visual' : ''}">
    <div class="visual-caption"><span>${escape(project.discipline)}</span><span>${project.status === 'In progress' ? '<i class="status-dot"></i> In progress' : 'System overview'}</span></div>
    ${image ? `<img src="${escape(image)}" alt="${escape(project.name)} project screenshot" loading="lazy" width="640" height="340">` : visuals[project.visual] || visuals.system}
    <div class="visual-wordmark">${escape(project.name)}<span>${escape(project.id === 'caesaros' ? 'CONNECTED INTELLIGENCE' : project.id === 'benefit' ? 'BUILD BETTER HABITS' : project.id === 'lifelens' ? 'VISION. EXPLAINED.' : project.id === 'prodigy' ? 'KNOWLEDGE INTO ACTION' : project.category)}</span></div>
  </div>`;
}

function projectCard(project, index) {
  return `<article class="project-card">
    <a class="visual-link" href="${projectHref(project)}" aria-label="Explore ${escape(project.name)}">${visual(project)}</a>
    <div class="project-heading"><div><p class="project-index">${String(index + 1).padStart(2, '0')} / ${escape(project.category)}</p><h3><a href="${projectHref(project)}">${escape(project.name)}</a></h3></div><a class="circle-link" href="${projectHref(project)}" aria-label="View ${escape(project.name)} details">${external}</a></div>
    <p class="project-description">${escape(project.description)}</p>
    ${tags(project.stack)}
    <div class="project-links"><a class="text-link" href="${projectHref(project)}">Explore project ${arrow}</a>${projectLinks(project)}</div>
  </article>`;
}

function experienceSection() {
  return `<section class="section experience-section container" id="experience" aria-labelledby="experience-heading"><div class="section-heading"><div><p class="eyebrow">02 / EXPERIENCE</p><h2 id="experience-heading">Engineering in practice.</h2></div><p>Real systems. Measurable results.</p></div>
    ${experience.map(job => `<article class="experience-entry"><div class="experience-title"><p class="eyebrow">${escape(job.dates)}</p><h3>${escape(job.company)}</h3><p>${escape(job.role)}</p></div><div class="experience-body"><h4>${escape(job.summary)}</h4>${metrics(job.metrics)}<ul class="experience-points">${job.highlights.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div></article>`).join('')}
  </section>`;
}

function aboutSection() {
  return `<section class="section about-section container" id="about" aria-labelledby="about-heading"><div class="section-heading"><div><p class="eyebrow">03 / A LITTLE ABOUT ME</p><h2 id="about-heading">Curiosity, put to work.</h2></div></div><div class="about-grid"><div class="about-copy"><p class="large-copy">I’m James, a software engineering student who likes turning complex problems into software people can use.</p><p>My work spans AI systems, full-stack applications, and mobile development. I’m especially interested in the engineering around the model: retrieval, evaluation, APIs, and the systems that make it useful.</p><p>From enterprise knowledge pipelines at NJM to independent projects, I learn by building, testing, and improving.</p><div class="social-links">${externalLink(profile.github, 'GitHub')}${externalLink(profile.linkedin, 'LinkedIn')}</div></div><div class="education"><p class="eyebrow">EDUCATION / EXPECTED ${escape(education.graduation.toUpperCase())}</p><h3>${escape(education.degree)}</h3><p>${escape(education.school)}</p><p class="education-detail">${escape(education.college)} · ${escape(education.accreditation)}</p><div class="education-minors"><span class="eyebrow">MINORS</span><ul>${education.minors.map(minor => `<li>${escape(minor)}</li>`).join('')}</ul></div></div></div></section>`;
}

function skillsSection() {
  return `<section class="section skills-section container" id="skills" aria-labelledby="skills-heading"><div class="section-heading"><div><p class="eyebrow">04 / TOOLKIT</p><h2 id="skills-heading">What I work with.</h2></div><p>A foundation across the stack.</p></div><div class="skills-grid">${skills.map((group, index) => `<article class="skill-group"><span class="skill-number">0${index + 1}</span><h3>${escape(group.name)}</h3><p>${escape(group.description)}</p>${tags(group.items)}</article>`).join('')}</div></section>`;
}

function homePage() {
  const current = projects.find(project => project.status === 'In progress');
  return `<main id="main"><section class="hero container" aria-labelledby="hero-heading"><div class="hero-main"><p class="eyebrow"><span class="small-line"></span> SOFTWARE ENGINEER & AI BUILDER</p><h1 id="hero-heading">From an idea<br>to a <span>working system.</span></h1><p class="hero-description">I’m James McAllister. I build AI systems, full-stack applications, and the infrastructure that brings them together.</p><div class="hero-actions"><a class="button" href="#work">Explore my work ${arrow}</a><a class="text-link" href="./resume.html">View resume ${external}</a></div></div><aside class="hero-aside" aria-label="Current focus"><span class="index-label">PORTFOLIO — 2026</span><div class="focus-card"><p class="eyebrow"><i class="status-dot"></i> CURRENTLY BUILDING</p>${current ? `<a href="${projectHref(current)}" class="focus-title">${escape(current.name)} ${external}</a><p>${escape(current.discipline)} with shared workflow state.</p>` : '<p>Exploring what comes next.</p>'}<div class="focus-footer"><span>AI / SYSTEMS / FULL STACK</span></div></div><p class="hero-location">Shippensburg University<br><span>B.S. Software Engineering · 2028</span></p></aside></section>
    <div class="intro-strip container"><span>Built across disciplines.</span><span>AI & machine learning</span><span>Full-stack development</span><span>Cloud & automation</span></div>
    <section class="section work-section container" id="work" aria-labelledby="work-heading"><div class="section-heading"><div><p class="eyebrow">01 / SELECTED WORK</p><h2 id="work-heading">A few things I’ve built.</h2></div><a href="./projects.html" class="text-link">All projects ${arrow}</a></div><div class="project-grid">${projects.filter(project => project.featured).map(projectCard).join('')}</div></section>
    ${experienceSection()}${aboutSection()}${skillsSection()}${contactBand()}</main>`;
}

function projectsPage() {
  const categories = [...new Set(projects.map(project => project.category))];
  return `<main id="main" class="archive-main"><section class="container page-intro"><p class="eyebrow">THE PROJECT ARCHIVE</p><div class="page-title-row"><h1>Ideas into<br><span>working software.</span></h1><p>Independent builds, practical experiments, and ongoing work. A closer look at what I’m making.</p></div></section><section class="container archive-section" aria-label="Projects"><div class="filter-bar"><div class="filters" role="group" aria-label="Filter projects">${['All', ...categories].map((category, index) => `<button type="button" data-filter="${escape(category)}" aria-pressed="${index === 0}">${escape(category)}</button>`).join('')}</div><p class="project-count" role="status" aria-live="polite">${projects.length} projects</p></div><div class="project-grid" id="project-grid">${projects.map(projectCard).join('')}</div></section>${contactBand()}</main>`;
}

function projectPage() {
  const id = new URLSearchParams(location.search).get('project');
  const project = projects.find(item => item.id === id);
  if (!project) {
    document.title = 'Project not found — James McAllister';
    return '<main id="main" class="container not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>Let’s find the right project.</h1><p>This project link may have changed. You can find all of my work in the archive.</p><a class="button" href="./projects.html">Browse projects ' + arrow + '</a></main>';
  }
  document.title = `${project.name} — James McAllister`;
  document.querySelector('meta[name="description"]').content = project.description;
  document.querySelector('meta[property="og:title"]').content = document.title;
  document.querySelector('meta[property="og:description"]').content = project.description;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return `<main id="main"><section class="container detail-intro"><a class="text-link back-link" href="./projects.html">← All projects</a><p class="eyebrow">${escape(project.discipline)}</p><h1>${escape(project.name)}<span class="project-status ${project.status === 'In progress' ? 'in-progress' : ''}">${escape(project.status)}</span></h1><p class="detail-description">${escape(project.description)}</p><div class="detail-meta"><div><span class="eyebrow">MY ROLE</span><p>${escape(project.role)}</p></div><div><span class="eyebrow">TIMELINE</span><p>${escape(project.dates)}</p></div><div class="detail-links">${projectLinks(project)}</div></div>${visual(project, true)}</section><section class="container detail-content" aria-labelledby="overview-heading"><aside><p class="eyebrow">THE STACK</p>${tags(project.stack)}</aside><div><p class="eyebrow">OVERVIEW</p><h2 id="overview-heading">${project.status === 'In progress' ? 'What I’m building.' : 'What I built.'}</h2><p class="overview-copy">${escape(project.overview)}</p>${project.metrics.length ? metrics(project.metrics) : ''}<h3 class="highlights-heading">Engineering highlights</h3><ol class="detail-highlights">${project.highlights.map(item => `<li>${escape(item)}</li>`).join('')}</ol></div></section><div class="container next-project"><span class="eyebrow">NEXT PROJECT</span><a href="${projectHref(next)}">${escape(next.name)} ${arrow}</a></div>${contactBand()}</main>`;
}

function contactPage() {
  return `<main id="main"><section class="container contact-page"><div class="contact-page-copy"><p class="eyebrow">CONTACT</p><h1>Good work starts<br><span>with a conversation.</span></h1><p>I’m interested in software engineering opportunities, AI systems, and working with people who enjoy building useful things.</p><a class="button" href="mailto:${profile.email}">Send an email ${external}</a></div><div class="contact-options"><div class="contact-option"><p class="eyebrow">EMAIL</p><a href="mailto:${profile.email}">${profile.email} ${external}</a><button class="copy-email" type="button">Copy email address</button><span class="copy-status sr-only" role="status" aria-live="polite"></span></div><div class="contact-option"><p class="eyebrow">ELSEWHERE</p>${externalLink(profile.github, 'GitHub')}${externalLink(profile.linkedin, 'LinkedIn')}</div><div class="contact-option"><p class="eyebrow">PHONE</p><a href="tel:${profile.phoneHref}">${profile.phone} ${external}</a></div><div class="contact-option"><p class="eyebrow">THE FULL PICTURE</p><a class="text-link" href="./resume.html">View my resume ${arrow}</a><a class="text-link" href="./James-McAllister-Resume.pdf" download>Download PDF ${download}</a></div></div></section></main>`;
}

function resumePage() {
  return `<main id="main" class="resume-main container"><div class="resume-toolbar"><a class="text-link" href="./index.html">← Back to portfolio</a><div><button class="text-link print-resume" type="button">Print resume ${download}</button><a class="button" href="./James-McAllister-Resume.pdf" download>Download PDF ${download}</a></div></div><article class="resume-paper"><header class="resume-header"><h1>${profile.name}</h1><p><a href="${profile.github}">github.com/Jpmac110205</a> · <a href="${profile.linkedin}">linkedin.com/in/jpmac1102</a> · <a href="mailto:${profile.email}">${profile.email}</a> · ${profile.phone}</p></header><section><h2>Technical summary</h2><p>${escape(profile.summary)}</p></section><section><h2>Education</h2><div class="resume-row"><h3>Bachelor of Science in Software Engineering <span>(ABET Accredited)</span></h3><span>May 2028</span></div><p>${escape(education.school)}; ${escape(education.college)}</p><p><strong>Minors:</strong> ${education.minors.map(escape).join(', ')}</p></section><section><h2>Work experience</h2>${experience.map(job => `<div class="resume-row"><h3>${escape(job.role)} <span>| ${escape(job.company)}</span></h3><span>${escape(job.dates)}</span></div><ul>${job.highlights.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`).join('')}</section><section><h2>Projects</h2>${projects.map(project => `<div class="resume-project"><div class="resume-row"><h3>${escape(project.name)} ${project.status === 'In progress' ? '<span>(In Progress)</span>' : ''}<span> | ${escape(project.role)}</span></h3><span>${escape(project.dates)}</span></div><ul>${project.highlights.map((item, index) => `<li>${escape(item)}${index === 0 && isWebUrl(project.links.live) ? ` <a href="${escape(project.links.live)}">${escape(project.links.live)}</a>` : ''}</li>`).join('')}</ul></div>`).join('')}</section><section><h2>Technical skills</h2>${skills.map(group => `<p><strong>${escape(group.name)}:</strong> ${group.items.map(escape).join(', ')}</p>`).join('')}</section></article></main>`;
}

const renderers = { index: homePage, projects: projectsPage, project: projectPage, contact: contactPage, resume: resumePage };
document.getElementById('app').innerHTML = `<div id="top"></div>${header()}${(renderers[page] || homePage)()}${footer()}`;

const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if (page === 'projects') {
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    const filtered = category === 'All' ? projects : projects.filter(project => project.category === category);
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('project-grid').innerHTML = filtered.map(project => projectCard(project, projects.indexOf(project))).join('');
    document.querySelector('.project-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`;
  }));
}

document.querySelector('.print-resume')?.addEventListener('click', () => window.print());
document.querySelector('.copy-email')?.addEventListener('click', async event => {
  const button = event.currentTarget;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(profile.email);
    button.textContent = 'Email copied';
    status.textContent = 'Email address copied to clipboard.';
  } catch {
    button.textContent = 'Select the email address to copy';
    status.textContent = 'Clipboard unavailable. You can select and copy the email address above.';
  }
});

// Active section navigation enhances the homepage without hiding content or blocking scroll.
if (page === 'index' && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = nav.querySelector(`a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        nav.querySelectorAll('a[aria-current="location"]').forEach(item => item.removeAttribute('aria-current'));
        link?.setAttribute('aria-current', 'location');
      } else if (link?.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('#work, #experience, #about').forEach(section => observer.observe(section));
}
