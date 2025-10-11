<template>
  <div>
    <!-- Navigation -->
    <Navigation></Navigation>

    <main>
      <!-- Router Link -->
      <router-view />
    </main>

    <!-- Main Footer -->
    <FooterFile></FooterFile>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables';

main {
  max-width: $max-width;
  margin: auto;
  background: $bg;

  // Dots Background
  background-image: radial-gradient($dots-color $dots-size, transparent $dots-size);
  background-size: $dots-gap $dots-gap;
}
@media only screen and (min-width: 1000px) {
  main {
    // Fade background
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0px,
      #000000 150px,
      #000000 calc($max-width - 150px),
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0px,
      #000000 150px,
      #000000 calc($max-width - 150px),
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

export default {
  components: {
    Navigation,
    FooterFile,
  },
}
</script>
