# ResumeXray ⚡
### See Beyond Your Resume. Unlock Your Career Potential.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**ResumeXray** is a modern, AI-inspired resume intelligence and career analysis SaaS frontend prototype designed to decode Applicant Tracking Systems (ATS), uncover critical missing competencies, and guide candidates through personalized career roadmaps.

Engineered with a **100% client-side, privacy-preserving architecture**, ResumeXray extracts and analyzes documents directly in your browser runtime—ensuring your personal contact details and career history are never transmitted to third-party cloud servers.

---

## 🌟 Key Features

- **In-Browser Document Parsing:** Real-time text extraction for PDF and DOCX files using client-side parsers (`pdfjs-dist` and `mammoth`) with zero external server dependencies.
- **Deterministic ATS Screening:** Transparent weighted scoring model (0–100) evaluating section structure, skills density, experience metrics, formatting scannability, and keyword coverage.
- **Skills Taxonomy Intelligence:** Categorizes skills across 8 core industry domains (Frontend, Backend, Databases, Cloud & DevOps, AI/Data Science, Design & UX, Product Management, and Soft Skills).
- **Job Description Matcher:** Paste any real-world job posting to calculate exact keyword overlap percentages and view an interactive **Bullet Rewrite Matrix**.
- **Radar Skill Gap Analyzer:** Interactive Recharts radar visualization comparing current demonstrated skills against benchmark engineering roles.
- **Personalized 3-Stage Career Roadmap:** Actionable, stage-based milestone checklists (Weeks 1–12) with persistent progress tracking in `LocalStorage`.
- **Interactive Resume Editor & Single-Column PDF Export:** Refine section bullets with active verb suggestion helpers and export directly to clean, single-column ATS PDFs.
- **Template Marketplace:** 6 ATS-vetted resume designs (Executive Minimalist, Tech Nexus, Campus Velocity, Aesthetic Studio, Pure Typography, Scholar Horizon).
- **Admin Intelligence Console:** Complete administrative telemetry dashboard tracking mock users, popular tracks, format distributions, and deduction analytics.

---

## 🚀 Complete Application Routes

### Public Website
- `/` — Premium SaaS Landing Page with hero scanner preview
- `/features` — Detailed breakdown of the 6 core intelligence modules
- `/how-it-works` — 4-step workflow walkthrough & scoring model weights
- `/pricing` — Demonstration tier comparison (Student, Pro, Campus)
- `/about` — Platform philosophy and client-side privacy commitments
- `/contact` — Interactive inquiry form

### User Workspace
- `/login` & `/register` — Demo authentication with 1-click fast-fill
- `/dashboard` — KPI cards, score evolution area chart, and resume library
- `/analyze` — Drag-and-drop resume uploader with live scanning animation
- `/analysis/:id` — Diagnostic report (Overview, ATS, Skills, Keywords, Verbs, Actions)
- `/my-resumes` — Resume library with side-by-side version comparison
- `/resume-editor/:id` — Real-time editor with live printable sheet canvas
- `/job-match` — Job description keyword matcher & rewrite matrix
- `/skill-gap` — Competency radar analyzer
- `/career-roadmap` — 3-stage milestone tracker
- `/templates` — ATS resume template catalog
- `/profile` — User preferences and career track settings
- `/settings` — Theme, strictness controls, and backup/reset tools
- `/history` — Version audit log

### Admin Portal
- `/admin/login` — Administrative authentication
- `/admin/dashboard` — Platform telemetry and role analytics
- `/admin/users` — Demonstration user directory
- `/admin/analytics` — High-frequency ATS deduction points
- `/admin/templates` — Template management
- `/admin/settings` — Skill taxonomies inspector and global data reset

---

## 🛠️ Technology Stack

- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Routing:** React Router v6
- **Animations:** Motion for React (`framer-motion`)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Document Processing:** PDF.js (`pdfjs-dist`), Mammoth (`mammoth`)
- **PDF Export:** jsPDF, html2canvas
- **Persistence:** Browser `LocalStorage`

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/WEBNESTLTD/resumexray.git
cd resumexray

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to: **`http://localhost:5173`**

### Building for Production

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 🔑 Demo Credentials

- **Demo User:** `demo@resumexray.demo` / `ResumeXray@123` *(or click **Instant Demo Login**)*
- **Demo Admin:** `admin@resumexray.demo` / `XrayAdmin@123` *(or click **1-Click Admin Access**)*

---

## 📄 License

This project is licensed under the MIT License.
