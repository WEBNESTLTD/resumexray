// Comprehensive dictionary of technical and soft skills grouped by category
export const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend Development',
    color: '#7657F6',
    skills: [
      'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
      'Tailwind CSS', 'Redux', 'Zustand', 'Sass', 'Webpack', 'Vite', 'GraphQL', 'Responsive Design',
      'REST APIs', 'Single Page Applications (SPA)', 'Web Performance', 'Micro-frontends', 'Jest',
      'Cypress', 'Playwright', 'Web Accessibility (WCAG)', 'Shadcn UI', 'Material UI'
    ]
  },
  backend: {
    name: 'Backend Development',
    color: '#3B82F6',
    skills: [
      'Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot', 'Go (Golang)',
      'C#', '.NET Core', 'PHP', 'Laravel', 'Ruby on Rails', 'Microservices', 'gRPC', 'RabbitMQ',
      'Apache Kafka', 'RESTful Architecture', 'GraphQL APIs', 'WebSocket', 'API Gateway', 'Authentication (OAuth/JWT)'
    ]
  },
  database: {
    name: 'Databases & Storage',
    color: '#10B981',
    skills: [
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Supabase', 'Firebase',
      'Prisma', 'SQL Server', 'Cassandra', 'Database Indexing', 'Query Optimization', 'Schema Design',
      'Data Modeling', 'ACID Transactions'
    ]
  },
  cloudDevops: {
    name: 'Cloud & DevOps',
    color: '#42C5D8',
    skills: [
      'AWS (Amazon Web Services)', 'Microsoft Azure', 'Google Cloud (GCP)', 'Docker', 'Kubernetes',
      'CI/CD Pipelines', 'GitHub Actions', 'Terraform', 'Linux/Unix', 'Nginx', 'Serverless', 'Cloudflare',
      'Prometheus', 'Grafana', 'Datadog', 'Infrastructure as Code (IaC)'
    ]
  },
  dataAi: {
    name: 'AI & Data Science',
    color: '#EC4899',
    skills: [
      'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy',
      'Data Analysis', 'Large Language Models (LLMs)', 'NLP', 'Computer Vision', 'LangChain',
      'RAG (Retrieval-Augmented Generation)', 'Data Visualization', 'Tableau', 'Power BI', 'Jupyter'
    ]
  },
  design: {
    name: 'Design & UX',
    color: '#F59E0B',
    skills: [
      'Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems',
      'Information Architecture', 'Interaction Design', 'Usability Testing', 'Adobe Creative Cloud',
      'Design Thinking', 'Mobile-First Design'
    ]
  },
  management: {
    name: 'Product & Project Management',
    color: '#8B5CF6',
    skills: [
      'Agile / Scrum', 'Jira', 'Kanban', 'Roadmapping', 'Sprint Planning', 'Product Strategy',
      'Stakeholder Management', 'Cross-functional Leadership', 'OKRs / KPIs', 'User Stories',
      'Risk Management', 'Technical Documentation'
    ]
  },
  softSkills: {
    name: 'Professional & Soft Skills',
    color: '#6366F1',
    skills: [
      'Problem Solving', 'Strategic Thinking', 'Written & Verbal Communication', 'Team Leadership',
      'Collaboration', 'Mentorship', 'Conflict Resolution', 'Time Management', 'Critical Thinking',
      'Client Presentation', 'Adaptability', 'Continuous Learning'
    ]
  }
};

// Flattened list for fast lookup
export const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flatMap(c => c.skills);

// Weak verbs vs Strong action verbs for resume improvement
export const ACTION_VERB_SUGGESTIONS = {
  'worked on': ['Architected', 'Spearheaded', 'Engineered', 'Delivered', 'Implemented'],
  'helped with': ['Facilitated', 'Collaborated on', 'Accelerated', 'Bolstered', 'Championed'],
  'responsible for': ['Owned', 'Directed', 'Orchestrated', 'Oversaw', 'Executed'],
  'handled': ['Resolved', 'Streamlined', 'Negotiated', 'Administered', 'Managed'],
  'did': ['Executed', 'Formulated', 'Devised', 'Achieved', 'Produced'],
  'made': ['Engineered', 'Pioneered', 'Constructed', 'Generated', 'Established'],
  'assisted': ['Co-developed', 'Partnered with', 'Strengthened', 'Supported', 'Empowered'],
  'fixed': ['Remediated', 'Optimized', 'Rectified', 'Diagnosed and solved', 'Overhauled'],
  'changed': ['Modernized', 'Restructured', 'Transformed', 'Revamped', 'Refactored'],
  'wrote': ['Authored', 'Drafted', 'Engineered documentation for', 'Formulated']
};

export const COMMON_ATS_SECTIONS = [
  { key: 'contact', name: 'Contact Information', required: true, weight: 15 },
  { key: 'summary', name: 'Professional Summary', required: false, weight: 10 },
  { key: 'skills', name: 'Technical / Core Skills', required: true, weight: 20 },
  { key: 'experience', name: 'Work Experience', required: true, weight: 30 },
  { key: 'education', name: 'Education', required: true, weight: 15 },
  { key: 'projects', name: 'Projects & Portfolio', required: false, weight: 10 }
];
