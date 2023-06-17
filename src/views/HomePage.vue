<template>
  <main>
    <WelcomeSection :contacts="contacts" />
    <AboutSection />
    <TimelineSection />
    <ProjectsSection />
    <ContactSection :contacts="contacts" />
  </main>
</template>

<style lang="scss" scoped></style>

<script>
import WelcomeSection from '../components/HomePage/WelcomeSection.vue'
import AboutSection from '../components/HomePage/AboutSection.vue'
import ContactSection from '../components/HomePage/ContactSection.vue'
import TimelineSection from '../components/HomePage/TimelineSection.vue'
import ProjectsSection from '../components/HomePage/ProjectsSection.vue'

export default {
  components: {
    WelcomeSection,
    AboutSection,
    ContactSection,
    TimelineSection,
    ProjectsSection
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
}
</script>
