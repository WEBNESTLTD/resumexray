// Realistic Seed Data for initial demonstration state
export const SEED_RESUMES = [
  {
    id: 'res-alex-chen-01',
    fileName: 'Alex_Chen_Senior_Frontend_Engineer.pdf',
    uploadedAt: '2026-11-18T10:30:00.000Z',
    fileSize: '142 KB',
    targetRole: 'frontend-developer',
    targetRoleTitle: 'Senior Frontend Engineer',
    scores: {
      overall: 88,
      ats: 92,
      skills: 85,
      experience: 90,
      keywords: 82,
      formatting: 95
    },
    sectionsDetected: ['contact', 'summary', 'skills', 'experience', 'education', 'projects'],
    skillsFound: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'REST APIs', 'Jest', 'Git', 'Webpack'],
    skillsMissing: ['Web Accessibility (WCAG)', 'Playwright', 'Web Performance'],
    summary: 'Seasoned Frontend Engineer with 5+ years of experience crafting enterprise-grade web applications with React, TypeScript, and modern component systems.'
  },
  {
    id: 'res-priya-patel-02',
    fileName: 'Priya_Patel_FullStack_Resume.docx',
    uploadedAt: '2026-11-19T14:15:00.000Z',
    fileSize: '88 KB',
    targetRole: 'fullstack-engineer',
    targetRoleTitle: 'Full Stack Developer',
    scores: {
      overall: 79,
      ats: 76,
      skills: 82,
      experience: 78,
      keywords: 74,
      formatting: 85
    },
    sectionsDetected: ['contact', 'skills', 'experience', 'education'],
    skillsFound: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Docker', 'JavaScript', 'HTML5', 'CSS3'],
    skillsMissing: ['TypeScript', 'Kubernetes', 'Redis', 'AWS (Amazon Web Services)'],
    summary: 'Full Stack developer experienced in React frontends and Node.js REST services. Strong grasp of SQL database design.'
  },
  {
    id: 'res-marcus-vance-03',
    fileName: 'Marcus_Vance_AI_ML_Resume.pdf',
    uploadedAt: '2026-11-20T09:45:00.000Z',
    fileSize: '198 KB',
    targetRole: 'ai-ml-engineer',
    targetRoleTitle: 'AI / Machine Learning Engineer',
    scores: {
      overall: 94,
      ats: 96,
      skills: 95,
      experience: 92,
      keywords: 91,
      formatting: 96
    },
    sectionsDetected: ['contact', 'summary', 'skills', 'experience', 'education', 'projects'],
    skillsFound: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'Scikit-learn', 'Docker', 'Pandas'],
    skillsMissing: ['LangChain', 'RAG (Retrieval-Augmented Generation)'],
    summary: 'Lead AI Engineer specializing in deep neural architectures, PyTorch pipelines, and productionizing computer vision models.'
  }
];

export const SAMPLE_RESUME_TEXT = `Alex Chen
San Francisco, CA | alex.chen@example.dev | (555) 234-5678 | linkedin.com/in/alexchen-dev | github.com/alexchen

PROFESSIONAL SUMMARY
Results-driven Senior Frontend Engineer with 5+ years of experience designing and scaling responsive, accessible web applications. Spearheaded frontend architecture for SaaS platforms serving 500K+ monthly active users, improving core web vitals by 42% and accelerating feature delivery cycles.

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3, SQL
• Frontend Frameworks & Libraries: React, Next.js, Redux Toolkit, Zustand, Tailwind CSS, Sass
• Tooling & Testing: Vite, Webpack, Jest, React Testing Library, Git, GitHub Actions, Docker
• Architecture: Micro-frontends, REST APIs, GraphQL, Design Systems, State Management

PROFESSIONAL EXPERIENCE
Senior Frontend Engineer | CloudMatrix Inc., San Francisco, CA
March 2023 – Present
• Architected and migrated legacy monolith to React 18 and Next.js, reducing initial page load time from 4.2s to 1.4s (66% improvement).
• Designed and maintained an enterprise design system used by 24 engineers across 4 cross-functional product squads, increasing UI development speed by 35%.
• Engineered high-performance interactive analytics dashboards using Recharts and virtualized lists handling 50,000+ data points smoothly at 60fps.
• Mentored 5 junior and mid-level engineers through structured pairing sessions, PR reviews, and technical workshops.

Frontend Developer | Horizon Digital Labs, Austin, TX
July 2021 – February 2023
• Built 15+ responsive web application features using React, TypeScript, and Tailwind CSS for fintech enterprise clients.
• Collaborated closely with product managers and UI/UX designers to implement WCAG 2.1 AA compliant customer portals.
• Integrated RESTful endpoints and WebSocket streams for real-time portfolio market data streaming.
• Authored comprehensive automated test suites with Jest, increasing codebase branch coverage from 54% to 88%.

Software Engineer Intern | NextWave Tech, Austin, TX
January 2021 – June 2021
• Developed reusable React components and assisted in REST API integration.
• Fixed critical layout and browser compatibility bugs across iOS Safari, Chrome, and Firefox.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin
Graduated: December 2020 | GPA: 3.8/4.0

PROJECTS
• DevSprint CLI & Dashboard: Open-source developer productivity dashboard built with React and Vite. 1,200+ GitHub stars.
• HealthSync Web Portal: Patient appointment booking portal featuring end-to-end encryption and responsive calendar scheduling.
`;

