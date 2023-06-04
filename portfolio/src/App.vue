<template>
  <div>
    <TopNav :links="links" :contacts="contacts" :features="features" />
    <router-view></router-view>
    <FooterBar :contacts="contacts" />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav
  },
  data() {
    return {
      contacts: {
        email: {
          enabled: true,
          name: 'Email',
          value: 'binkowski95@gmail.com',
          icon: 'fa-solid fa-envelope-open',
          link: 'mailto:binkowski95@gmail.com'
        },
        github: {
          enabled: true,
          name: 'GitHub',
          value: 'RobertBinkowski',
          icon: 'fa-brands fa-github',
          link: 'https://github.com/RobertBinkowski'
        },
        linkedin: {
          enabled: true,
          name: 'LinkedIn',
          value: 'RobertBinkowski',
          icon: 'fa-brands fa-linkedin',
          link: 'https://www.linkedin.com/in/robert-binkowski-9bb565195/'
        },
        instagram: {
          enabled: false,
          name: 'Instagram',
          value: 'binkowski95',
          icon: 'fa-brands fa-instagram',
          link: 'https://www.instagram.com/binkowski95/'
        }
      },
      links: [
        {
          enabled: true,
          button: false,
          link: '/',
          ico: 'fa-solid fa-house-chimney',
          name: 'Home'
        },
        {
          enabled: true,
          button: false,
          link: '/timeline',
          ico: 'fa-solid fa-timeline',
          name: 'Timeline'
        },
        {
          enabled: true,
          button: true,
          link: '/about',
          ico: 'fa-solid fa-address-card',
          name: 'About'
        }
      ],
      features: {
        DarkMode: {
          enabled: true,
          button: true,
          link: '',
          ico: 'fa-solid fa-moon',
          name: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import 'assets/scss/root';
#app {
  left: 0;
  right: 0;
  width: 100vw;
  margin-top: -1em;
}
</style>
