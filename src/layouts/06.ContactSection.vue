<template>
  <section id="contactSection">
    <div class="bento-grid">
      <bentoCard v-for="contact in contacts" :key="contact.name" :link="contact" />
    </div>
  </section>
</template>

<style lang="scss">
@use '@/style/variables' as *;

#contactSection {
  width: 100%;
  max-width: min($content-width, 100%);
  padding: 4em 1.25em 5em;
  box-sizing: border-box;
  overflow-x: clip;

  .bento-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    grid-auto-rows: minmax(16rem, auto);
    gap: 1em;
    align-items: stretch;
  }

  .bento-card--featured {
    grid-column: 1;
    grid-row: 1 / span 2;
    height: 100%;
  }
}

@media only screen and (max-width: $phone-size) {
  #contactSection {
    padding: 3em 1em 4em;

    .contact-heading {
      text-align: center;
    }

    .bento-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
    }

    .bento-card--featured {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>

<script>
import bentoCard from '@/components/bentoCard.vue'

export default {
  name: 'ContactSection',
  components: {
    bentoCard,
  },
  props: {
    contacts: {
      type: Array,
      required: false,
    },
  },
}
</script>
