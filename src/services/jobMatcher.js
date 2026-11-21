import { ROLE_REQUIREMENTS } from '../data/roleRequirements';
import { ALL_SKILLS } from '../data/skillDictionary';

/**
 * Job Description Matcher Service
 * Matches resume skills and text against a custom pasted job description
 * or selected target role.
 */
export function matchJobDescription(resumeSkills = [], resumeText = '', jobDescription = '', roleKey = '') {
  const role = ROLE_REQUIREMENTS[roleKey] || null;
  const descText = (jobDescription || '').toLowerCase();
  const resText = (resumeText || '').toLowerCase();
  const userSkills = resumeSkills.map(s => s.toLowerCase());

  // Extract skills present in the job description
  const jobMentionedSkills = ALL_SKILLS.filter(skill => {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
    return regex.test(descText);
  });

  // Combine with role's standard required skills if role chosen
  const targetRequired = role ? role.requiredSkills : [];
  const targetBonus = role ? role.bonusSkills : [];
  const unionTargetSkills = Array.from(new Set([...targetRequired, ...jobMentionedSkills]));

  // Matching vs Missing
  const matchingSkills = unionTargetSkills.filter(skill => 
    userSkills.includes(skill.toLowerCase()) || resText.includes(skill.toLowerCase())
  );

  const missingSkills = unionTargetSkills.filter(skill =>
    !userSkills.includes(skill.toLowerCase()) && !resText.includes(skill.toLowerCase())
  );

  // Overlap Percentage
  const totalRelevant = unionTargetSkills.length > 0 ? unionTargetSkills.length : 8;
  const matchRatio = unionTargetSkills.length > 0 
    ? (matchingSkills.length / unionTargetSkills.length) 
    : 0.75;
  const matchPercentage = Math.min(98, Math.max(25, Math.round(matchRatio * 100)));

  // Extract key phrases from job description
  const keyPhrases = [];
  const words = descText.match(/\b[a-z]{4,}\b/g) || [];
  const stopWords = new Set(['with', 'that', 'this', 'have', 'from', 'they', 'will', 'would', 'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 'know', 'take', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'other', 'than', 'then', 'look', 'only', 'come', 'over', 'also', 'back', 'after', 'work', 'well', 'must', 'should', 'join', 'team', 'help', 'build', 'role', 'looking', 'years', 'experience', 'skills']);
  
  const freq = {};
  words.forEach(w => {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  const topJobKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([keyword, count]) => ({
      keyword,
      occurrencesInJob: count,
      presentInResume: resText.includes(keyword)
    }));

  // Bullet rewrite suggestions matrix
  const rewriteSuggestions = [
    {
      original: 'Worked on front-end features for customer dashboard.',
      tailored: 'Architected responsive React and TypeScript dashboard modules, reducing page render latency by 35% across 50K+ daily active users.',
      reason: 'Adds specific technology names, action verb, and measurable user scale.'
    },
    {
      original: 'Helped team with API integration and fixing bugs.',
      tailored: 'Engineered RESTful API integration layers with comprehensive error boundaries and automated Jest unit tests, elevating code coverage to 85%.',
      reason: 'Emphasizes proactive engineering ownership and reliability over passive assistance.'
    },
    {
      original: 'Responsible for database queries and updates.',
      tailored: 'Designed optimized PostgreSQL queries and relational indexing schemes, accelerating report execution time from 12s to under 1.5s.',
      reason: 'Demonstrates deep technical proficiency and concrete optimization impact.'
    }
  ];

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
    topJobKeywords,
    rewriteSuggestions,
    summary: {
      totalFound: matchingSkills.length,
      totalMissing: missingSkills.length,
      benchmark: matchPercentage >= 80 ? 'Strong Fit' : matchPercentage >= 65 ? 'Competitive Match' : 'Skill Gaps Present'
    }
  };
}
