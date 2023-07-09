<template>
  <main>
    <WelcomeSection :contacts="contacts" />
    <AboutSection />
    <ProjectsSection :projects="projects" />
    <ExperienceSection :experiences="experiences" />
    <ContactSection :contacts="contacts" />
  </main>
</template>

<style lang="scss" scoped></style>

<script>
import WelcomeSection from '../components/HomePage/WelcomeSection.vue'
import AboutSection from '../components/HomePage/AboutSection.vue'
import ContactSection from '../components/HomePage/ContactSection.vue'
import ExperienceSection from '../components/HomePage/ExperienceSection.vue'
import ProjectsSection from '../components/HomePage/ProjectsSection.vue'

import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { firestore } from '@/firebase/init'

export default {
  components: {
    WelcomeSection,
    AboutSection,
    ContactSection,
    ExperienceSection,
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
    const experiences = ref([])

    onMounted(async () => {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'projects'), where('enabled', '==', true))
      )
      const querySnapshot2 = await getDocs(query(collection(firestore, 'experiences')))
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        projects.value.push(doc.data())
      })
      querySnapshot2.forEach((doc) => {
        // console.log(doc.data())
        experiences.value.push(doc.data())
      })
    })

    return {
      projects,
      experiences
    }
  }
}
</script>
