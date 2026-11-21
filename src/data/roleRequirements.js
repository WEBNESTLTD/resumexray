// Target roles with core requirements, keywords, and typical experience thresholds
export const ROLE_REQUIREMENTS = {
  'frontend-developer': {
    title: 'Frontend Developer',
    level: 'Mid-Senior',
    category: 'Engineering',
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs', 'Git'],
    bonusSkills: ['Next.js', 'Web Accessibility (WCAG)', 'Jest', 'Playwright', 'Web Performance', 'GraphQL'],
    keywords: [
      'responsive design', 'component architecture', 'state management', 'cross-browser compatibility',
      'web vitals', 'accessibility', 'unit testing', 'ci/cd', 'code review', 'frontend architecture'
    ],
    experienceYears: '2 - 5 years',
    description: 'Build polished, responsive, and accessible client-facing web applications using React and modern toolchains.'
  },
  'fullstack-engineer': {
    title: 'Full Stack Engineer',
    level: 'Mid-Senior',
    category: 'Engineering',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'RESTful Architecture', 'Docker', 'Git'],
    bonusSkills: ['Next.js', 'AWS (Amazon Web Services)', 'Redis', 'GraphQL', 'Microservices', 'Kubernetes'],
    keywords: [
      'full stack', 'api design', 'database optimization', 'system design', 'authentication',
      'scalability', 'ci/cd pipelines', 'cloud deployment', 'microservices', 'caching'
    ],
    experienceYears: '3 - 6 years',
    description: 'Design and deliver end-to-end web applications covering user interface, microservices, and database persistence.'
  },
  'backend-developer': {
    title: 'Backend Developer',
    level: 'Mid-Senior',
    category: 'Engineering',
    requiredSkills: ['Node.js', 'Python', 'PostgreSQL', 'RESTful Architecture', 'Docker', 'Redis', 'Microservices'],
    bonusSkills: ['Kubernetes', 'AWS (Amazon Web Services)', 'Apache Kafka', 'gRPC', 'GraphQL APIs', 'Golang'],
    keywords: [
      'distributed systems', 'database schema design', 'concurrency', 'high availability',
      'api security', 'message queues', 'load balancing', 'data pipeline', 'latency optimization'
    ],
    experienceYears: '3 - 5 years',
    description: 'Construct fault-tolerant, scalable backend services, asynchronous queues, and database architectures.'
  },
  'data-analyst': {
    title: 'Data Analyst',
    level: 'Associate - Mid',
    category: 'Data & Analytics',
    requiredSkills: ['SQL', 'Python', 'Pandas', 'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI'],
    bonusSkills: ['Machine Learning', 'Jupyter', 'Snowflake', 'BigQuery', 'A/B Testing', 'Statistics'],
    keywords: [
      'kpi dashboards', 'cohort analysis', 'executive reporting', 'data extraction',
      'data modeling', 'business intelligence', 'predictive insights', 'hypothesis testing'
    ],
    experienceYears: '2 - 4 years',
    description: 'Transform complex business datasets into clear actionable intelligence, interactive dashboards, and KPI tracking.'
  },
  'ui-ux-designer': {
    title: 'UI/UX Product Designer',
    level: 'Mid-Senior',
    category: 'Design',
    requiredSkills: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    bonusSkills: ['Interaction Design', 'Usability Testing', 'HTML5', 'CSS3', 'Accessibility (WCAG)'],
    keywords: [
      'user-centered design', 'wireframing', 'high-fidelity prototypes', 'design tokens',
      'usability heuristics', 'information architecture', 'user journey mapping', 'design handoff'
    ],
    experienceYears: '3 - 5 years',
    description: 'Create intuitive, user-centric, and accessible digital experiences from customer discovery to design systems.'
  },
  'ai-ml-engineer': {
    title: 'AI / Machine Learning Engineer',
    level: 'Senior',
    category: 'AI & Data',
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'Scikit-learn', 'Docker'],
    bonusSkills: ['LLMs', 'LangChain', 'RAG', 'Computer Vision', 'NLP', 'Kubernetes', 'MLOps'],
    keywords: [
      'model training', 'fine-tuning', 'vector databases', 'embedding models', 'feature engineering',
      'model evaluation', 'inference latency', 'distributed training', 'synthetic data'
    ],
    experienceYears: '3 - 6 years',
    description: 'Develop and operationalize machine learning models, generative AI pipelines, and intelligent search systems.'
  },
  'devops-cloud-engineer': {
    title: 'Cloud & DevOps Engineer',
    level: 'Mid-Senior',
    category: 'Infrastructure',
    requiredSkills: ['AWS (Amazon Web Services)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux/Unix'],
    bonusSkills: ['Google Cloud (GCP)', 'Prometheus', 'Grafana', 'GitHub Actions', 'Datadog', 'Security Compliance'],
    keywords: [
      'infrastructure as code', 'zero-downtime deployment', 'site reliability', 'monitoring & alerting',
      'cluster management', 'disaster recovery', 'cloud security', 'auto-scaling'
    ],
    experienceYears: '3 - 6 years',
    description: 'Automate build, deployment, and cloud infrastructure pipelines ensuring 99.99% availability and swift delivery.'
  },
  'product-manager': {
    title: 'Technical Product Manager',
    level: 'Mid-Senior',
    category: 'Product',
    requiredSkills: ['Agile / Scrum', 'Roadmapping', 'Sprint Planning', 'Product Strategy', 'Stakeholder Management', 'Jira'],
    bonusSkills: ['Data Analysis', 'User Research', 'SQL', 'A/B Testing', 'OKRs / KPIs'],
    keywords: [
      'product discovery', 'backlog prioritization', 'cross-functional leadership', 'go-to-market',
      'user story mapping', 'customer interviews', 'kpi tracking', 'market analysis'
    ],
    experienceYears: '3 - 6 years',
    description: 'Bridge business strategy, technical execution, and user desires to deliver high-impact software products.'
  }
};
