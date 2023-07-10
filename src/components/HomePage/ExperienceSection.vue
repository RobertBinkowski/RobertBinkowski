<template>
  <section>
    <h2>Experiences</h2>
    <div class="wrapper">
      <div v-for="experience in experiences" :key="experience.id">
        <a :href="experience.link">
          <img :src="experience.icon" :alt="experience.name" />
          <h3>{{ experience.name }}</h3>
          <p>{{ experience.info }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';
.wrapper {
  width: 100%;
  @include responsiveItems();

  div {
    a {
      img {
        height: 5em;
      }
    }
  }
}
</style>

<script lang="js">
export default {
    props: {
        experiences: {
        type: Array,
        required: true
        }
    }
}
</script>
