<template>
  <section id="projectsSection">
    <h2>Some Projects I Have Done</h2>
    <div class="experience" v-for="project in projects" :key="project.id" v-show="project.enabled">
      <a :href="project.link" target="_blank">
        <div>
          <p class="fa-solid fa-folder-open left"></p>
          <div class="right">
            <p class="fa-brands fa-github"></p>
            <p class="fa-solid fa-arrow-up-right-from-square"></p>
          </div>
          <h3>{{ project.name }}</h3>
          <p>
            {{ project.value }} -
            <!-- <small
              ><em>{{ project.date }}</em></small
            > -->
          </p>
          <div class="grid technology">
            <em
              v-for="tech in project.technologies"
              :key="tech.id"
              :title="tech.name"
              :class="tech.icon"
            ></em>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
@import '../../assets/scss/variables';
@import '../../assets/scss/mixins';
#projectsSection {
  .experience {
    div {
      position: relative;
      .left {
        position: absolute;
        top: 0em;
        left: 1em;
        font-size: 2em;
      }
      .right {
        position: absolute;
        top: -1em;
        right: 1em;
        font-size: 1.2em;
      }
      .technology {
        font-size: 2em;
      }
    }
  }
  .experience {
    padding: 1em;
    transition: $tr-s;
    div {
      padding: 1em;
    }
    &:hover {
      @include gradient();
      .exp-screen {
        filter: grayscale(0);
        border-color: $acc-2;
        border-radius: 0.1em;
      }
    }
    .exp-screen {
      width: calc(14rem + 15vw);
      border-radius: 1em;
      border: 1px solid #ffffff00;
      filter: grayscale(100%);
      transition: $tr-s;
    }
  }
}
</style>

<script>
export default {
  name: 'ProjectsSection',
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>
