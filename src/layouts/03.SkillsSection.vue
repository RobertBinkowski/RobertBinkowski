<template>
  <section id="skills-section">
    <div
      v-for="(track, wrapperIdx) in scrambledTracks"
      :key="`skills-track-${wrapperIdx}`"
      class="skills-wrapper"
      :class="{ backwards: wrapperIdx % 2 }"
    >
      <div
        v-for="(skill, idx) in track"
        v-show="skill.name"
        :key="`${skill.name || 'skill'}-${wrapperIdx}-${idx}`"
        class="skill-pill"
        :style="{
          backgroundColor: skill && skill.color ? skill.color + '33' : '#66666633',
          borderColor: skill && skill.color ? skill.color : '#4a4a4a',
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
    chunkedSkills() {
      const trackCount = 4
      if (!Array.isArray(this.skills)) {
        return Array.from({ length: trackCount }, () => [])
      }
      const buckets = Array.from({ length: trackCount }, () => [])
      this.skills.forEach((skill, index) => {
        buckets[index % trackCount].push(skill)
      })
      return buckets
    },
    scrambledTracks() {
      return this.chunkedSkills.map((chunk) => {
        if (!chunk.length) {
          return []
        }
        const doubledChunk = [...chunk, ...chunk]
        return this.shuffleSkills(doubledChunk)
      })
    },
  },
  methods: {
    shuffleSkills(skillsList) {
      const clone = skillsList.slice()
      for (let i = clone.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[clone[i], clone[j]] = [clone[j], clone[i]]
      }
      return clone
    },
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
  min-height: auto;
  max-height: auto;
  overflow: hidden;

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
      color: $txt;
      font-weight: 800;
      display: inline-block;
      transition: color 0.3s ease;
    }

    .skill-pill-details {
      display: flex;
      gap: 1em;
      white-space: nowrap;
      color: $txt;
      background: linear-gradient(90deg, rgba($bg, 0.98), rgba($bg, 0.8));
      border-radius: $rad-1;
      padding: 0.5em 1em;
      margin-left: 1em;
      margin-right: -1em;
    }
  }
}
</style>
