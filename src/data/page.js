/** Home page content and which sections should render. Shared by the app and smoke tests. */
export const user = {
  name: 'Robert Binkowski',
  title: 'Software Developer',
}

export const portfolio = {
  WelcomeSection: true,
  AboutSection: true,
  SkillsSection: true,
  TimelineSection: true,
  ContactSection: true,
}

export const contacts = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/robert-binkowski-9bb565195/',
  },
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/RobertBinkowski',
  },
]

export const shell = {
  appRoot: '.app-shell',
  navigation: '#navigation-bar',
  footer: 'footer',
}

export const homeSections = [
  {
    key: 'welcome',
    selector: '#welcomeSection',
    visibleWhen: ({ portfolio: sections }) => sections.WelcomeSection,
  },
  {
    key: 'about',
    selector: '#aboutSection',
    visibleWhen: ({ portfolio: sections, user: profile }) =>
      sections.AboutSection && Boolean(profile.bio),
  },
  {
    key: 'skills',
    selector: '#skills-section',
    visibleWhen: ({ portfolio: sections }) => sections.SkillsSection,
    minCount: [{ selector: '.skill-pill', count: 1 }],
  },
  {
    key: 'timeline',
    selector: '#timelineSection',
    visibleWhen: ({ portfolio: sections }) => sections.TimelineSection,
    minCount: [{ selector: '.timeline-heading', count: 1 }],
  },
  {
    key: 'contact',
    selector: '#contactSection',
    visibleWhen: ({ portfolio: sections }) => sections.ContactSection,
  },
]

export function getHomePageContext(overrides = {}) {
  return {
    user: { ...user, ...overrides.user },
    portfolio: { ...portfolio, ...overrides.portfolio },
    contacts: overrides.contacts ?? contacts,
  }
}

export function getExpectedHomeSections(context = getHomePageContext()) {
  return homeSections.filter((section) => section.visibleWhen(context))
}

export function getHiddenHomeSections(context = getHomePageContext()) {
  return homeSections.filter((section) => !section.visibleWhen(context))
}
