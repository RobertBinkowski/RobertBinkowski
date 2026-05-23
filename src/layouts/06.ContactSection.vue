<template>
  <section id="contactSection">
    <h2>Get In Touch</h2>
    <div class="contacts">
      <a
        v-for="contact in contacts"
        :key="contact.id"
        :href="contact.link"
        class="button"
        target="_blank"
        ><i :class="contact.icon"></i> {{ contact.name }}</a
      >
    </div>
  </section>
</template>

<style lang="scss">
@use '@/style/variables' as *;
#contactSection {
  .contacts {
    gap:1em;
    display: flex;
    flex-wrap: wrap;
    a {
      margin: auto;
      i {
        font-size: 1.3em;
        padding-right: 0.4em;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'ContactSection',
  props: {
    contacts: {
      type: Array,
      required: false,
    },
  },
}
</script>
