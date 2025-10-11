<template>
  <footer>
    <logoSVG />
    <div id="footer-links">
      <linkComponent v-for="link in links" :key="link.id" :link="link"></linkComponent>
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
@import '@/style/variables';

footer {
  background: $fot-back;
  text-align: center;
  padding-top: 4em;
  padding-bottom: 2em;

  svg {
    margin-bottom: 2em;
  }

  p {
    font-size: 1.2em;
    color: $bg;
    strong {
      color: $acc-1;
    }
  }
  #footer-links {
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    a {
      margin: 0 1em;
      font-size: 1.3em;
      color: $bg;
      &:hover {
        color: $acc-1;
      }
    }
  }
  #license {
    margin-top: 4em;
    font-size: 0.8em;
    a {
      color: $bg;
    }
  }
}
</style>

<script>
import LogoSVG from '@/icons/LogoSVG.vue'
import linkComponent from './linkComponent.vue'

export default {
  name: 'footerView',
  components: {
    LogoSVG,
    linkComponent,
  },
  props: {
    links: {
      type: Array,
      required: false,
    },
  },
}
</script>
