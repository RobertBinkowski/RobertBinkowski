<template>
  <a class="card-content" :href="project.id ? 'project/' + project.id : ''">
    <div class="icons">
      <p class="fa-solid fa-folder-open left"></p>
      <a :href="project.link" class="right" target="_blank">
        <p class="fa-brands fa-github"></p>
      </a>
    </div>
    <div class="mainContent">
      <h3>{{ project.name }}</h3>
      <p>
        {{ project.value }}
      </p>
      <small><em v-show="false">{{ project.date }}</em></small>
    </div>
    <div class="technologies">
      <tagComponent v-for="tag in project.technologies" :key="tag" :tag="tag"></tagComponent>
    </div>
  </a>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '../../assets/scss/mixins';

.card-content {
  widows: 100%;
  padding: 1em 0 1em 0;

  .icons {
    position: relative;

    .left {
      position: absolute;
      top: -1em;
      left: 0em;
      font-size: 1.5em;
    }

    .right {
      position: absolute;
      top: -1em;
      right: 1em;
      font-size: 1.5em;
    }
  }

  &:hover {
    @include gradient();
  }

  a {
    text-decoration: none;

    &:hover {
      color: $acc-2;
    }
  }

  h3 {
    margin: 0.5em 0;
  }

  p {
    // color: white;
    margin: 0.5em 0;
  }

  .technologies {
    padding-top: 2em;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: .9em;
  }
}
</style>

<script lang="ts">
import tagComponent from '@/components/components/tagComponent.vue'

export default {
  components: {
    tagComponent
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>
