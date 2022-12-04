<template>
  <section id="welcomeSection">
    <LogoSVG class="logo" />
    <p>Hi, I'm</p>
    <h1>Robert Binkowski</h1>
    <h2>Software Developer</h2>
    <p>
      Specialized in
      <strong>Web Development</strong>
    </p>
    <div class="links">
      <a
        href="https://github.com/RobertBinkowski"
        target="_blank"
        class="button"
        ><i class="fa-brands fa-github"></i> GitHub</a
      >
      <a
        href="https://docs.google.com/document/d/1SQ6XWF39Ibd1BbfVPTALshtNB7liDILF/view"
        target="_blank"
        class="button"
        ><i class="fa-solid fa-file-contract"></i> Resume</a
      >
    </div>
  </section>
</template>

<style lang="scss" scope>
  @import "../../assets/scss/variables";

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
</style>

<script>
  import LogoSVG from "../../components/SVGs/LogoSVG.vue";

  export default {
    components: {
      LogoSVG,
    },
    props: {},
  };
</script>
