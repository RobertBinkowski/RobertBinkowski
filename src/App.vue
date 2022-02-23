<template>
  <div id="app">
    <div class="main">
    <TopNav />
    <logoSVG />
    <WelcomePage />
    <AboutSection />
    </div>
    <FooterBar />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import FooterBar from './components/FooterBar.vue';
import WelcomePage from './views/WelcomePage.vue';
import AboutSection from './views/AboutSection.vue';
import LogoSVG from './components/LogoSVG.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav,
    WelcomePage,
    AboutSection,
    LogoSVG
  },
};
</script>

<style lang="scss">
@import '@/assets/root.scss';
@import '@/assets/screens.scss';
.main{
  min-height: 100vh;
}
</style>