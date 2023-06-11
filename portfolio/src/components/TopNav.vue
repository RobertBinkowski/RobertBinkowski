<template>
  <header>
    <nav :id="[openNav ? 'nav-open' : 'nav-closed']">
      <!-- Logo -->
      <div class="left-corner">
        <a href="/">
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
      <div class="right-corner" v-show="false">
        <a class="button">Sign In</a>
      </div>
      <!-- End Extra Features -->
      <div
        id="expand-notification"
        @click="openNavigation()"
        :class="[openNav ? 'nav-opened' : 'nav-closed']"
      >
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
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
  background-color: $nav-bg;
  backdrop-filter: blur(15px);

  nav {
    width: 100vw;
    padding: 0 1em 0 1em;
    max-width: 1300px;
    display: flex;
    align-items: center;
    padding-bottom: 3px;
    transition: height $tr-s;

    .route-active {
      background-color: $acc-1;
    }

    .left-corner {
      .svg {
        height: 2.2rem;
        stroke-width: 1.2;
        &:hover {
          stroke-width: 1.7;
        }
      }
    }
    i {
      padding: 0.5em;
    }
    .nav-content {
      padding-right: 1em;
    }
    .right-corner {
    }
    #expand-notification {
      position: absolute;
      top: 1em;
      right: 2.5em;
      cursor: pointer;

      .line {
        display: block;
        height: 0.16rem;
        width: 2.1rem;
        margin: 0.4rem;
        border-radius: $rad-1;
        background-color: $acc-1-d;
        transition: $tr-s;
      }

      &:hover {
        .mid {
          margin-left: 0.8rem;
          width: 1.5rem;
        }
        .bot {
          margin-left: 1.05rem;
          width: 1rem;
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
      background: $acc-2-d;
      background: linear-gradient(90deg, $acc-2-d 0%, $acc-1-d 100%);
      border-radius: $rad-1;
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
