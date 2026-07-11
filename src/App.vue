<template>
  <div class="app-shell">
    <!-- Navigation -->
    <Navigation :contacts="contacts"></Navigation>

    <main>
      <!-- Router Link -->
      <router-view :contacts="contacts" />
    </main>

    <!-- Main Footer -->
    <FooterFile :contacts="contacts"></FooterFile>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.app-shell {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

main {
  max-width: min($max-width, 100%);
  width: 100%;
  margin: auto;
  padding: 0;
  box-sizing: border-box;
  position: relative;

  // Dots background lives on its own layer so the edge fade never touches the
  // content. It extends $dots-extend past the content on each side and only
  // the dots fade out.
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: calc(100% + #{$dots-extend * 2});
    transform: translateX(-50%);
    z-index: -1;
    pointer-events: none;

    background-image: radial-gradient(var(--color-dots) $dots-size, transparent $dots-size);
    background-size: $dots-gap $dots-gap;

    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0px,
      #000000 $dots-extend,
      #000000 calc(100% - #{$dots-extend}),
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0px,
      #000000 $dots-extend,
      #000000 calc(100% - #{$dots-extend}),
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
}
</style>

<script>
import Navigation from './components/_navigation.vue'
import FooterFile from './components/_footer.vue'
import { contacts } from '@/data/profile'

export default {
  components: {
    Navigation,
    FooterFile,
  },
  data() {
    return {
      contacts,
    }
  },
}
</script>
