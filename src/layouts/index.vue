<template>
  <div>
    <WelcomeSection
      v-if="portfolio.WelcomeSection"
      :name="user.name"
      :title="user.title"
      :specialization="user.specialization"
    />
    <AboutSection v-if="portfolio.AboutSection" :bio="user.bio" />
    <!-- <LanguagesSectionVue v-if="portfolio.LanguagesSection" /> -->
    <ProjectsSection v-if="portfolio.ProjectsSection" />
    <ExperienceSection v-if="portfolio.ExperienceSection" />
    <ContactSection v-if="portfolio.ContactSection" :contacts="contacts" />
  </div>
</template>

<style lang="scss" scoped>
div * {
  padding: 2em 0;
}
</style>

<script>
import WelcomeSection from './Welcome/WelcomeSection.vue'
import AboutSection from './About/AboutSection.vue'
import ContactSection from './Contacts/ContactSection.vue'
import ExperienceSection from './Experiences/ExperienceSection.vue'
import ProjectsSection from './Projects/ProjectsSection.vue'

// import LanguagesSectionVue from './Languages/LanguagesSection.vue'

export default {
  components: {
    WelcomeSection,
    AboutSection,
    ContactSection,
    ExperienceSection,
    ProjectsSection,
    // LanguagesSectionVue,
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
        bio: "Hello! I'm a seasoned software developer with a deep passion for crafting efficient, scalable solutions that drive innovation and operational excellence. With a solid foundation in PHP and a specialization in back-end development, I've honed my skills in a diverse tech landscape.<br/><br/>My journey in the tech world is marked by a continuous quest for learning and improvement. I pride myself on being a full-stack developer, capable of bridging the gap between complex back-end logic and intuitive front-end designs. My toolkit is a blend of traditional and modern technologies, including Liquibase (MySQL) for database version control, the elegance of HTML, CSS, SCSS, and SASS for styling, and the robustness of PHP and Laravel for server-side development.<br/><br/>I thrive on the challenges that come with integrating various technologies. My work with GraphQL has allowed me to streamline data queries and mutations, making applications more efficient and user-friendly. On the front end, Vue.js has been my go-to framework for building reactive, engaging user interfaces. Beyond the web, my programming skills extend to Java and JavaScript, enabling me to develop versatile applications that meet diverse user needs.<br/><br/>Python holds a special place in my toolkit. Its simplicity and power have enabled me to explore the realms of machine learning, adding a layer of intelligence to applications. Whether it's analyzing data, or building predictive models.<br/><br/>I'm also adept at creating and integrating RESTful APIs, ensuring seamless communication between different software components. This skill has been crucial in my role as a full-stack developer, enabling me to ensure that the front-end and back-end of applications work in harmony.<br/><br/>In the ever-evolving tech landscape, I remain committed to staying at the forefront of technology, continuously exploring new tools and methodologies to improve my craft. Whether working on a team project or developing personal projects, I bring a blend of creativity, technical expertise, and a collaborative spirit to the table.",
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
