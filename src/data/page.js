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

export function getHomePageContext(overrides = {}) {
  return {
    user: { ...user, ...overrides.user },
    portfolio: { ...portfolio, ...overrides.portfolio },
    contacts: overrides.contacts ?? contacts,
  }
}
