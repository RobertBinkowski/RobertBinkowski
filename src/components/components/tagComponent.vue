<template>
  <div>
    <a
      :href="tag.link ?? '#'"
      class="tag"
      :style="{
        color: tag.color ? tag.color : 'white',
        backgroundColor: tag.color ? tag.color + '34' : 'gray',
        // borderColor: tag.color ? tag.color : 'darkgray',
        borderRadius: tag.color ? '3em' : '0.3em',
        cursor: tag.src ? 'pointer' : 'default'
      }"
    >
      <i v-show="tag.icon" :class="tag.icon"></i>
      <span>
        {{ tag.name }}
      </span>
    </a>
  </div>
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
@import '@/assets/scss/variables';

.hash {
  color: white;
}

.tag {
  margin: 1em;
  padding: 1em;
  // border: $acc-2 2px solid;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
  i {
    padding-right: 0.4em;
  }
}
</style>
