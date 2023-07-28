<template>
  <section id="projectsSection">
    <h2>Projects</h2>
    <projectCardComponent v-for="project in projects" :key="project" :project="project" v-show="project.enabled">
    </projectCardComponent>
  </section>
</template>

<style lang="scss">
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';
</style>

<script lang="js">

import projectCardComponent from '../components/projectCardComponent.vue'

export default {
  name: 'ProjectsSection',
  components: {
    projectCardComponent
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>
