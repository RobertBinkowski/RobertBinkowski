<template>
  <footer>
    <!-- <logoSVG /> -->
    <br />
    <ul id="contact">
      <a
        v-for="contact in contacts"
        :key="contact"
        :href="contact.link"
        target="_self"
        v-show="contact.enabled"
      >
        <li>
          <p :class="contact.icon"></p>
        </li>
      </a>
    </ul>
    <br />
    <p>
      This website was designed and built by <br />
      <strong>Robert Binkowski</strong>
    </p>
  </footer>
</template>

<!-- <style lang="scss">
@import '../assets/scss/variables';

footer {
  padding-top: 4em;
  padding-bottom: 3em;
  min-height: 10vh;
  li {
    font-size: 1.3em;
  }
  #contact {
    p {
      font-size: 1.2em;
    }

    &::after {
      content: '';
      background-color: $acc-2;
      height: 100px;
      display: block;
      width: 1px;
      margin: 0px auto -15px auto;
    }
  }
  li:hover {
    margin-top: -0.2em;
    margin-bottom: 0.2em;
  }
}
</style> -->

<script>
// import LogoSVG from "./SVGs/LogoSVG.vue";

export default {
  name: 'app',
  components: {
    // LogoSVG,
  },
  props: {
    contacts: {
      required: true
    }
  }
}
</script>
