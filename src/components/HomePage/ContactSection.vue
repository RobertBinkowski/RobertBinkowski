<template>
  <section id="contactSection">
    <h2>Get In Touch</h2>
    <p>
      Although, I am currently not looking for a new opportunity, <br />
      You are always welcome to say hi.
    </p>
    <br />
    <div>
      <a
        v-for="contact in contacts"
        v-show="contact.name != 'Email'"
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
