<template>
  <a
    :href="tag.link ?? '#'"
    class="tag"
    :style="{
      backgroundColor: tag.color ? '#' + tag.color + '80' : 'gray',
      borderColor: tag.color ? tag.color : 'darkgray',
      borderRadius: tag.color ? '1em' : '0.3em',
      cursor: tag.link ? 'pointer' : 'default',
      color: tag.color ? '#' + tag.color : 'white',
    }"
  >
    <span
      :style="{
        color: tag.color ? tag.color : 'white',
      }"
      >#</span
    >
    <span class="tag-name">
      {{ tag.name }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.tag {
  margin: 0.5em;
  padding: 0.3em 0.7em;

  .tag-name {
    margin-left: 0.5em;
    color: white;
  }
}
</style>
