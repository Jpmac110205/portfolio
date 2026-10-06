// Your portfolio's source of truth. Add projects here; every view updates automatically.
// Keep unknown links as an empty string. They are hidden until you add a real URL.
export const profile = {
  name: 'James McAllister',
  email: 'jpmac1102@outlook.com',
  phone: '(267) 768-8243',
  phoneHref: '+12677688243',
  github: 'https://github.com/Jpmac110205',
  linkedin: 'https://www.linkedin.com/in/jpmac1102/',
  summary: 'Software Engineering student experienced in software development, AI/ML, distributed systems, and API design, with hands-on experience building production AI systems, automation pipelines, and cloud-based applications. Proficient in Python, Java, JavaScript/TypeScript, and SQL, with experience across RAG, REST APIs, authentication, CI/CD, and full-stack development.',
};

export const education = {
  degree: 'B.S. in Software Engineering',
  school: 'Shippensburg University of Pennsylvania',
  college: 'Wood Honors College',
  graduation: 'May 2028',
  accreditation: 'ABET accredited',
  minors: ['Computer Science', 'Mathematics', 'Data Science'],
};

export const experience = [{
  role: 'IT Innovation Intern',
  company: 'NJM Insurance Group',
  dates: 'June — August 2026',
  summary: 'Bringing AI from proof of concept to enterprise workflows.',
  highlights: [
    'Designed and implemented an advanced RAG pipeline utilizing recursive chunking, query rewriting, and reranking to achieve 96% retrieval accuracy across an enterprise knowledge base.',
    'Engineered an automated evaluation and testing framework measuring system accuracy, error rate, latency, and throughput across a production pipeline, achieving 90% end-to-end accuracy at 370ms average latency.',
    'Engineered an automated document synchronization system processing 760+ enterprise documents via REST APIs, webhooks, and GitHub Actions, implementing incremental/full-sync modes and deduplication logic to eliminate redundant uploads at scale.',
    'Collaborated with solution architects to assess AI proofs of concept, presenting technical feasibility and business adoption strategies for enterprise deployment.',
  ],
  metrics: [
    { value: '96%', label: 'Retrieval accuracy' },
    { value: '370ms', label: 'Average pipeline latency' },
    { value: '760+', label: 'Documents synchronized' },
  ],
}];

export const skills = [
  { name: 'Languages', description: 'The foundations.', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'C', 'SQL', 'NoSQL'] },
  { name: 'Frameworks & libraries', description: 'From interface to infrastructure.', items: ['React', 'Flutter', 'FastAPI', 'PyTorch', 'NumPy', 'ChromaDB', 'LangChain', 'LangGraph'] },
  { name: 'Cloud & development', description: 'Built to connect and ship.', items: ['Git', 'GitHub', 'GitHub Actions', 'Firebase', 'REST APIs', 'OpenAI API', 'Google Cloud'] },
  { name: 'AI & machine learning', description: 'Models with a practical purpose.', items: ['Retrieval-Augmented Generation', 'LLMs', 'AI Agents', 'Vector Databases', 'Deep Learning', 'CNNs', 'Transfer Learning'] },
];

