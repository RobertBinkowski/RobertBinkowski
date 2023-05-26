<template>
  <header>
    <nav :id="[openNav ? 'nav-open' : 'nav-closed']">
      <!-- Logo -->
      <div class="left-corner">
        <a href="/" class="nav-logo">
          <LogoSVG />
        </a>
      </div>
      <!-- End Logo -->
      <!-- Links -->
      <div class="nav-content">
        <ul class="nav-ul">
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.link"
            class="nav-a"
            target="_self"
            v-show="link.enabled"
          >
            <li class="nav-li">
              <div :class="nav - item">
                <p v-show="link.name">
                  <i v-show="link.ico" :class="link.ico"></i>
                  {{ link.name }}
                </p>
              </div>
            </li>
          </a>
        </ul>
      </div>
      <!-- End Links -->
      <!-- Extra Features -->
      <div class="right-corner" v-show="true">
        <a class="button">Sign In</a>
      </div>
      <!-- End Extra Features -->
      <div id="expand-notification" @click="openNavigation()">
        <span class="line top"></span>
        <span class="line mid"></span>
        <span class="line bot"></span>
      </div>
      <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables';
@import '../assets/scss/mixins';

header {
  left: 0;
  right: 0;
  z-index: 1000;
  position: fixed;

  nav {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
    width: 100vw;
    max-width: 1300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3px;
    transition: height $tr-s;

    .route-active {
      background-color: $acc-1;
    }

    .left-corner {
      padding: 1rem;
      .svg {
        position: absolute;
        top: 1rem;
        left: 1em;
        height: 2.2rem;
        stroke-width: 1.2;
      }
    }
    ul {
      // display: flex;
      i {
        padding: 0.3em;
      }
    }
    .right-corner {
      padding-right: 2em;
    }
    #expand-notification {
      position: absolute;
      top: 1em;
      right: 2em;
      cursor: pointer;

      .line {
        display: block;
        height: 2px;
        width: 2em;
        margin: 5px;
        border-radius: $rad-1;
        background-color: $acc-1;
        transition: $tr-s;
      }

      &:hover {
        .mid {
          width: 1.5em;
        }
        .bot {
          width: 1em;
        }
      }
    }
    &#nav-closed {
      height: 4em;
    }
    &#nav-open {
      height: 100vh;
    }
    .progress-bar {
      height: 3px;
      background-color: $acc-2;
      position: absolute;
      bottom: 0;
      left: 0;
      box-shadow: 0 0 1rem 0 $acc-2;
    }
  }
}
</style>

<script>
import LogoSVG from '../assets/icons/LogoSVG.vue'

export default {
  components: {
    LogoSVG
  },
  props: {
    links: {
      required: true
    },
    features: {
      required: true
    }
  },
  data() {
    return {
      progressBarWidth: '0%',
      openNav: false
    }
  },
  mounted() {
    // Listener for Progress bar
    window.addEventListener('scroll', this.updateProgressBar)

    this.checkScreenWidth()
    window.addEventListener('resize', this.checkScreenWidth)
  },
  beforeDestroy() {
    // Listener for
    window.removeEventListener('scroll', this.updateProgressBar)

    window.removeEventListener('resize', this.checkScreenWidth)
  },
  methods: {
    updateProgressBar() {
      const main = document.querySelector('main')
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (main.offsetHeight - window.innerHeight)) * 100
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
    }
  }
}
</script>
