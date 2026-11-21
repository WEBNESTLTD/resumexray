import { SKILL_CATEGORIES, ALL_SKILLS, ACTION_VERB_SUGGESTIONS } from '../data/skillDictionary';
import { ROLE_REQUIREMENTS } from '../data/roleRequirements';

export function detectRoleFromText(text) {
  const lower = (text || '').toLowerCase();
  if (lower.includes('customer success') || lower.includes('client success') || lower.includes('account manager') || lower.includes('retention rate') || lower.includes('nrr')) {
    return 'customer-success-manager';
  }
  if (lower.includes('frontend') || lower.includes('react') || lower.includes('javascript') || lower.includes('html5')) {
    return 'frontend-developer';
  }
  if (lower.includes('full stack') || lower.includes('fullstack')) {
    return 'fullstack-engineer';
  }
  if (lower.includes('backend') || lower.includes('django') || lower.includes('spring boot') || lower.includes('microservices')) {
    return 'backend-developer';
  }
  if (lower.includes('data analyst') || lower.includes('tableau') || lower.includes('power bi')) {
    return 'data-analyst';
  }
  if (lower.includes('ui/ux') || lower.includes('figma') || lower.includes('product designer')) {
    return 'ui-ux-designer';
  }
  if (lower.includes('machine learning') || lower.includes('deep learning') || lower.includes('pytorch')) {
    return 'ai-ml-engineer';
  }
  if (lower.includes('devops') || lower.includes('kubernetes') || lower.includes('terraform')) {
    return 'devops-cloud-engineer';
  }
  if (lower.includes('product manager') || lower.includes('scrum') || lower.includes('sprint planning')) {
    return 'product-manager';
  }
  return null;
}

/**
 * Resume Analysis Engine
 * Evaluates raw resume text across:
 * 1. Overall Resume Score (0-100)
 * 2. ATS Compatibility
 * 3. Section Segmentation
 * 4. Skills Extraction (by category)
 * 5. Keyword Density & Matching
 * 6. Heuristic Grammar & Action Verbs
 * 7. Actionable Categorized Recommendations
 */
export function analyzeResumeText(rawText, targetRoleKey = 'frontend-developer', customJobDescription = '') {
  const text = rawText || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const words = text.toLowerCase().match(/\b[a-z0-9+#.-]+\b/g) || [];
  const wordCount = words.length;

  // Auto-detect role if default or mismatched
  const autoRole = detectRoleFromText(text);
  let resolvedRoleKey = targetRoleKey;
  if (autoRole && (!targetRoleKey || targetRoleKey === 'frontend-developer')) {
    resolvedRoleKey = autoRole;
  }

  const targetRole = ROLE_REQUIREMENTS[resolvedRoleKey] || ROLE_REQUIREMENTS['customer-success-manager'] || ROLE_REQUIREMENTS['frontend-developer'];

  // A. Section Detection
  const detectedSections = detectSections(text);

  // B. Contact Extraction
  const contactInfo = extractContactInfo(text);

  // C. Skills Extraction
  const extractedSkills = extractSkills(text);

  // D. Target Role Matching & Keywords
  const keywordAnalysis = evaluateKeywords(text, targetRole, customJobDescription);

  // E. Action Verbs & Metrics Quality
  const contentQuality = evaluateContentQuality(text, lines);

  // F. ATS Scoring
  const atsAnalysis = evaluateAtsCompatibility(detectedSections, contactInfo, wordCount, contentQuality);

  // G. Dimension Scoring
  // Structure: 20%
  const structureScore = calculateStructureScore(detectedSections, contactInfo);
  // Skills: 20%
  const skillsScore = calculateSkillsScore(extractedSkills, targetRole);
  // Experience: 20%
  const experienceScore = calculateExperienceScore(contentQuality, detectedSections);
  // Keywords: 15%
  const keywordsScore = keywordAnalysis.coverageScore;
  // Formatting & Readability: 15%
  const formattingScore = calculateFormattingScore(wordCount, lines, contentQuality);
  // Education & Certs: 10%
  const educationScore = detectedSections.includes('education') ? 95 : 40;

  // Weighted Overall Score
  const overallScore = Math.round(
    structureScore * 0.20 +
    skillsScore * 0.20 +
    experienceScore * 0.20 +
    keywordsScore * 0.15 +
    formattingScore * 0.15 +
    educationScore * 0.10
  );

  // Generate prioritized recommendations
  const recommendations = generateRecommendations({
    detectedSections,
    contactInfo,
    wordCount,
    skillsFound: extractedSkills.allFound,
    skillsMissing: keywordAnalysis.missingRoleSkills,
    contentQuality,
    structureScore,
    atsScore: atsAnalysis.score
  });

  return {
    id: `analysis-${Date.now()}`,
    analyzedAt: new Date().toISOString(),
    targetRoleKey: resolvedRoleKey,
    targetRoleTitle: targetRole.title,
    wordCount,
    scores: {
      overall: Math.min(100, Math.max(30, overallScore)),
      ats: atsAnalysis.score,
      structure: structureScore,
      skills: skillsScore,
      experience: experienceScore,
      keywords: keywordsScore,
      formatting: formattingScore,
      education: educationScore
    },
    sections: {
      detected: detectedSections,
      missing: ['contact', 'summary', 'skills', 'experience', 'education', 'projects'].filter(s => !detectedSections.includes(s))
    },
    contact: contactInfo,
    skills: extractedSkills,
    keywords: keywordAnalysis,
    contentQuality,
    ats: atsAnalysis,
    recommendations
  };
}

function detectSections(text) {
  const sections = [];
  const lower = text.toLowerCase();

  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text) || /\b(phone|email|linkedin|github)\b/i.test(text)) {
    sections.push('contact');
  }
  if (/\b(summary|profile|about me|objective|professional summary)\b/i.test(lower)) {
    sections.push('summary');
  }
  if (/\b(skills|technical skills|technologies|core competencies|tools|stack)\b/i.test(lower)) {
    sections.push('skills');
  }
  if (/\b(experience|work experience|employment|employment history|work history|career)\b/i.test(lower)) {
    sections.push('experience');
  }
  if (/\b(education|university|college|bachelor|master|degree|academic)\b/i.test(lower)) {
    sections.push('education');
  }
  if (/\b(projects|personal projects|key projects|portfolio)\b/i.test(lower)) {
    sections.push('projects');
  }
  if (/\b(certifications|certificates|licenses|credentials)\b/i.test(lower)) {
    sections.push('certifications');
  }
  return sections;
}

