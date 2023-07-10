<template>
  <a
    :href="tag.href"
    class="tag"
    :style="{
      color: tag.color ? tag.color : 'white',
      backgroundColor: tag.color ? tag.color + '34' : 'darkgray',
      borderColor: tag.color ? tag.color : 'darkgray',
      borderRadius: tag.color ? '1em' : '0.2em',
      cursor: tag.href ? 'pointer' : 'default'
    }"
  >
    <span v-show="tag.href"># </span>
    <string>
      {{ tag.name }}
    </string>
  </a>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables';
.tag {
  margin: 1em;
  padding: 1em 1em 1em 1em;
  background-color: $acc-2-t;
  color: #ffffff31;
  border-radius: $rad-1;
  border: $acc-2 2px solid;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
}
</style>
