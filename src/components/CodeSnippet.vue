<template>
  <div class="code-snippet-container">
    <span v-for="line in code" :key="line.id">{{ line.id }}. {{ line }}</span>
    <div class="copy-button"></div>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: string,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.code-snippet-container {
  height: auto;
}
</style>
