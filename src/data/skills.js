// Single source of truth for skills.
//
// - `featured: true` skills appear in the skills marquee section.
// - Every skill (featured or not) can be referenced from a timeline role's
//   `stack` by its name or any of its `aliases`, so the marquee and the
//   experience cards stay in sync from this one file.
const skillDefinitions = [
  {
    name: 'PHP',
    color: '#777BB4',
    years: 5,
    level: 'Production-grade',
    featured: true,
  },
  {
    name: 'Laravel',
    color: '#FF2D20',
    years: 4,
    level: 'Production-grade',
    featured: true,
  },
  {
    name: 'Vue & Vite',
    color: '#42B883',
    years: 1,
    level: 'Working knowledge',
    featured: true,
    aliases: ['Vue', 'Vite'],
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    years: 1,
    level: 'Working knowledge',
    featured: true,
  },
  {
    name: 'Java',
    color: '#007396',
    years: 2,
    level: 'Comfortable',
    featured: true,
  },
  {
    name: 'AWS',
    color: '#FF9900',
    years: 1,
    level: 'Comfortable',
    featured: true,
  },
  {
    name: 'CI/CD & GitHub Actions',
    color: '#2088FF',
    years: 1,
    level: 'Production-ready',
    featured: true,
    aliases: ['CI/CD', 'GitHub Actions', 'CI Automation (GitHub Actions)'],
  },
  {
    name: 'MySQL',
    color: '#4479A1',
    years: 3,
    level: 'Deep experience',
    featured: true,
  },
  {
    name: 'Liquibase',
    color: '#4B7DBC',
    years: 2,
    level: 'Production-ready',
    featured: true,
  },
  {
    name: 'C++',
    color: '#00599C',
    years: 0.5,
    level: 'Foundational',
    featured: true,
  },
  {
    name: 'Git',
    color: '#F05033',
    years: 3,
    level: 'Daily driver',
    featured: true,
  },
  {
    name: 'GraphQL',
    color: '#E10098',
    years: 1,
    level: 'Beginner',
    featured: true,
  },
  {
    name: 'Stripe & Payment Flows',
    color: '#635BFF',
    years: 0.5,
    level: 'Beginner',
    featured: true,
    aliases: ['Stripe'],
  },
  {
    name: 'AWS CloudWatch',
    color: '#FF4F8B',
    years: 1,
    level: 'Ops-focused',
    featured: true,
    aliases: ['CloudWatch'],
  },
  {
    name: 'Amazon Redshift',
    color: '#8E2DE2',
    years: 1,
    level: 'Ops-focused',
    featured: true,
    aliases: ['Redshift'],
  },
  {
    name: 'Test-Driven Development',
    color: '#FF6F00',
    years: 2,
    level: 'Team advocate',
    featured: true,
    aliases: ['TDD', 'Testing'],
  },
  {
    name: 'Agile & Scrum Delivery',
    color: '#2496ED',
    years: 3,
    level: 'Team advocate',
    featured: true,
    aliases: ['Agile', 'Scrum'],
  },
  {
    name: 'Security Hardening',
    color: '#FF4C4C',
    years: 2,
    level: 'Hands-on',
    featured: true,
    aliases: ['Security'],
  },
  {
    name: 'Python & Flask',
    color: '#3776AB',
    years: 1,
    level: 'Working knowledge',
    featured: true,
    aliases: ['Python', 'Flask'],
  },
  {
    name: 'Front-end Performance & Accessibility',
    color: '#0AC18E',
    years: 2,
    level: 'Data-driven',
    featured: true,
    aliases: ['Performance', 'Accessibility', 'Front-end Development'],
  },

  // Supporting skills referenced from the timeline only.
  { name: 'Symfony', color: '#1A171B' },
  { name: 'API Design', color: '#005B90' },
  { name: 'HTML', color: '#E34F26' },
  { name: 'SCSS', color: '#CC6699' },
  { name: 'Data Science', color: '#9B59B6' },
  { name: 'Databases', color: '#336791' },
]

const skillIndex = new Map()

for (const skill of skillDefinitions) {
  skillIndex.set(skill.name.toLowerCase(), skill)
  for (const alias of skill.aliases || []) {
    skillIndex.set(alias.toLowerCase(), skill)
  }
}

/** Skills shown in the marquee section. */
export const featuredSkills = skillDefinitions.filter((skill) => skill.featured)

/**
 * Resolve a skill by canonical name or alias (case-insensitive).
 * Returns the skill definition, or null when unknown.
 */
export const resolveSkill = (name) => skillIndex.get(String(name).toLowerCase()) || null
