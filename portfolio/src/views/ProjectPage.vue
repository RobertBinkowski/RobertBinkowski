<template>
  <main>
    <h1>{{ project.name }}</h1>
    <h2>Project</h2>
    <p>{{ project.brief }}</p>
    <div class="images">
      <img
        v-for="project in project.projects"
        :key="project.id"
        :src="project.src"
        :alt="project.alt"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.images {
  width: 100%;
  padding: 1em 0;
  img {
    height: 10rem;
  }
}
</style>

<script>
export default {
  props: {
    project: {
      required: true
    }
  }
}
</script>
