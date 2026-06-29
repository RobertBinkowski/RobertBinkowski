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
  background: $bg;
  padding: 0;
  box-sizing: border-box;

  // Dots Background
  background-image: radial-gradient($dots-color $dots-size, transparent $dots-size);
  background-size: $dots-gap $dots-gap;
}

@media only screen and (min-width: $max-width) {
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
  data() {
    return {
      contacts: [
        {
          name: 'LinkedIn',
          icon: 'fa-brands fa-linkedin',
          link: 'https://www.linkedin.com/in/robert-binkowski-9bb565195/',
        },
        {
          name: 'GitHub',
          icon: 'fa-brands fa-github',
          link: 'https://github.com/RobertBinkowski',
        },
      ],
    }
  },
}
</script>
