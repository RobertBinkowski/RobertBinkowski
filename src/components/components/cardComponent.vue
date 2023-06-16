<template>
  <div id="cards">
    <div class="card" v-for="card in cards" :key="card.id">
      <div class="card-content">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
        <div class="links">
          <a :href="card.github" target="_blank" class="button"
            ><i class="fa-brands fa-github"></i> GitHub</a
          >
          <a :href="card.demo" target="_blank" class="button"
            ><i class="fa-solid fa-external-link"></i> Demo</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
#cards {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1000px;
  padding: 1em 0em;
  place-self: center;
  position: relative;
  width: calc(100% - 2em);
  z-index: 2;
}

.card {
  background-color: $acc-1;
  border-radius: 0.75em;
  cursor: pointer;
  height: 240px;
  position: relative;
}

.card:hover:before {
  opacity: 1;
}

.card:before {
  background: linear-gradient(45deg, transparent 5%, $acc-2 50%, transparent 99%);
  border-radius: inherit;
  content: '';
  inset: 0px;
  opacity: 0;
  position: absolute;
  transition: opacity 400ms;
}

.card-content {
  background-color: $acc-1-dd;
  border-radius: inherit;
  display: grid;
  inset: 1px;
  padding: 1em;
  position: absolute;
}

.card:hover > .card-content > .card-icon {
  opacity: 1;
  transform: scale(1.1) translateY(-5%);
}

.card-icon {
  color: rgba(255, 255, 255, 0.25);
  font-size: 6em;
  opacity: 0.4;
  place-self: center;
  transition: transform 250ms, opacity 250ms;
}
</style>

<script lang="ts">
export default {
  props: {
    cards: {
      type: Object,
      required: true
    }
  }
}
</script>
