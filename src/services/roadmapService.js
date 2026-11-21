import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import { StorageService } from './storage';

/**
 * Career Roadmap Generator Service
 * Creates structured, stage-based career milestones tailored to
 * target job roles and identified skill gaps.
 */
export function getCareerRoadmap(roleKey = 'frontend-developer', userSkills = []) {
  const role = ROLE_REQUIREMENTS[roleKey] || ROLE_REQUIREMENTS['frontend-developer'];
  const savedRoadmaps = StorageService.getRoadmaps();

  if (savedRoadmaps[roleKey]) {
    return savedRoadmaps[roleKey];
  }

  // Generate deterministic personalized stages
  const defaultRoadmap = {
    roleKey,
    roleTitle: role.title,
    generatedAt: new Date().toISOString(),
    stages: [
      {
        id: 'stage-1',
        title: 'Stage 1: Core Fundamentals & ATS Alignment',
        duration: 'Weeks 1 – 3',
        description: 'Close critical skill gaps, update resume terminology, and solidify core role essentials.',
        tasks: [
          {
            id: 't-1-1',
            title: `Master ${role.requiredSkills[0] || 'Core Framework'} Modern Best Practices`,
            type: 'Learning',
            completed: true,
            description: 'Deep-dive into component lifecycle, hooks, and architectural scalability.'
          },
          {
            id: 't-1-2',
            title: 'Audit Resume Against ATS Scanners',
            type: 'Resume',
            completed: true,
            description: 'Ensure contact details, standard section titles, and keyword density match role requirements.'
          },
          {
            id: 't-1-3',
            title: `Learn ${role.requiredSkills[1] || 'TypeScript'} Type Systems`,
            type: 'Learning',
            completed: false,
            description: 'Build strict interfaces, generic types, and eliminate any implicit type evasions.'
          },
          {
            id: 't-1-4',
            title: 'Quantify 5 Bullet Points With Measurable Metrics',
            type: 'Resume',
            completed: false,
            description: 'Add percentage increases, latency improvements, or user counts to past experience.'
          }
        ]
      },
      {
        id: 'stage-2',
        title: 'Stage 2: Production-Grade Projects & System Design',
        duration: 'Weeks 4 – 8',
        description: 'Demonstrate real-world execution by shipping a production-grade portfolio application.',
        tasks: [
          {
            id: 't-2-1',
            title: `Build a Full-Featured ${role.title} Capstone Project`,
            type: 'Project',
            completed: false,
            description: `Design and deploy an end-to-end application implementing ${role.requiredSkills.slice(0, 3).join(', ')}.`
          },
          {
            id: 't-2-2',
            title: 'Implement Automated Unit & E2E Testing Suite',
            type: 'Testing',
            completed: false,
            description: 'Write robust integration tests with Jest/Playwright covering happy paths and edge cases.'
          },
          {
            id: 't-2-3',
            title: 'Set Up CI/CD GitHub Actions Pipeline',
            type: 'DevOps',
            completed: false,
            description: 'Automate linting, typechecking, testing, and deployment to cloud hosting.'
          },
          {
            id: 't-2-4',
            title: 'Publish Detailed Technical Case Study / Readme',
            type: 'Portfolio',
            completed: false,
            description: 'Explain architectural tradeoffs, benchmarks, and problems overcome.'
          }
        ]
      },
      {
        id: 'stage-3',
        title: 'Stage 3: Interview Mastery & Strategic Outreach',
        duration: 'Weeks 9 – 12',
        description: 'Prepare for technical screens, behavioral rounds, and strategic recruiter outreach.',
        tasks: [
          {
            id: 't-3-1',
            title: 'Complete 30 Domain Technical Practice Problems',
            type: 'Interview Prep',
            completed: false,
            description: 'Practice data structures, API design, and system architecture questions.'
          },
          {
            id: 't-3-2',
            title: 'Prepare 5 STAR-Method Behavioral Stories',
            type: 'Interview Prep',
            completed: false,
            description: 'Structure stories around leadership, conflict resolution, and handling production outages.'
          },
          {
            id: 't-3-3',
            title: 'Conduct 2 Mock Interviews With Peers or Mentors',
            type: 'Interview Prep',
            completed: false,
            description: 'Simulate live coding and whiteboarding under timed constraints.'
          },
          {
            id: 't-3-4',
            title: 'Tailor 10 Targeted Applications Using ResumeXray',
            type: 'Outreach',
            completed: false,
            description: 'Run each job description through the Job Matcher and customize before applying.'
          }
        ]
      }
    ]
  };

  StorageService.saveRoadmap(roleKey, defaultRoadmap);
  return defaultRoadmap;
}

export function toggleTaskCompletion(roleKey, stageId, taskId) {
  const roadmaps = StorageService.getRoadmaps();
  const roadmap = roadmaps[roleKey] || getCareerRoadmap(roleKey);

  const stage = roadmap.stages.find(s => s.id === stageId);
  if (stage) {
    const task = stage.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      StorageService.saveRoadmap(roleKey, roadmap);
    }
  }
  return roadmap;
}
