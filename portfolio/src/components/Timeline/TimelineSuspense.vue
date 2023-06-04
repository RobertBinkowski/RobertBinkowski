<template>
  <div>
    <Suspense>
      <template #default>
        <TimelineObject />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import TimelineObject from './TimelineObject.vue'

export default {
  components: {
    TimelineObject
  }
}
</script>
