<template>
  <section id="welcomeSection" ref="welcomeSection">
    <div class="icons">
      <svg xmlns="http://www.w3.org/2000/svg" class="code" viewBox="0 0 640 512">
        <path
          d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="code-branch">
        <path
          d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="terminal">
        <path
          d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="diagram-project">
        <path
          d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z"
        />
      </svg>
    </div>
    <div class="square">
      <h1 v-if="name">{{ name }}</h1>
      <pillComponent v-if="title" :value="title" />
      <span v-if="specialization" class="specialization"
        >Specialized in <b>{{ specialization }}</b></span
      >
    </div>
    <div id="swipe-pill" v-bind:style="{ opacity: computedOpacity }"></div>
  </section>
</template>

<style lang="scss" scope>
@use '@/style/variables' as *;
@use '@/style/mixins' as *;

#welcomeSection {
  text-align: center;
  height: 100vh;

  .square {
    @include backgroundBlur();
    @include boxShadow();
    padding: 4em;
    border-radius: $rad-2;
    margin: auto;
    h1 {
      font-size: clamp(3rem, 1rem + 2vw, 5rem);
      margin: 0;
      color: $acc-2;
    }
  }
  #swipe-pill {
    @include boxShadow();
    animation: pillMovement 2s infinite ease-in-out;
    width: 5em;
    height: 0.4em;
    border-radius: $rad-1;
    background-color: $bg-dark;
    position: fixed;
    bottom: 1em;
  }
  .icons {
    svg {
      height: 1.7em;
      fill: $acc-2;
      position: absolute;
      transform: translateX(-50%);
      animation: svgScale 2s infinite;

      &.code {
        top: 20vh;
        left: 30%;
        transform: rotate(-30deg);
      }
      &.code-branch {
        top: 25vh;
        right: 20%;
        transform: rotate(30deg);
      }
      &.terminal {
        top: 40vh;
        left: 15%;
        transform: rotate(-30deg);
      }
      &.diagram-project {
        top: 45vh;
        right: 20%;
        transform: rotate(-30deg);
      }
    }
  }
}
</style>

<script>
import { ref, onUnmounted, computed, onMounted } from 'vue'
import pillComponent from '../temp/pillComponent.vue'

export default {
  components: {
    pillComponent,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
  },
  setup() {
    const welcomeSection = ref(null)
    const scrollY = ref(1)

    const handleScroll = () => {
      const rect = welcomeSection.value.getBoundingClientRect()
      const outOfView = rect.top < 0 ? -rect.top : 0
      const height = rect.height
      const scrolledOutPercentage = outOfView / height

      scrollY.value = scrolledOutPercentage > 0.2 ? 0 : 1 - scrolledOutPercentage / 0.2
    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const computedOpacity = computed(() => scrollY.value)

    return {
      welcomeSection,
      computedOpacity,
    }
  },
}
</script>