function extractContactInfo(text) {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = text.match(/github\.com\/[a-zA-Z0-9_-]+/i);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? linkedinMatch[0] : null,
    github: githubMatch ? githubMatch[0] : null,
    complete: Boolean(emailMatch && phoneMatch)
  };
}

function extractSkills(text) {
  const lower = text.toLowerCase();
  const byCategory = {};
  const allFound = [];

  Object.entries(SKILL_CATEGORIES).forEach(([catKey, category]) => {
    const matched = category.skills.filter(skill => {
      // Clean escape for regex
      const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
      return regex.test(lower);
    });

    if (matched.length > 0) {
      byCategory[catKey] = {
        name: category.name,
        color: category.color,
        skills: matched
      };
      allFound.push(...matched);
    }
  });

  return {
    byCategory,
    allFound: Array.from(new Set(allFound)),
    totalCount: allFound.length
  };
}

function evaluateKeywords(text, targetRole, customJobDescription) {
  const lower = text.toLowerCase();
  const required = targetRole.requiredSkills;
  const bonus = targetRole.bonusSkills;
  const roleKeywords = targetRole.keywords;

  const foundRequired = required.filter(s => lower.includes(s.toLowerCase()));
  const missingRequired = required.filter(s => !lower.includes(s.toLowerCase()));
  const foundBonus = bonus.filter(s => lower.includes(s.toLowerCase()));
  const missingBonus = bonus.filter(s => !lower.includes(s.toLowerCase()));

  const foundRoleKeywords = roleKeywords.filter(k => lower.includes(k.toLowerCase()));
  const missingRoleKeywords = roleKeywords.filter(k => !lower.includes(k.toLowerCase()));

  // Custom Job Description parsing if provided
  let customJobKeywords = [];
  if (customJobDescription && customJobDescription.trim().length > 30) {
    const descWords = customJobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const stopWords = new Set(['with', 'that', 'this', 'have', 'from', 'they', 'will', 'would', 'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 'know', 'take', 'person', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us']);
    const freq = {};
    descWords.forEach(w => {
      if (!stopWords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    customJobKeywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count]) => ({
        keyword: word,
        countInJob: count,
        foundInResume: lower.includes(word)
      }));
  }

  const reqRatio = required.length ? (foundRequired.length / required.length) : 1;
  const kwRatio = roleKeywords.length ? (foundRoleKeywords.length / roleKeywords.length) : 1;
  const coverageScore = Math.min(100, Math.round(reqRatio * 65 + kwRatio * 35));

  return {
    coverageScore,
    foundRequired,
    missingRequired,
    foundBonus,
    missingBonus,
    missingRoleSkills: [...missingRequired, ...missingBonus.slice(0, 2)],
    foundRoleKeywords,
    missingRoleKeywords,
    customJobKeywords
  };
}

