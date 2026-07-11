<template>
  <span class="logo" v-html="logoMarkup" aria-hidden="true" />
</template>

<script>
import logoMarkup from '@/assets/icons/My Logo.svg?raw'

export default {
  name: 'LogoSVG',
  data() {
    return {
      logoMarkup,
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  :deep(svg) {
    height: 2.5em;
    width: auto;
  }

  :deep(path) {
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 1;
    stroke-linejoin: round;
    stroke-linecap: round;
    paint-order: stroke fill;
  }
}
</style>
