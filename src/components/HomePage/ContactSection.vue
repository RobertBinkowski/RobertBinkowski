<template>
  <section id="contactSection">
    <h2>Get In Touch</h2>
    <p>
      You are always welcome to see what I am working on next on my GitHub, <br />
      see what I am up to on LinkedIn, <br />
      or just contact me directly via my Email.
    </p>
    <br />
    <div>
      <a
        v-for="contact in contacts"
        v-show="contact.name != 'Resume'"
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
@import '../../assets/scss/variables';
#contactSection {
  div {
    padding: 1em;
  }
  i {
    font-size: 1.3em;
    padding-right: 0.4em;
  }
}
</style>

<script>
export default {
  name: 'ContactSection',
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
}
</script>
