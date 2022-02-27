<template>
  <div>
    <main>
    <TopNav />
    <WelcomeSection />
    <AboutSection />
    <ProjectsSection/>
    <ExperienceSection />
    <EducationSection />
    <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import FooterBar from './components/FooterBar.vue';

import WelcomeSection from './views/WelcomeSection.vue';
import AboutSection from './views/AboutSection.vue';
import ContactSection from './views/ContactSection.vue';
import ExperienceSection from './views/ExperienceSection.vue';
import EducationSection from './views/EducationSection.vue';
import ProjectsSection from './views/ProjectsSection.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav,

    WelcomeSection,
    AboutSection,
    ContactSection,
    ExperienceSection,
    ProjectsSection,
    EducationSection
  },
};
</script>

<style lang="scss" scope>
@import 'assets/scss/root';
#app{
  left:0;
  right: 0;
  width: 100vw;
  margin-top: -1em;
}

</style>