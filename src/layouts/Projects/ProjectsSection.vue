<template>
  <section id="projectsSection">
    <h2>Projects</h2>
    <!-- <projectCardComponent
      v-for="project in projects.data"
      :key="project.id"
      :project="project"
      v-show="project.enabled"
    >
    </projectCardComponent> -->
  </section>
</template>

<style lang="scss">
@import '@/style/variables';
@import '@/style/mixins';
</style>

<script lang="js">
// import projectCardComponent from '../../temp/projectCardComponent.vue'
// import { onMounted } from 'vue'
// import useProjects from '@/composable/projects'

export default {
  name: 'ProjectsSection',
  components: {
    // projectCardComponent,
  },
  setup() {
    // const { projects, getProjects } = useProjects()
    // onMounted(getProjects)

    return {
      // projects,
      // getProjects,
    }
  },
}
</script>
