<template>
  <WelcomeSection v-if="portfolio.WelcomeSection" :name="user.name" :title="user.title" />
  <AboutSection v-if="portfolio.AboutSection" :bio="user.bio" />
  <SkillsSection v-if="portfolio.SkillsSection" :skills="user.skills" />
  <TimelineSection
    v-if="portfolio.TimelineSection"
    :main-branch="timelineMain"
    :branches="timelineBranches"
  />
  <!-- <ProjectsSection v-if="portfolio.ProjectsSection" />
  <ExperienceSection v-if="portfolio.ExperienceSection" /> -->
  <ContactSection v-if="portfolio.ContactSection" :contacts="contacts" />
</template>

<script>
import WelcomeSection from '@/layouts/01.WelcomeSection.vue'
import AboutSection from '@/layouts/About/AboutSection.vue'
import ContactSection from '@/layouts/06.ContactSection.vue'
import TimelineSection from '@/layouts/Timeline/TimelineSection.vue'
// import ExperienceSection from '@/layouts/Experiences/ExperienceSection.vue'
// import ProjectsSection from '@/layouts/Projects/ProjectsSection.vue'

import SkillsSection from '@/layouts/03.SkillsSection.vue'
import { timelineBranches, timelineMain, getCurrentRoleHeadline } from '@/data/timeline'
import { featuredSkills } from '@/data/skills'

export default {
  name: 'HomeView',
  components: {
    WelcomeSection,
    SkillsSection,
    AboutSection,
    TimelineSection,
    ContactSection,
    // ExperienceSection,
    // ProjectsSection,
  },
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      timelineMain,
      timelineBranches,
      user: {
        name: 'Robert Binkowski',
        title: getCurrentRoleHeadline() ?? 'Software Developer',
        // bio: [
        //   `<p>I am a backend-leaning full stack developer with a passion for crafting reliable digital products. My day-to-day mixes modern PHP (Laravel), Vue/Vite front-ends, and the infrastructure glue that keeps deployments safe.</p>`,
        //   `<p>I care about maintainable architecture, clear documentation, and helping teams move fastest when the work really matters.</p>`,
        // ].join(''),
        bio: '',
        // Defined once in src/data/skills.js and shared with the timeline.
        skills: featuredSkills,
      },
      portfolio: {
        WelcomeSection: true,
        AboutSection: true,
        SkillsSection: true,
        TimelineSection: true,
        ExperienceSection: false,
        ProjectsSection: false,
        ContactSection: true,
      },
    }
  },
}
</script>
