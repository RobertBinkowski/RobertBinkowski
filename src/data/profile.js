import linkedinBackground from '@/assets/bento/linkedin-bg.webp'
import githubBackground from '@/assets/bento/github-bg.webp'
import stravaBackground from '@/assets/bento/strava-bg.webp'
import githubPortrait from '@/assets/bento/github-avatar.jpg'

/** Personal details and contact links shown across the site. */
export const user = {
  name: 'Robert Binkowski',
  title: 'Software Developer',
  bio: '',
}

/**
 * Contact links used in the nav, footer, and the bento grid at the bottom
 * of the page. Extra bento fields (tagline, stats, detail, background) are
 * ignored by the compact icon links.
 *
 * LinkedIn and Strava values are manual snapshots you can edit here.
 * Live API pulls need a tiny backend — both services require OAuth and
 * refuse to expose tokens from a static frontend. GitHub public profile
 * data can be fetched in the browser without a secret if you want it live.
 */
export const contacts = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/robert-binkowski-9bb565195/',
    accent: '#0a66c2',
    size: 'featured',
    tagline: 'Software Engineer @ Learnosity',
    background: linkedinBackground,
    stats: [
      { label: 'Role', value: 'Software Engineer' },
      { label: 'Company', value: 'Learnosity' },
      { label: 'Based in', value: 'Dublin' },
    ],
    detail: 'Assessment APIs and reliable web products — from PHP services to Vue front-ends.',
  },
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/RobertBinkowski',
    accent: '#24292f',
    size: 'compact',
    tagline: 'Public repos and experiments',
    background: githubBackground,
    portrait: githubPortrait,
    stats: [
      { label: 'Repos', value: '1' },
      { label: 'Followers', value: '1' },
      { label: 'Based in', value: 'Ireland' },
    ],
    detail: 'Side projects and the public trail of what I am building.',
  },
  {
    name: 'Strava',
    icon: 'strava',
    link: 'https://www.strava.com/athletes/121422919',
    accent: '#fc4c02',
    size: 'compact',
    tagline: 'Club runs and training',
    background: stravaBackground,
    stats: [
      { label: 'Club', value: 'Run club' },
      { label: 'Sport', value: 'Running' },
      { label: 'Activities', value: 'On Strava' },
    ],
    detail: 'Club miles, long runs, and the odd sunrise session. Join in on Strava.',
  },
]
