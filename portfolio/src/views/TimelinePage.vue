<template>
  <main>
    <h1>Timeline Page</h1>
    <TimelineObject />
  </main>
</template>

<script lang="ts">
import TimelineObject from '../components/Timeline/TimelineSuspense.vue'

export default {
  components: {
    TimelineObject
  }
}
</script>

<style lang="scss" scoped>
main {
  margin-top: 10em;
}
</style>
