<template>
  <section id="skills-section">
    <div class="skills-wrapper">
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
    </div>
    <div class="skills-wrapper backwards">
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
    </div>
    <div class="skills-wrapper">
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
      <div
        v-for="(skill, idx) in scrambledSkills"
        v-show="skill.name"
        :key="`${skill.name}-${trackIndex}-scrambled-${idx}`"
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
  computed: {
    scrambledSkills() {
      if (!Array.isArray(this.skills)) {
        return []
      }
      // Slice to clone so sort does not mutate incoming prop data.
      return this.skills.slice().sort(() => Math.random() - 0.5)
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
  gap: 1em;
  overflow: hidden;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10rem;
    pointer-events: none;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, $bg 0%, rgba($bg, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, $bg 0%, rgba($bg, 0));
  }

  .skills-wrapper {
    display: flex;
    width: max-content;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    justify-items: start;
    animation: scroll 30s linear infinite;
    animation-play-state: running;

    &:hover {
      animation-play-state: paused;
    }
  }
  .backwards {
    animation: scrollBackwards 30s linear infinite;
  }

  .skill-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 0 1em;
    border: 2px solid;
    border-radius: 2em;
    overflow: hidden;
    margin-right: 1em;

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
