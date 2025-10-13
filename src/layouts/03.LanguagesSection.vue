<template>
  <div id="skills-container">
    <div
      class="skill"
      v-for="(skill, idx) in skills"
      :key="skill.id || skill.name || idx"
      :style="{
        backgroundColor: skill && skill.color ? '#' + skill.color + '80' : 'gray',
        borderColor: skill && skill.color ? skill.color : 'darkgray',
        borderRadius: skill && skill.color ? '1em' : '0.3em',
        color: skill && skill.color ? '#' + skill.color : 'white',
      }"
    >
      <span class="tag-name">
        {{ skill.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#skills-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;

  .skill {
    font-size: 1.2em;
    margin: 0.5em;
    border: 1px solid currentColor;
    cursor: default;

    .tag-name {
      margin: 0 1em;
    }
  }
}
</style>
