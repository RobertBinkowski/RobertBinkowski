<template>
  <div>
    <tagComponent
      class="tags"
      v-for="language in languages"
      :key="language"
      :tag="language"
    ></tagComponent>
  </div>
</template>

<script>
import tagComponent from '@/components/tagComponent.vue'

export default {
  components: {
    tagComponent,
  },
  props: {
    languages: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-size: 1.2em;
  }
}
</style>
