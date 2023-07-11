<template>
  <div>
    <tagComponent v-for="tag in languages" :key="tag" :tag="tag"></tagComponent>
  </div>
</template>

<script>
import tagComponent from '../components/tagComponent.vue'

export default {
  components: {
    tagComponent
  },
  props: {
    languages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

div {
  margin: 5em 0 5em 0;
}
</style>
