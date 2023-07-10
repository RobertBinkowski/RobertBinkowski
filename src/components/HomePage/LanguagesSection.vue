<template>
  <div class="container">
    <div class="scroll-container">
      <div class="tag-list">
        <tagComponent
          v-for="tag in languages"
          :key="tag"
          :tag="tag"
          class="tag-item"
        ></tagComponent>
      </div>
    </div>
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
@import '@/assets/scss/_variables';
@import '@/assets/scss/_mixins';

.container {
  padding: 2em;
  max-width: 1300px;
  @include flexCenter();
}
</style>
