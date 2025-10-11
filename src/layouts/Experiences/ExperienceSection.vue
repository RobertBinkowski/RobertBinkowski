<template>
  <section>
    <h2>Experience</h2>
    <div class="experiences">
      <!-- <experienceComponent
        v-for="experience in experiences.data"
        :key="experience.id"
        :experience="experience"
      >
      </experienceComponent> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/variables';
@import '@/style/mixins';

.experiences {
  @include responsiveItems();
}
</style>

<script lang="js">
import experienceComponent from '../../temp/experienceComponent.vue'

import { onMounted } from 'vue'
// import useExperiences from '@/composable/experiences'

export default {
  components: {
    experienceComponent,
  },
  setup() {
    // const { experiences, getExperiences } = useExperiences()
    // onMounted(getExperiences)
    // return {
    //   experiences,
    // }
  },
}
</script>
