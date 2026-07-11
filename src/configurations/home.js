import { contacts, user } from '../data/profile.js'

/** Which home page sections are enabled. Toggle a section off without removing its component. */
export const portfolio = {
  WelcomeSection: true,
  AboutSection: false,
  SkillsSection: true,
  TimelineSection: true,
  ContactSection: true,
}

/** DOM selectors for the app shell — used by smoke tests. */
export const shell = {
  appRoot: '.app-shell',
  navigation: '#navigation-bar',
  footer: 'footer',
}

/** Section selectors and visibility rules — shared by the smoke test. */
export const homeSections = [
  {
    key: 'welcome',
    selector: '#welcomeSection',
    visibleWhen: ({ portfolio: sections }) => sections.WelcomeSection,
  },
  {
    key: 'about',
    selector: '#aboutSection',
    visibleWhen: ({ portfolio: sections }) => sections.AboutSection,
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
