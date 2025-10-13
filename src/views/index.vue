<template>
  <WelcomeSection
    v-if="portfolio.WelcomeSection"
    :name="user.name"
    :title="user.title"
    :specialization="user.specialization"
  />
  <AboutSection v-if="portfolio.AboutSection" :bio="user.bio" />
  <LanguagesSectionVue v-if="portfolio.LanguagesSection" :skills="user.skills" />
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

import LanguagesSectionVue from '@/layouts/03.LanguagesSection.vue'

export default {
  components: {
    WelcomeSection,
    LanguagesSectionVue,
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
        bio: '',
        skills: [
          { name: 'CSS', color: '264DE4', exp: '3' },
          { name: 'SCSS', color: 'CD6799', exp: '3' },
          { name: 'Java', color: '007396', exp: '2' },
          { name: 'PHP', color: '777BB4', exp: '5' },
          { name: 'JavaScript', color: 'F7DF1E', exp: '1' },
          { name: 'Laravel', color: 'FF2D20', exp: '4' },
          { name: 'Git', color: 'F05033', exp: '4' },
          { name: 'GitHub', color: '181717', exp: '4' },
        ],
      },
      portfolio: {
        WelcomeSection: true,
        AboutSection: true,
        LanguagesSection: true,
        ExperienceSection: false,
        ProjectsSection: false,
        ContactSection: true,
      },
    }
  },
}
</script>
