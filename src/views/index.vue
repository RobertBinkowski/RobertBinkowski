<template>
  <WelcomeSection
    v-if="portfolio.WelcomeSection"
    :name="user.name"
    :title="user.title"
    :specialization="user.specialization"
  />
  <AboutSection v-if="portfolio.AboutSection" :bio="user.bio" />
  <SkillsSection v-if="portfolio.SkillsSection" :skills="user.skills" />
  <!-- <ProjectsSection v-if="portfolio.ProjectsSection" />
  <ExperienceSection v-if="portfolio.ExperienceSection" /> -->
  <ContactSection v-if="portfolio.ContactSection" :contacts="contacts" />
</template>

<script>
import WelcomeSection from '@/layouts/01.WelcomeSection.vue'
import AboutSection from '@/layouts/About/AboutSection.vue'
import ContactSection from '@/layouts/06.ContactSection.vue'
// import ExperienceSection from '@/layouts/Experiences/ExperienceSection.vue'
// import ProjectsSection from '@/layouts/Projects/ProjectsSection.vue'

import SkillsSection from '@/layouts/03.SkillsSection.vue'

export default {
  components: {
    WelcomeSection,
    SkillsSection,
    AboutSection,
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
      user: {
        name: 'Robert Binkowski',
        title: 'Full Stack Developer | Software Developer',
        specialization: 'Back-End Development',
        // bio: [
        //   `<p>I am a backend-leaning full stack developer with a passion for crafting reliable digital products. My day-to-day mixes modern PHP (Laravel), Vue/Vite front-ends, and the infrastructure glue that keeps deployments safe.</p>`,
        //   `<p>I care about maintainable architecture, clear documentation, and helping teams move fastest when the work really matters.</p>`,
        // ].join(''),
        bio: '',
        skills: [
          {
            name: 'PHP',
            color: '#777BB4',
            years: 5,
            level: 'Production-grade',
          },
          {
            name: 'Laravel',
            color: '#FF2D20',
            years: 4,
            level: 'Production-grade',
          },
          {
            name: 'Vue & Vite',
            color: '#42B883',
            years: 1,
            level: 'Working knowledge',
          },
          {
            name: 'JavaScript',
            color: '#F7DF1E',
            years: 1,
            level: 'Working knowledge',
          },
          {
            name: 'Java',
            color: '#007396',
            years: 2,
            level: 'Comfortable',
          },
          {
            name: 'AWS',
            color: '#FF9900',
            years: 1,
            level: 'Comfortable',
          },
          {
            name: 'CI/CD & GitHub Actions',
            color: '#2088FF',
            years: 0.5,
            level: 'Hands-on',
          },
          {
            name: 'MySQL',
            color: '#4479A1',
            years: 3,
            level: 'Deep experience',
          },
          {
            name: 'Liquibase',
            color: '#4B7DBC',
            years: 2,
            level: 'Production-ready',
          },
          {
            name: 'C++',
            color: '#00599C',
            years: 0.5,
            level: 'Foundational',
          },
          {
            name: 'Git',
            color: '#F05033',
            years: 3,
            level: 'Daily driver',
          },
        ],
      },
      portfolio: {
        WelcomeSection: true,
        AboutSection: true,
        SkillsSection: true,
        ExperienceSection: false,
        ProjectsSection: false,
        ContactSection: true,
      },
    }
  },
}
</script>
