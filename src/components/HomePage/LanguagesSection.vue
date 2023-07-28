<template>
  <div>
    <tagComponent class="languages" v-for="tag in languages" :key="tag" :tag="tag"></tagComponent>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
