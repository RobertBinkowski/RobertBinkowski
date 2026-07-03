import idPalLogo from '@/assets/icons/ID-Pal Logo.svg'
import learnosityLogo from '@/assets/icons/Learnosity Logo.svg'
import sykownoChataLogo from '@/assets/icons/Sykowno Chata logo.svg'
import collegeLogo from '@/assets/icons/CollegeLogo.png'

// Use YYYY-MM for start/end dates so the UI can keep entries sorted newest-first.
export const timelineMain = {
  label: 'Timeline',
}

export const timelineBranches = [
  {
    id: 'work',
    label: 'Work',
    ref: 'Work',
    sectionId: 'workSection',
    lane: 'left',
    color: '#2b9b62',
    description: 'Production engineering and freelance delivery.',
    entries: [
      {
        id: 'learnosity',
        organization: 'Learnosity',
        website: 'https://learnosity.com/',
        location: 'Dublin, County Dublin, Ireland',
        mode: 'Hybrid',
        engagement: 'Full-time',
        logo: learnosityLogo,
        tagline: 'Assessment technology platform',
        roles: [
          {
            id: 'learnosity-software-engineer',
            title: 'Software Engineer',
            start: '2026-06',
            end: null,
            summary:
              'Build and scale backend services for Learnosity’s assessment APIs, helping education products ship reliable, high-volume evaluation experiences.',
            highlights: [
              'Develop PHP/Symfony services that power customer-facing assessment and reporting workflows.',
              'Design and extend APIs used by global edtech products at scale.',
              'Raise delivery quality through automated testing, CI discipline, and maintainable database changes.',
              'Collaborate across backend and frontend boundaries to ship end-to-end product improvements.',
            ],
            stack: ['PHP', 'Symfony', 'MySQL', 'API Design', 'Testing', 'CI/CD'],
          },
        ],
      },
      {
        id: 'id-pal',
        organization: 'ID-Pal',
        website: 'https://www.id-pal.com/',
        location: 'Dublin, County Dublin, Ireland',
        mode: 'Hybrid',
        engagement: 'Full-time',
        logo: idPalLogo,
        tagline: 'Identity verification platform',
        roles: [
          {
            id: 'id-pal-full-stack',
            title: 'Full-stack Developer',
            start: '2025-11',
            end: '2026-06',
            summary:
              "Own and scale core back-end services for ID-Pal's identity-verification platform while still contributing across the stack when delivery needs it.",
            highlights: [
              'Design, build, and harden PHP/Laravel APIs that support customer-facing identity workflows.',
              'Raise delivery quality through automated tests, CI discipline, and tighter backend observability.',
              'Contribute across backend and UI work so end-to-end features ship cleanly instead of stalling at service boundaries.',
            ],
            stack: ['PHP', 'Laravel', 'API Design', 'Testing', 'CI/CD', 'Security'],
          },
          {
            id: 'id-pal-junior-php',
            title: 'Junior PHP Developer',
            start: '2022-11',
            end: '2025-11',
            summary:
              'Built, supported, and maintained core APIs while extending internal and external UI clients, documenting solutions, and helping keep the platform stable.',
            highlights: [
              'Collaborated with the development team to design and optimise both backend and frontend functionality.',
              'Developed backend systems with PHP, Laravel, GraphQL, and external API integrations.',
              'Turned high-level epics into actionable user stories with project management.',
              'Managed and monitored AWS, CloudWatch, and Redshift workloads.',
              'Championed test-driven delivery, system stability, and database change management with Liquibase.',
            ],
            stack: [
              'PHP',
              'Laravel',
              'GraphQL',
              'AWS',
              'CloudWatch',
              'Redshift',
              'Liquibase',
              'TDD',
            ],
          },
        ],
      },
      {
        id: 'sykowno-chata',
        organization: 'Sykowno Chata',
        website: 'https://sykownochata.pl/',
        location: 'Poland',
        mode: 'Remote',
        engagement: 'Contract',
        logo: sykownoChataLogo,
        tagline: 'Hospitality website and ongoing digital presence',
        roles: [
          {
            id: 'sykowno-freelance',
            title: 'Freelance Web Developer',
            start: '2022-05',
            end: '2022-11',
            summary:
              'Designed, built, and continue to maintain the online presence for a family-run holiday apartment business with a focus on reliability, performance, and easy content delivery.',
            highlights: [
              'Delivered a mobile-first responsive experience for smooth browsing across devices.',
              'Optimised media handling and page loading to improve speed and perceived performance.',
              'Implemented progressive image loading with modern formats including AVIF, WebP, and JPEG.',
              'Built a streamlined frontend with room for a more flexible backend content workflow.',
              'Set up GitHub Actions based CI/CD and continue to manage hosting, accessibility, SEO, and ongoing improvements.',
            ],
            stack: ['HTML', 'SCSS', 'JavaScript', 'Performance', 'Accessibility', 'GitHub Actions'],
          },
        ],
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    ref: 'Education',
    sectionId: 'educationSection',
    lane: 'right',
    color: '#e8892f',
    description: 'Formal software education with a practical delivery focus.',
    entries: [
      {
        id: 'setu',
        organization: 'South East Technological University',
        website: 'https://www.setu.ie/',
        location: 'Carlow, Ireland',
        engagement: 'Education',
        logo: collegeLogo,
        tagline: 'BSc in Software Development',
        roles: [
          {
            id: 'setu-bsc',
            title: 'Software Development',
            subtitle: 'BSc in Software Development',
            start: '2018-09',
            end: '2022-05',
            summary:
              'Built a broad foundation in software engineering through practical coursework spanning frontend development, data science, databases, and team-based delivery.',
            highlights: [
              'Studied software design, front-end development, data science, database systems, and application architecture.',
              'Developed hands-on experience shipping coursework across multiple languages and frameworks.',
              'Graduated with a strong grounding in Git-based collaboration and practical software delivery.',
            ],
            stack: ['Git', 'Front-end Development', 'Data Science', 'Databases', 'Java', 'C++'],
          },
        ],
      },
    ],
  },
]

const parseMonthValue = (value) => {
  if (!value) {
    return 0
  }

  const [year, month = '01'] = value.split('-')
  return Number(year) * 12 + Number(month)
}

/** Current open role headline for the welcome section, e.g. "Software Engineer @ Learnosity". */
export const getCurrentRoleHeadline = () => {
  const workBranch = timelineBranches.find((branch) => branch.id === 'work')
  if (!workBranch) {
    return null
  }

  const openRoles = workBranch.entries.flatMap((entry) =>
    (entry.roles || [])
      .filter((role) => !role.end)
      .map((role) => ({ role, organization: entry.organization })),
  )

  if (!openRoles.length) {
    return null
  }

  openRoles.sort(
    (left, right) => parseMonthValue(right.role.start) - parseMonthValue(left.role.start),
  )

  const { role, organization } = openRoles[0]
  return `${role.title} @ ${organization}`
}
