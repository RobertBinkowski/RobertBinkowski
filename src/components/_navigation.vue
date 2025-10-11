<template>
  <div id="navigation-bar">
    <nav :class="[openNav ? 'nav-open' : 'nav-closed']">
      <!-- Logo -->
      <div class="left-corner">
        <router-link :to="{ name: 'portfolio' }">
          <LogoSVG />
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="nav-content">
        <router-link class="router-link" :to="{ name: 'portfolio' }"> PORTFOLIO </router-link>
        <!-- <router-link class="router-link" :to="{ name: 'articles.index' }"> ARTICLES </router-link>
        <router-link class="router-link" :to="{ name: 'projects.index' }"> PROJECTS </router-link> -->
        <!-- <router-link v-if="user" class="router-link" :to="{ name: 'dashboard' }">
          DASHBOARD
        </router-link> -->
        <!-- Progress Bar -->
        <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
      </div>

      <div class="right-corner">
        <linkComponent v-for="link in links" :key="link.id" :link="link"></linkComponent>
        <!-- Authenticated User Component -->
        <userComponent v-if="user" :user="user" @logout="logout"></userComponent>
      </div>

      <!-- Navigation Hamburger -->
      <div
        id="expand-notification"
        @click="openNavigation()"
        :class="[openNav ? 'nav-opened' : 'nav-closed']"
      >
        <svg viewBox="0 0 32 32">
          <path
            class="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path class="line" d="M7 16 27 16"></path>
        </svg>
      </div>
    </nav>
  </div>
</template>

<script>
import LogoSVG from '@/icons/LogoSVG.vue'
import linkComponent from './linkComponent.vue'
import tagComponent from './tagComponent.vue'
import userComponent from './userComponent.vue'

export default {
  name: 'navigationView',
  components: {
    LogoSVG,
    linkComponent,
    tagComponent,
    userComponent,
  },
  props: {
    links: {
      type: Array,
      required: false,
    },
    user: {
      type: Object,
      required: false,
    },
  },
  computed: {
    currentPageTitle() {
      return this.$route.meta.title || false
    },
    inBeta() {
      return this.$route.meta.beta || false
    },
  },
  data() {
    return {
      progressBarWidth: '0%',
      openNav: false,
      betaTag: {
        name: 'BETA',
        color: '#1792df',
      },
    }
  },
  mounted() {
    // Listener for Progress bar
    window.addEventListener('scroll', this.updateProgressBar)

    this.checkScreenWidth()
    window.addEventListener('resize', this.checkScreenWidth)
  },
  beforeUnmount() {
    // Listener for
    window.removeEventListener('scroll', this.updateProgressBar)

    window.removeEventListener('resize', this.checkScreenWidth)
  },
  methods: {
    updateProgressBar() {
      const main = document.querySelector('main')
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      let progress = (scrollTop / (main.offsetHeight - window.innerHeight)) * 100

      progress = Math.min(progress, 100)

      this.progressBarWidth = `${progress}%`
    },
    openNavigation() {
      this.openNav = !this.openNav
    },
    checkScreenWidth() {
      const currentScreenWidth = window.innerWidth
      if (currentScreenWidth > this.prevScreenWidth) {
        this.openNav = false
      }
      this.prevScreenWidth = currentScreenWidth
    },
    logout() {
      this.$emit('logout')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/style/variables';
@import '@/style/mixins';

#navigation-bar {
  z-index: 1000;

  top: 0;
  left: 0;
  right: 0;

  position: fixed;
  transition: $tr-s;

  nav {
    width: 100%;
    max-width: 1300px;
    display: flex;
    align-items: center;

    transition: $tr-s;

    .left-corner {
      display: flex;
      flex-direction: row;
      a {
        margin: 1em;
        .svg {
          stroke: $txt;
          height: 2.2rem;
          stroke-width: 1.2;

          &:hover {
            stroke-width: 1.7;
          }
        }
      }
      #beta {
        rotate: -20deg;
        margin: 1.3em 0 0 -1em;
        margin-left: 0.01em;
        padding: 0.1em 0.3em;
        background-color: $acc-1;
        border-radius: $rad-2;
        color: $txt-light;
      }
    }

    .nav-content {
      display: flex;
      border-radius: 2em;

      .router-link {
        margin: 0.5em;
        padding: 0.5em 1em;
        border-radius: 2em;
        transition: $tr-s ease-in-out;

        &.router-link-active {
          background-color: $acc-1;
          color: $txt-light;
          box-shadow:
            -4px -2px 16px 0px #ffffff,
            4px 2px 16px 0px $acc-1;
          border-radius: 2em;
        }
        &:hover {
          color: $txt-light;
        }
        &:active {
          box-shadow: none;
        }
      }
      .progress-bar {
        height: 0.25em;
        border-radius: $rad-1;
        position: fixed;
        bottom: 0;
        left: 0;
        background: $txt;
      }
    }
    .right-corner {
      display: flex;
      flex-direction: row;
      text-align: centre;
      div {
        padding: 0.5em;
      }
    }

    #expand-notification {
      position: fixed;
      right: 1em;
      top: 0.5em;
      cursor: pointer;
      transition: right $tr-f;

      svg {
        height: 3em;
        transition: transform 750ms cubic-bezier(0.4, 0, 0.2, 1);

        .line {
          fill: none;
          stroke: $txt;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 2;
          transition:
            stroke-dasharray 750ms cubic-bezier(0.4, 0, 0.2, 1),
            stroke-dashoffset 750ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .line-top-bottom {
          stroke-dasharray: 12 63;
        }
      }

      &.nav-opened svg {
        transform: rotate(-45deg);
      }

      &.nav-opened .line-top-bottom {
        stroke-dasharray: 20 300;
        stroke-dashoffset: -32.42;
      }

      &.nav-closed:hover {
        .line-top-bottom {
          stroke-dasharray: 15 55;
        }
      }
    }

    &.nav-closed {
      height: 4em;
    }

    &.nav-open {
      height: 100vh;
    }
  }
}
/*-------------------------------------------------------BIG*/
@media only screen and (min-width: 768px) {
  #navigation-bar {
    nav {
      margin: 0 auto;
      border-radius: $rad-2;
      justify-content: space-around;

      .nav-content {
        flex-direction: row;
        align-items: center;

        @include boxShadow();
        @include backgroundBlur();
        overflow: hidden;
      }

      #expand-notification {
        display: none;
      }
    }
  }
}

/*-----------------------------------------------------SMALL*/
@media only screen and (max-width: 767px) {
  #navigation-bar {
    nav {
      flex-direction: column;
      overflow: hidden;

      @include boxShadow();
      @include backgroundBlur();

      .left-corner {
        display: flex;
        flex-direction: row;
        width: 100%;
        text-align: start;
      }
      .nav-content {
        flex-direction: column;
        width: 100%;
        margin: 1.5em 0 3em 0;

        a {
          text-align: center;
          padding: 1em;
        }
      }

      .right-corner {
        margin: 0;
      }
    }
  }
}
</style>
