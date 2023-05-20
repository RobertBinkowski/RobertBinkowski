<template>
  <header>
    <nav>
      <!-- Logo -->
      <a href="#top" class="nav-logo">
        <LogoSVG />
      </a>
      <!-- End Logo -->
      <!-- Links -->
      <div class="nav-content">
        <ul class="nav-ul">
          <a
            v-for="link in links"
            :key="link.id"
            :href="link.link"
            class="nav-a"
            target="_self"
            v-show="link.enabled"
          >
            <li class="nav-li">
              <div :class="link.button ? 'button nav-item' : 'nav-item'">
                <i v-show="link.ico" :class="link.ico"></i>
                <p v-show="link.name">{{ link.name }}</p>
              </div>
            </li>
          </a>
        </ul>
        <!-- End Links -->
        <ul v-if="false" class="nav-ul">
          <a
            v-for="feature in features"
            :key="feature.id"
            :href="feature.link"
            v-show="feature.enabled"
            class="nav-a li-resume"
            target="_self"
          >
            <li class="nav-li">
              <div :class="feature.button ? 'button nav-item' : 'nav-item'">
                <i v-show="feature.ico" :class="feature.ico"></i>
                <p v-show="feature.name">{{ feature.name }}</p>
              </div>
            </li>
          </a>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
  @import "../assets/scss/variables";
  @import "../assets/scss/mixins";

  header {
    left: 0;
    right: 0;
    z-index: 1;
    position: fixed;

    nav {
      box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
      margin: 0;
      width: 100vw;
      max-width: 1500px;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      border-radius: $rad-2;
      display: flex;

      .nav-logo {
        padding: 1em;
        .svg {
          height: 4em;
          stroke-width: 2;
        }
      }

      ul {
        display: flex;
        .nav-item {
          padding: 0.2em;
          margin: 0;
        }
      }
      .nav-a {
        padding: 1em;
        .nav-li {
          width: 100%;
          height: 100%;
          margin: auto;
          strong {
            width: 100%;

            i {
              padding-right: 1em;
            }
          }
        }
        font-size: large;
        .svg {
          height: 2em;
          margin: -0.5em;
          stroke-width: 2;
        }
      }
    }
  }
</style>

<script>
  import LogoSVG from "./SVGs/LogoSVG.vue";

  export default {
    components: {
      LogoSVG,
    },
    props: {
      links: {
        required: true,
      },
      features: {
        required: true,
      },
    },
  };
</script>
