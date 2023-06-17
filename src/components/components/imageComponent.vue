<template>
  <div>
    <figure class="card">
      <img :src="image" :alt="alt" />
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'imageComponent',
  props: {
    image: String,
    alt: String,
    caption: String
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

div {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 10em;
  width: 10em;
  border-radius: $rad-2;
  overflow: hidden;
}
.card {
  display: grid;
  grid-template-areas: 'stack';
  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  figcaption {
    opacity: 0;
    transition: opacity $tr-s;
  }
  &:hover {
    figcaption {
      opacity: 1;
    }
  }
}
.card > figcaption {
  display: grid;
  align-items: end;
  padding: 1em 2em;
  background-image: linear-gradient(
    to bottom,
    rgb(33 44 55/ 0),
    rgb(33 44 55/ 0),
    rgb(33 44 55/ 0.75)
  );
}
.card > * {
  grid-area: stack;
}
</style>
