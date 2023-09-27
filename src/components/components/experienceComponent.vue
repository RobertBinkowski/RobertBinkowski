<template>
  <div class="wrapper">
    <div v-show="experience.photo" class="image-experience">
      <img :src="experience.photo" :alt="experience.name" />
    </div>
    <div class="details-experience">
      <a :href="experience.link">
        <img :src="experience.icon" :alt="experience.name" />
        <h3>{{ experience.name }}</h3>
        <p>{{ experience.info }}</p>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.details-experience {
  a {
    img {
      height: 5em;
    }
  }
}
</style>

<script lang="js">
export default {
    props: {
        experience: {
            // type: object,
            required: true
        }
    }
}
</script>
