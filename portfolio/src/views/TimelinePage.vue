<template>
  <main>
    <article>
      <!-- <h1>Timeline Page</h1> -->
      <TimelineObject />
    </article>
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
