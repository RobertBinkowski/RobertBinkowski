<template>
  <section id="contactSection">
    <div class="contacts">
      <a
        v-for="contact in contacts"
        :key="contact.name"
        :href="contact.link"
        class="button"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="contact.name"
      >
        <socialIcon :icon="contact.icon" />
        {{ contact.name }}
      </a>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/style/variables' as *;
#contactSection {
  width: 100%;
  max-width: 100%;
  padding: 5em;
  box-sizing: border-box;
  overflow-x: clip;

  .contacts {
    gap: 1em;
    display: flex;
    flex-wrap: wrap;
    a {
      margin: auto;
      display: inline-flex;
      align-items: center;
      gap: 0.4em;

      .social-icon {
        font-size: 1.3em;
      }
    }
  }
}
</style>

<script>
import socialIcon from '@/components/socialIcon.vue'

export default {
  name: 'ContactSection',
  components: {
    socialIcon,
  },
  props: {
    contacts: {
      type: Array,
      required: false,
    },
  },
}
</script>
