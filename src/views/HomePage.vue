<template>
  <main>
    <WelcomeSection :contacts="contacts" />
    <AboutSection />
    <TimelineSection />
    <ProjectsSection :projects="projects" />
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

import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { firestore } from '@/firebase/init'

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
  },
  setup() {
    const projects = ref([])

    onMounted(async () => {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'projects'), where('enabled', '==', true))
      )
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        projects.value.push(doc.data())
      })
    })

    return {
      projects
    }
  }
}
</script>
