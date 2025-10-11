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
