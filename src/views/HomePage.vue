<template>
  <main>
    <WelcomeSection :contacts="contacts" />
    <AboutSection />
    <LanguagesSectionVue :languages="languages" />
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

import LanguagesSectionVue from '../components/HomePage/LanguagesSection.vue'

import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { firestore } from '@/firebase/init'

export default {
  components: {
    WelcomeSection,
    AboutSection,
    ContactSection,
    ExperienceSection,
    ProjectsSection,
    LanguagesSectionVue
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
  },
  data() {
    return {
      languages: [
        {
          name: 'CSS',
          color: '#264de4',
          href: ''
        },
        {
          name: 'HTML',
          color: '#e34c26',
          href: ''
        },
        {
          name: 'PHP',
          color: '#777bb3',
          href: ''
        },
        {
          name: 'JAVA',
          color: '#f89820',
          href: ''
        },
        {
          name: 'JavaScript',
          color: '#f0db4f',
          href: ''
        },
        {
          name: 'Python',
          color: '#3776ab',
          href: ''
        },
        {
          name: 'Neural Networks',
          color: '#ff6f00',
          href: ''
        },
        {
          name: 'MySQL',
          color: '#4479a1',
          href: ''
        },
        {
          name: 'Vue.js',
          color: '#41b883',
          href: ''
        },
        {
          name: 'Laravel',
          color: '#ff2d20',
          href: ''
        },
        {
          name: 'SASS',
          color: '#cc6699',
          href: ''
        }
      ]
    }
  }
}
</script>