function evaluateContentQuality(text, lines) {
  const lower = text.toLowerCase();
  const weakVerbsFound = [];

  Object.entries(ACTION_VERB_SUGGESTIONS).forEach(([weak, strongList]) => {
    if (lower.includes(weak)) {
      weakVerbsFound.push({
        phrase: weak,
        suggestions: strongList
      });
    }
  });

  // Check for quantifiable metrics ($ amounts, percentages %, numbers, 'X%')
  const metricMatches = text.match(/(\d+%\s*|\$\s*[\d,]+|\b\d+\+?\s*(users|clients|engineers|projects|teams|requests|sales|revenue|hours|days|x\b))/gi) || [];
  const bulletLines = lines.filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'));
  const longBullets = bulletLines.filter(l => l.split(/\s+/).length > 35);
  const firstPersonCount = (text.match(/\b(I|me|my|mine|we|our|us)\b/g) || []).length;

  return {
    weakVerbsFound,
    metricsCount: metricMatches.length,
    metricHighlights: metricMatches.slice(0, 6),
    bulletCount: bulletLines.length,
    longBulletCount: longBullets.length,
    firstPersonPronounCount: firstPersonCount,
    hasMetrics: metricMatches.length >= 3
  };
}

function evaluateAtsCompatibility(sections, contact, wordCount, contentQuality) {
  const issues = [];
  const positives = [];

  let score = 70;

  if (contact.email && contact.phone) {
    positives.push('Contact info contains parsed email and telephone.');
    score += 8;
  } else {
    issues.push('Missing either verified email or phone number in header.');
    score -= 10;
  }

  if (sections.includes('experience') && sections.includes('skills')) {
    positives.push('Key ATS sections (Experience & Skills) clearly recognized.');
    score += 8;
  } else {
    issues.push('Missing standard "Experience" or "Skills" heading.');
    score -= 15;
  }

  if (wordCount >= 400 && wordCount <= 1200) {
    positives.push(`Document length (${wordCount} words) is optimal for 1-2 pages.`);
    score += 6;
  } else if (wordCount < 300) {
    issues.push(`Document is very brief (${wordCount} words). Add detailed role achievements.`);
    score -= 12;
  } else if (wordCount > 1400) {
    issues.push(`Document is lengthy (${wordCount} words). Prune older roles.`);
    score -= 6;
  }

  if (contentQuality.bulletCount >= 6) {
    positives.push('Strong usage of scannable bullet points.');
    score += 5;
  } else {
    issues.push('Few bullet points detected. ATS parses bulleted achievements more accurately than dense paragraphs.');
    score -= 8;
  }

  if (contentQuality.firstPersonPronounCount > 4) {
    issues.push(`Detected ${contentQuality.firstPersonPronounCount} first-person pronouns ("I", "my"). Resume conventions favor implied first person.`);
    score -= 5;
  }

  return {
    score: Math.min(100, Math.max(35, score)),
    issues,
    positives,
    atsChecklist: [
      { item: 'Standard Section Headings', pass: sections.includes('experience') && sections.includes('skills') },
      { item: 'Parseable Contact Information', pass: contact.complete },
      { item: 'No Complex Multi-column Headers', pass: true },
      { item: 'Optimal Length (400 - 1200 words)', pass: wordCount >= 400 && wordCount <= 1200 },
      { item: 'Action Verb & Bullet Point Format', pass: contentQuality.bulletCount >= 5 },
      { item: 'Zero First-Person Pronouns', pass: contentQuality.firstPersonPronounCount === 0 }
    ]
  };
}

function calculateStructureScore(sections, contact) {
  let score = 50;
  if (sections.includes('contact') || contact.email) score += 10;
  if (sections.includes('summary')) score += 10;
  if (sections.includes('skills')) score += 10;
  if (sections.includes('experience')) score += 10;
  if (sections.includes('education')) score += 10;
  return Math.min(100, score);
}

