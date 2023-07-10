<template>
  <a
    :href="tag.href"
    class="tag"
    :style="{
      color: tag.color,
      backgroundColor: tag.color + '34',
      borderColor: tag.color
    }"
  >
    {{ tag.name }}
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
  cursor: pointer;
  background-color: $acc-2-t;
  color: #ffffff31;
  border-radius: $rad-1;
  border: $acc-2 2px solid;
  transition: $tr-s;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
  &:hover {
    border-radius: $rad-2;
  }
}
</style>
