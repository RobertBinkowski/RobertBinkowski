<template>
  <WelcomeSection v-if="portfolio.WelcomeSection" :name="user.name" :title="user.title" />
  <AboutSection v-if="portfolio.AboutSection" :bio="user.bio" />
  <SkillsSection v-if="portfolio.SkillsSection" :skills="user.skills" />
  <TimelineSection
    v-if="portfolio.TimelineSection"
    :main-branch="timelineMain"
    :branches="timelineBranches"
  />
  <ContactSection v-if="portfolio.ContactSection" :contacts="contacts" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import WelcomeSection from '@/layouts/01.WelcomeSection.vue'
import { timelineBranches, timelineMain, getCurrentRoleHeadline } from '@/data/timeline'
import { featuredSkills } from '@/data/skills'
import { portfolio, user as pageUser } from '@/data/page'

const SkillsSection = defineAsyncComponent(() => import('@/layouts/03.SkillsSection.vue'))
const TimelineSection = defineAsyncComponent(() => import('@/layouts/Timeline/TimelineSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/layouts/06.ContactSection.vue'))
const AboutSection = defineAsyncComponent(() => import('@/layouts/About/AboutSection.vue'))

export default {
  name: 'HomeView',
  components: {
    WelcomeSection,
    SkillsSection,
    AboutSection,
    TimelineSection,
    ContactSection,
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
        name: pageUser.name,
        title: getCurrentRoleHeadline() ?? pageUser.defaultTitle,
        bio: pageUser.bio,
        skills: featuredSkills,
      },
      portfolio,
    }
  },
}
</script>
