<template>
  <main>
    <h1>About Page</h1>
    <imageComponent
      image="https://bulma.io/images/placeholders/1280x960.png"
      alt="Placeholder
    image"
      caption="Placeholder image"
    ></imageComponent>
  </main>
</template>

<script lang="ts">
import imageComponent from '@/components/components/imageComponent.vue'

export default {
  name: 'AboutPage',
  components: {
    imageComponent
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
</style>
