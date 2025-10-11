<template>
  <footer>
    <logoSVG />
    <div id="footer-links">
      <linkComponent v-for="contact in contacts" :key="contact.id" :link="contact"></linkComponent>
    </div>
    <p>Designed and developed by <strong>Robert Binkowski</strong></p>
    <p id="license" xmlns:cc="http://creativecommons.org/ns#">
      This work is licensed under
      <br />
      <a
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
        target="_blank"
        rel="license noopener noreferrer"
        style="display: inline-block"
        >CC BY-NC-ND 4.0</a
      >
    </p>
  </footer>
</template>

<style lang="scss">
@use '@/style/variables' as *;

footer {
  background: $fot-back;
  text-align: center;
  padding-top: 2em;
  padding-bottom: 2em;
  color: $bg;

  svg {
    margin-bottom: 1em;
  }

  strong {
    color: $acc-1;
  }
  #footer-links {
    display: flex;
    justify-content: center;
    padding-bottom: 1em;
    gap: 1em;
    a {
      color: $bg;
      &:hover {
        color: $acc-1;
      }
    }
  }
  #license {
    margin-top: 3em;
    font-size: 0.8em;
    a {
      color: $bg;
    }
  }
}
</style>

<script>
import LogoSVG from '@/components/_logo.vue'
import linkComponent from '@/components/linkComponent.vue'

export default {
  name: 'footerView',
  components: {
    LogoSVG,
    linkComponent,
  },
  props: {
    contacts: {
      type: Array,
      required: false,
    },
  },
}
</script>