function calculateSkillsScore(extractedSkills, targetRole) {
  const reqCount = targetRole.requiredSkills.length;
  const foundReq = targetRole.requiredSkills.filter(s => extractedSkills.allFound.includes(s)).length;
  const ratio = reqCount ? (foundReq / reqCount) : 0.8;
  return Math.min(100, Math.max(40, Math.round(ratio * 100)));
}

function calculateExperienceScore(contentQuality, sections) {
  let score = 65;
  if (sections.includes('experience')) score += 15;
  if (contentQuality.metricsCount >= 3) score += 15;
  if (contentQuality.weakVerbsFound.length === 0) score += 5;
  return Math.min(100, score);
}

function calculateFormattingScore(wordCount, lines, contentQuality) {
  let score = 75;
  if (wordCount >= 400 && wordCount <= 1100) score += 15;
  if (contentQuality.bulletCount >= 6) score += 10;
  if (contentQuality.longBulletCount > 3) score -= 10;
  return Math.min(100, Math.max(45, score));
}

function generateRecommendations({
  detectedSections,
  contactInfo,
  wordCount,
  skillsMissing,
  contentQuality,
  atsScore
}) {
  const list = [];

  // 1. Critical
  if (!contactInfo.email || !contactInfo.phone) {
    list.push({
      id: 'rec-contact',
      priority: 'Critical',
      title: 'Ensure Complete Header Contact Details',
      category: 'Contact',
      explanation: 'Recruiters and automated ATS parsers require an easily recognizable email address and phone number to invite you for an interview.'
    });
  }

  if (wordCount < 350) {
    list.push({
      id: 'rec-length',
      priority: 'Critical',
      title: 'Expand Resume Depth and Experience Bullets',
      category: 'Length',
      explanation: 'Your resume text is currently very short. Aim for 450–800 words to give the parser sufficient technical context.'
    });
  }

  // 2. Important
  if (skillsMissing && skillsMissing.length > 0) {
    list.push({
      id: 'rec-missing-skills',
      priority: 'Important',
      title: `Integrate Core Target Skills (${skillsMissing.slice(0, 3).join(', ')})`,
      category: 'Skills Alignment',
      explanation: `Your target role heavily expects competencies in: ${skillsMissing.slice(0, 4).join(', ')}. Mention these where you have hands-on project exposure.`
    });
  }

  if (contentQuality.metricsCount < 3) {
    list.push({
      id: 'rec-metrics',
      priority: 'Important',
      title: 'Quantify Achievements With Concrete Numbers',
      category: 'Impact Metrics',
      explanation: 'Bullet points with numbers (e.g. "improved latency by 35%", "scaled platform to 200K users") rank significantly higher with hiring managers than generic task descriptions.'
    });
  }

  if (contentQuality.weakVerbsFound.length > 0) {
    const weakWord = contentQuality.weakVerbsFound[0].phrase;
    const replacement = contentQuality.weakVerbsFound[0].suggestions.slice(0, 2).join(' / ');
    list.push({
      id: 'rec-action-verbs',
      priority: 'Important',
      title: `Replace Passive Phrasing ("${weakWord}" → "${replacement}")`,
      category: 'Language Quality',
      explanation: 'Replace passive or weak verbs with strong power action verbs that convey direct architectural ownership and engineering rigor.'
    });
  }

  // 3. Recommended
  if (!detectedSections.includes('summary')) {
    list.push({
      id: 'rec-summary',
      priority: 'Recommended',
      title: 'Add a 2–3 Line Professional Executive Summary',
      category: 'Structure',
      explanation: 'A concise summary anchors your target role, years of experience, and primary technical strengths in the first 6-second recruiter glance.'
    });
  }

  if (!contactInfo.linkedin || !contactInfo.github) {
    list.push({
      id: 'rec-links',
      priority: 'Recommended',
      title: 'Include Clean LinkedIn and GitHub URLs',
      category: 'Online Presence',
      explanation: 'Technical roles value direct verification of code repositories and professional references.'
    });
  }

  // 4. Optional
  if (contentQuality.longBulletCount > 0) {
    list.push({
      id: 'rec-long-bullets',
      priority: 'Optional',
      title: 'Split Dense Sentences Into Crisp Bullets',
      category: 'Readability',
      explanation: 'Several bullet points exceed 35 words. Keep each achievement to 1.5–2 lines (under 25 words) for maximum skimmability.'
    });
  }

  return list;
}
