<template>
  <section v-if="bio" id="aboutSection">
    <div>
      <h2>A little About Me</h2>
      <p v-html="bio"></p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#aboutSection {
  .fa-brands,
  .fa-solid {
    font-size: 2em;
  }
  div {
    max-width: 900px;
    margin: auto 2em;
  }
}
</style>

<script>
export default {
  props: {
    bio: {
      type: String,
      required: true,
    },
  },
}
</script>