// Optional: image: 'projects/my-project.webp' (put the image in public/projects/).
// The visual field selects a diagram: prodigy, lifelens, benefit, caesar, or system.
// featured: true includes the project on the homepage. All projects appear in the archive.
export const projects = [
  {
    id: 'prodigy', name: 'Prodigy', category: 'AI & systems',
    discipline: 'Full-stack AI application', visual: 'prodigy', featured: true,
    role: 'Solo AI Engineer', dates: 'December 2025 — April 2026', status: 'Completed',
    description: 'An AI assistant that connects personal knowledge with everyday productivity.',
    overview: 'Prodigy brings document Q&A, conversational memory, and Google Calendar and Tasks into one full-stack application. I designed and deployed the system end to end, from the React interface to the FastAPI backend and PostgreSQL database.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'OAuth2', 'Google APIs'],
    metrics: [{ value: '20+', label: 'REST API endpoints' }, { value: '3 layers', label: 'Memory architecture' }],
    highlights: [
      'Designed and deployed a full-stack AI application using React, FastAPI, and PostgreSQL, integrating Google Calendar/Tasks APIs for real-time productivity workflows.',
      'Built a RAG pipeline with document parsing, variable chunking, embedding generation, and semantic retrieval for Q&A.',
      'Engineered OAuth2 authentication and authorization with automatic token refresh and session management across 20+ REST API endpoints.',
      'Implemented a multi-layer memory architecture managing session state, persistent knowledge base, and conversational context.',
    ],
    links: { live: 'https://prodigyaiassistant.onrender.com/', github: '', writeup: '' },
  },
  {
    id: 'lifelens', name: 'LifeLens', category: 'AI & systems',
    discipline: 'Computer vision & deep learning', visual: 'lifelens', featured: true,
    role: 'Lead Designer and Engineer', dates: 'August — December 2025', status: 'Completed',
    description: 'Computer vision with explainable predictions and a multimodal backend.',
    overview: 'LifeLens pairs deep learning image classification with structured medical data and model explainability. I led the design and engineering of the system, building a PyTorch model pipeline and a FastAPI backend to serve predictions and explainable risk assessments.',
    stack: ['PyTorch', 'FastAPI', 'Python', 'ResNet', 'Grad-CAM'],
    metrics: [{ value: '90%', label: 'Validation accuracy' }, { value: '20,000+', label: 'Images in the dataset' }],
    highlights: [
      'Developed a full-stack deep learning computer vision system using PyTorch, CNNs, and transfer learning with ResNet, achieving 90% validation accuracy across 20,000+ images and implementing Grad-CAM model explainability.',
      'Architected a RESTful FastAPI backend to serve ML models and process multimodal data, integrating structured medical data with image classification results and explainable risk assessments.',
    ],
    links: { live: '', github: '', writeup: '' },
  },
  {
    id: 'benefit', name: 'BeneFit', category: 'Mobile',
    discipline: 'Cross-platform fitness application', visual: 'benefit', featured: true,
    role: 'Founder and Lead Software Engineer', dates: 'June — September 2025', status: 'Completed',
    description: 'Nutrition, movement, and a little friendly competition. Built for iOS and Android.',
    overview: 'BeneFit is a cross-platform fitness application built with Flutter and Firebase. It combines nutrition and calorie tracking with a gamification engine, achievements, step tracking, and social features. Feedback from a beta group of more than 10 people helped shape the experience.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'USDA FoodData API'],
    metrics: [{ value: '300,000+', label: 'Searchable food items' }, { value: '13+', label: 'Fitness challenges' }],
    highlights: [
      'Engineered a full-stack cross-platform mobile application using the Flutter framework for iOS and Android.',
      'Designed and implemented a scalable NoSQL database architecture using Firebase Firestore with real-time synchronization and Firebase Authentication for secure user management.',
      'Integrated USDA FoodData API enabling real-time search across 300,000+ food items with macro and calorie tracking.',
      'Developed a gamification engine with XP-based leveling, 13+ challenges, an achievement system, step tracking features, and social features (friend streaks, rankings), utilizing feedback from a more than 10-person beta testing group to drive engagement.',
    ],
    links: { live: '', github: '', writeup: '' },
  },
  {
    id: 'caesaros', name: 'CaesarOS', category: 'AI & systems',
    discipline: 'Multi-agent orchestration', visual: 'caesar', featured: true,
    role: 'AI Architect & Engineer', dates: 'August 2026 — Present', status: 'In progress',
    description: 'A connected ecosystem of specialized agents, coordinated through shared state.',
    overview: 'CaesarOS is an in-progress AI orchestration platform. I’m designing specialized agents that coordinate through LangGraph and shared workflow state, connecting productivity tools, knowledge retrieval, and automation in one ecosystem.',
    stack: ['LangGraph', 'ChromaDB', 'Firebase', 'Discord', 'Google Workspace APIs'],
    metrics: [],
    highlights: [
      'Architecting a multi-agent AI orchestration platform using LangGraph to coordinate specialized agents through shared workflow state.',
      'Integrating Discord, Google Workspace APIs, ChromaDB, and Firebase to build an AI ecosystem for productivity, knowledge retrieval, and automation.',
    ],
    links: { live: '', github: '', writeup: '' },
  },
];
