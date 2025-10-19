<template>
  <section id="skills-section">
    <div
      v-for="(skill, idx) in skills"
      v-show="skill.name"
      :key="`${skill.name}-${trackIndex}-${idx}`"
      class="skill-pill"
      :style="{
        backgroundColor: skill && skill.color ? skill.color + '80' : 'gray',
        borderColor: skill && skill.color ? skill.color : 'darkgray',
        color: skill && skill.color ? '#' + skill.color : 'white',
      }"
    >
      <span class="skill-pill-label">{{ skill.name }}</span>
      <div class="skill-pill-details">
        <span v-if="skill.years">{{ formatYears(skill.years) }}</span>
        <span v-if="skill.years && skill.level" class="divider">•</span>
        <span v-if="skill.level">{{ skill.level }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SkillsSection',
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatYears(years) {
      if (typeof years !== 'number' || Number.isNaN(years)) {
        return 'Experience'
      }
      if (years < 1) {
        return `${Math.round(years * 12)} mos`
      }
      return `${Number.isInteger(years) ? years : years.toFixed(1)} yrs`
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#skills-section {
  display: flex;
  max-width: 1000px;
  height: 1em;
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  // flex-direction: row;
  // flex-wrap: wrap;
  gap: 0.5em;

  .skill-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 0 1em;
    border: 2px solid;
    border-radius: 2em;
    overflow: hidden;

    .skill-pill-label {
      color: white;
      font-weight: 800;
      display: inline-block;
      transition: color 0.3s ease;
    }

    .skill-pill-details {
      display: flex;
      gap: 1em;
      white-space: nowrap;
      background: linear-gradient(90deg, rgba($bg, 0.92), rgba($bg, 0.7));
      border-radius: $rad-1;
      padding: 0.5em 1em;
      margin-left: 1em;
      margin-right: -1em;
    }
  }
}
</style>