export const RESUME_TEMPLATES = [
  {
    id: 'tpl-executive-clean',
    name: 'Executive Minimalist',
    category: 'Professional',
    atsScore: 98,
    atsSuitability: 'Highest (ATS Optimized)',
    description: 'Clean single-column layout strictly formatted for optimal ATS parsing and rapid recruiter scanning.',
    accentColor: '#1E293B',
    previewBadge: 'Most Popular',
    recommendedFor: 'Software Engineers, Architects, Executives, Finance'
  },
  {
    id: 'tpl-modern-tech',
    name: 'Tech Nexus',
    category: 'Technical',
    atsScore: 95,
    atsSuitability: 'High (ATS Friendly)',
    description: 'Streamlined design emphasizing technical skills breakdown, project metrics, and GitHub/portfolio highlights.',
    accentColor: '#7657F6',
    previewBadge: 'Tech Favorite',
    recommendedFor: 'Frontend, Full Stack, DevOps, AI Engineers'
  },
  {
    id: 'tpl-fresh-graduate',
    name: 'Campus Velocity',
    category: 'Fresh Graduate',
    atsScore: 94,
    atsSuitability: 'High (ATS Friendly)',
    description: 'Puts education, internships, academic projects, and verified skills front and center for early-career impact.',
    accentColor: '#16A36A',
    previewBadge: 'Best for Grads',
    recommendedFor: 'College Students, Bootcamp Grads, Interns'
  },
  {
    id: 'tpl-creative-folio',
    name: 'Aesthetic Studio',
    category: 'Creative',
    atsScore: 88,
    atsSuitability: 'Moderate (Visual Polish)',
    description: 'Sophisticated typography and subtle color accents designed for design, marketing, and creative leadership.',
    accentColor: '#42C5D8',
    previewBadge: 'Creative Pick',
    recommendedFor: 'UI/UX Designers, Product Designers, Content Strategists'
  },
  {
    id: 'tpl-minimal-mono',
    name: 'Pure Typography',
    category: 'Minimal',
    atsScore: 99,
    atsSuitability: 'Highest (Zero Distraction)',
    description: 'Zero graphic clutter, perfect hierarchical typography, and maximized whitespace readability.',
    accentColor: '#111827',
    previewBadge: 'ATS 99%',
    recommendedFor: 'All professions, especially traditional corporate'
  },
  {
    id: 'tpl-academic-cv',
    name: 'Scholar Horizon',
    category: 'Academic',
    atsScore: 92,
    atsSuitability: 'High (Detailed)',
    description: 'Structured for detailed research, publications, grants, conferences, and teaching credentials.',
    accentColor: '#3B82F6',
    previewBadge: 'Research',
    recommendedFor: 'Researchers, Professors, PhD candidates, Data Scientists'
  }
];

export const DEMO_USERS = [
  {
    id: 'user-001',
    name: 'Alex Chen',
    email: 'demo@resumexray.demo',
    role: 'Job Seeker',
    targetCareer: 'Senior Frontend Engineer',
    resumesCount: 3,
    avgScore: 88,
    joinedDate: '2026-11-10',
    status: 'Active'
  },
  {
    id: 'user-002',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    role: 'Career Switcher',
    targetCareer: 'Full Stack Developer',
    resumesCount: 2,
    avgScore: 79,
    joinedDate: '2026-11-12',
    status: 'Active'
  },
  {
    id: 'user-003',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.org',
    role: 'Experienced Pro',
    targetCareer: 'AI / Machine Learning Engineer',
    resumesCount: 4,
    avgScore: 94,
    joinedDate: '2026-11-05',
    status: 'Active'
  },
  {
    id: 'user-004',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    role: 'Job Seeker',
    targetCareer: 'UI/UX Product Designer',
    resumesCount: 1,
    avgScore: 84,
    joinedDate: '2026-11-15',
    status: 'Active'
  },
  {
    id: 'user-005',
    name: 'David Kim',
    email: 'david.kim@example.net',
    role: 'Student',
    targetCareer: 'Data Analyst',
    resumesCount: 2,
    avgScore: 72,
    joinedDate: '2026-11-18',
    status: 'Active'
  }
];
