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
  background-image: radial-gradient($dots-color $dots-size, transparent $dots-size);
  background-size: $dots-gap $dots-gap;

  -webkit-mask-image: linear-gradient(to right, #000000 $content-width, transparent $max-width);
  mask-image: linear-gradient(to right, #000000 $content-width, transparent $max-width);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
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
