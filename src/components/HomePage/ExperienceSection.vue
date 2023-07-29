<template>
  <section>
    <h2>Experience</h2>
    <div class="experiences">
      <experienceComponent v-for="experience in experiences" :key="experience.id" :experience="experience">
      </experienceComponent>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.experiences {
  @include responsiveItems();
}
</style>

<script lang="js">
import experienceComponent from '@/components/components/experienceComponent.vue';

export default {
  components: {
    experienceComponent
  },
  props: {
    experiences: {
      type: Array,
      required: true
    }
  }
}
</script>
