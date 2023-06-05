<template>
  <section id="welcomeSection">
    <div v-if="false" id="interactive">
      <div class="key">D</div>
      <div class="key">I</div>
      <div class="key">V</div>
    </div>
    <LogoSVG class="logo" />
    <p>Hi, I'm</p>
    <h1>Robert Binkowski</h1>
    <h2>Software Developer</h2>
    <p>
      Specialized in
      <strong>Web Development</strong>
    </p>
    <div class="links">
      <a href="https://github.com/RobertBinkowski" target="_blank" class="button"
        ><i class="fa-brands fa-github"></i> GitHub</a
      >
      <a
        href="https://docs.google.com/document/d/1SQ6XWF39Ibd1BbfVPTALshtNB7liDILF/view"
        target="_blank"
        class="button"
        ><i class="fa-solid fa-file-contract"></i> Resume</a
      >
      <a
        href="https://www.linkedin.com/in/robert-binkowski-9bb565195/"
        target="_blank"
        class="button"
        ><i class="fa-brands fa-linkedin"></i> LinkedIn</a
      >
    </div>
  </section>
</template>

<style lang="scss" scope>
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';

#welcomeSection {
  .logo {
    height: 10em;
    stroke-width: 2;
    padding-bottom: 4em;
  }
  height: 100vh;
  h1 {
    font-size: calc(3rem + 2vw);
    margin-bottom: 0;
    color: $acc-2;
  }
  h2 {
    margin-top: 0;
    color: $acc-1;
    font-size: calc(1rem + 2vw);
  }
  i {
    font-size: 1.3em;
    padding-right: 0.4em;
  }
  .links {
    display: flex;
    margin-top: 5em;
  }
}
#interactive {
  position: relative;
  display: flex;
  justify-content: space-around;
  .key {
    position: absolute;
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid #ccc;
    background-color: $acc-1;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      background-color: $acc-1-d;
      cursor: pointer;
    }
  }
  .key:first-child {
    left: 100%;
  }

  .key:nth-child(2) {
    left: 50%;
    transform: translateX(-50%);
  }

  .key:nth-child(3) {
    right: 10%;
  }
}
</style>

<script>
import LogoSVG from '../../assets/icons/LogoSVG.vue'

export default {
  components: {
    LogoSVG
  },
  props: {}
}
</script>
