<template>
  <section id="welcomeSection" ref="welcomeSection">
    <div class="icons" aria-hidden="true">
      <div
        v-for="icon in floatingIcons"
        :key="icon.id"
        class="float-icon"
        :style="{
          left: icon.x,
          top: icon.y,
          '--duration': `${icon.duration}s`,
          '--delay': `${icon.delay}s`,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="icon.viewBox"
          :style="{ transform: `rotate(${icon.rotate}deg)` }"
        >
          <path :d="icon.path" />
        </svg>
      </div>
    </div>
    <div class="square">
      <h1 v-if="name">{{ name }}</h1>
      <pillComponent v-if="title" :value="title" />
    </div>
    <div id="swipe-pill" v-bind:style="{ opacity: computedOpacity }"></div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/style/variables' as *;
@use '@/style/mixins' as *;

#welcomeSection {
  position: relative;
  text-align: center;
  height: 100vh;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  .square {
    position: relative;
    z-index: 1;
    @include backgroundBlur();
    @include boxShadow();
    padding: clamp(1.25em, 5vw, 4em);
    border-radius: $rad-2;
    margin: auto;
    max-width: calc(100% - 2em);
    box-sizing: border-box;
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
    z-index: 2;
  }

  .icons {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .float-icon {
    position: absolute;
    animation: iconDrift var(--duration, 14s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
    will-change: transform;

    svg {
      display: block;
      height: var(--icon-size, 1.6em);
      width: auto;
      fill: $acc-2;
      opacity: 1;
    }
  }

  @keyframes iconDrift {
    0%,
    100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(14px, -22px);
    }
    50% {
      transform: translate(-10px, 12px);
    }
    75% {
      transform: translate(12px, 18px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .float-icon {
      animation: none;
    }

    #swipe-pill {
      animation: none;
    }
  }
}
</style>

<script>
import { ref, onUnmounted, computed, onMounted } from 'vue'
import pillComponent from '../temp/pillComponent.vue'

const floatingIcons = [
  {
    id: 'code',
    viewBox: '0 0 640 512',
    path: 'M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z',
    x: '28%',
    y: '18vh',
    rotate: -28,
    duration: 16,
    delay: 0,
  },
  {
    id: 'code-branch',
    viewBox: '0 0 448 512',
    path: 'M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z',
    x: '78%',
    y: '22vh',
    rotate: 24,
    duration: 19,
    delay: 1.2,
  },
  {
    id: 'terminal',
    viewBox: '0 0 576 512',
    path: 'M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
    x: '12%',
    y: '38vh',
    rotate: -18,
    duration: 14,
    delay: 0.6,
  },
  {
    id: 'diagram-project',
    viewBox: '0 0 576 512',
    path: 'M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48V96H384V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H432c-26.5 0-48-21.5-48-48V160H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V336c0-1.7 .1-3.4 .3-5L144 224H48c-26.5 0-48-21.5-48-48V80z',
    x: '86%',
    y: '42vh',
    rotate: 16,
    duration: 17,
    delay: 2.4,
  },
  {
    id: 'database',
    viewBox: '0 0 448 512',
    path: 'M448 80v48c0 44.1-100.3 80-224 80S0 172.1 0 128V80C0 35.9 100.3 0 224 0S448 35.9 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.1-100.3 80-224 80S0 332.1 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.4 205.4 159.6 224 224 224s124.6-18.6 169.2-49.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.4 364.4 159.6 384 224 384s124.6-19.6 169.2-49.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.1-100.3 80-224 80S0 476.1 0 432V346.1z',
    x: '22%',
    y: '58vh',
    rotate: -12,
    duration: 21,
    delay: 3,
  },
  {
    id: 'code-merge',
    viewBox: '0 0 576 512',
    path: 'M120.1 256C120.1 253.1 121.7 250.4 124 248.9L196 200.9C200.5 197.9 206.5 199.1 209.5 203.6C212.5 208.1 211.3 214.1 206.8 217.1L151.8 254.1L368 254.1C373.5 254.1 378 258.6 378 264.1C378 269.6 373.5 274.1 368 274.1L151.8 274.1L206.8 311.1C211.3 314.1 212.5 320.1 209.5 324.6C206.5 329.1 200.5 330.3 196 327.3L124 279.3C121.7 277.8 120.1 275.1 120.1 272.1L120.1 256zM432 160L368 160C362.5 160 358 155.5 358 150C358 144.5 362.5 140 368 140L432 140C458.5 140 480 161.5 480 188L480 244.1C480 249.6 475.5 254.1 470 254.1C464.5 254.1 460 249.6 460 244.1L460 188C460 172.6 447.4 160 432 160zM368 384L432 384C447.4 384 460 371.4 460 356L460 299.9C460 294.4 464.5 289.9 470 289.9C475.5 289.9 480 294.4 480 299.9L480 356C480 382.5 458.5 404 432 404L368 404C362.5 404 358 399.5 358 394C358 388.5 362.5 384 368 384z',
    x: '72%',
    y: '62vh',
    rotate: 8,
    duration: 18,
    delay: 1.8,
  },
  {
    id: 'server',
    viewBox: '0 0 512 512',
    path: 'M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zM176 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm0 256a32 32 0 1 0 0-64 32 32 0 1 0 0 64z',
    x: '90%',
    y: '72vh',
    rotate: -20,
    duration: 15,
    delay: 0.3,
  },
  {
    id: 'laptop-code',
    viewBox: '0 0 640 512',
    path: 'M64 96C64 60.7 92.7 32 128 32H512c35.3 0 64 28.7 64 64V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2 0 9.7-7.2 18-16.8 19.2l-31.8 4.5c-7.9 1.1-14.2 7.2-15.7 15.1C572.9 463.2 551.2 480 526.4 480H113.6c-24.8 0-46.5-16.8-49.3-39.9-1.5-7.9-7.8-14-15.7-15.1L16.8 422.4C7.2 421.2 0 412.9 0 403.2zM392.8 184.4c-4.9 17-22 27.5-39.6 22.6l-96-27.6c-17-4.9-27.5-22-22.6-39.6l8.4-29.1c4.9-17 22-27.5 39.6-22.6l96 27.6c17 4.9 27.5 22 22.6 39.6l-8.4 29.1z',
    x: '8%',
    y: '72vh',
    rotate: 14,
    duration: 20,
    delay: 2.8,
  },
  {
    id: 'brackets-curly',
    viewBox: '0 0 448 512',
    path: 'M0 216C0 149.1 54.1 94 121 94H169.1C181.8 94 192 104.2 192 116.9C192 129.6 181.8 139.8 169.1 139.8H121C79.7 139.8 46.2 173.3 46.2 214.6V297.4C46.2 338.7 79.7 372.2 121 372.2H169.1C181.8 372.2 192 382.4 192 395.1C192 407.8 181.8 418 169.1 418H121C54.1 418 0 362.9 0 296V216zM448 296C448 362.9 393.9 418 327 418H278.9C266.2 418 256 407.8 256 395.1C256 382.4 266.2 372.2 278.9 372.2H327C368.3 372.2 401.8 338.7 401.8 297.4V214.6C401.8 173.3 368.3 139.8 327 139.8H278.9C266.2 139.8 256 129.6 256 116.9C256 104.2 266.2 94 278.9 94H327C393.9 94 448 149.1 448 216V296z',
    x: '48%',
    y: '12vh',
    rotate: -8,
    duration: 13,
    delay: 1.5,
  },
  {
    id: 'bug',
    viewBox: '0 0 512 512',
    path: 'M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128v32c0 17.7 14.3 32 32 32h16.9c7.5 45.1 39.3 81.4 83.1 94.4V480c0 17.7 14.3 32 32 32s32-14.3 32-32V318.4c13-3.5 25.2-9.2 36.4-16.7l41 41c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-41-41c7.5-11.2 13.2-23.4 16.7-36.4H384c17.7 0 32-14.3 32-32V128c0-35.3-28.7-64-64-64H410.5C397.4 26.7 361.8 0 320 0H192zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
    x: '58%',
    y: '78vh',
    rotate: 22,
    duration: 22,
    delay: 0.9,
  },
  {
    id: 'layer-group',
    viewBox: '0 0 576 512',
    path: 'M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.7C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.9 32 265.4 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 99.8l152 70.2 53.2-24.6c8.5-3.9 13.9-12.4 13.9-21.8s-5.4-17.9-13.9-21.8l-218.6-101c-14.9-6.9-32.1-6.9-47 0l-218.6 101c-8.5 3.9-13.9 12.4-13.9 21.8s5.4 17.9 13.9 21.8l53.2 24.6 152-70.2c23.4-10.8 50.4-10.8 73.8 0z',
    x: '38%',
    y: '48vh',
    rotate: -6,
    duration: 24,
    delay: 3.6,
  },
  {
    id: 'hard-drive',
    viewBox: '0 0 576 512',
    path: 'M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM64 96H512v256H64V96zm96 192a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z',
    x: '62%',
    y: '30vh',
    rotate: 10,
    duration: 26,
    delay: 4.2,
  },
]

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
      floatingIcons,
    }
  },
}
</script>
