/**
 * Data-driven smoke expectations for the home page.
 * All asserted content is derived from the same modules the UI renders —
 * change profile / skills / timeline data and expectations follow automatically.
 */
import {
  getExpectedHomeSections,
  getHiddenHomeSections,
  getHomePageContext,
  shell,
} from './home.js'
import { user } from '../data/profile.js'
import { featuredSkills } from '../data/skills.js'
import { getCurrentRoleHeadline, timelineBranches } from '../data/timeline.js'

/** Flatten timeline branches into the entries the UI renders as cards. */
export function getTimelineEntries(branches = timelineBranches) {
  return branches.flatMap((branch) =>
    (branch.entries ?? []).map((entry) => ({
      organization: entry.organization,
      website: entry.website ?? null,
      tagline: entry.tagline ?? null,
      hasLogo: Boolean(entry.logo),
      branchLabel: branch.label,
      roles: (entry.roles ?? []).map((role) => ({
        id: role.id,
        title: role.title,
      })),
    })),
  )
}

/** Full smoke contract derived from live app configuration + content data. */
export function getSmokeExpectations(overrides = {}) {
  const context = getHomePageContext(overrides)

  return {
    shell,
    context,
    expectedSections: getExpectedHomeSections(context),
    hiddenSections: getHiddenHomeSections(context),
    welcome: {
      name: context.user.name ?? user.name,
      // Matches index.vue: getCurrentRoleHeadline() ?? profileUser.title
      title: getCurrentRoleHeadline() ?? context.user.title ?? user.title,
    },
    featuredSkillNames: featuredSkills.map((skill) => skill.name),
    timelineEntries: getTimelineEntries(),
    contacts: context.contacts,
  }
}

export { shell }
