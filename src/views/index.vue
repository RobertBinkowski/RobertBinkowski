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
import { defineAsyncComponent } from 'vue'
import WelcomeSection from '@/layouts/01.WelcomeSection.vue'

const SkillsSection = defineAsyncComponent(() => import('@/layouts/03.SkillsSection.vue'))
const TimelineSection = defineAsyncComponent(() => import('@/layouts/Timeline/TimelineSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/layouts/06.ContactSection.vue'))
const AboutSection = defineAsyncComponent(() => import('@/layouts/About/AboutSection.vue'))
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
