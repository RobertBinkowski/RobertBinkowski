<template>
  <div id="app">
    <main>
    <TopNav />
    <WelcomePage />
    <AboutSection />
    <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import FooterBar from './components/FooterBar.vue';

import WelcomePage from './views/WelcomePage.vue';
import AboutSection from './views/AboutSection.vue';
import ContactSection from './views/ContactSection.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav,

    WelcomePage,
    AboutSection,
    ContactSection
  },
};
</script>

<style lang="scss">
@import 'assets/scss/root';
main{
  min-height: 100vh;
}
</style>