<template>
  <div
    class="skill-pill"
    :class="pillClasses"
    :style="pillStyle"
  >
    <span class="skill-pill-label">{{ skill.name }}</span>
    <span v-if="hasDetails" class="skill-pill-details">
      <template v-if="variant === 'marquee'">
        <span v-if="skill.years">{{ formattedYears }}</span>
        <span v-if="skill.years && skill.level" class="divider">•</span>
        <span v-if="skill.level">{{ skill.level }}</span>
      </template>
      <template v-else-if="variant === 'experience'">
        <span v-if="skill.level">{{ skill.level }}</span>
      </template>
      <template v-else-if="variant === 'duration'">
        <span>{{ duration }}</span>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: 'skillPill',
  props: {
    skill: {
      type: Object,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'marquee',
      validator: (value) => ['marquee', 'experience', 'duration'].includes(value),
    },
    duration: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasDetails() {
      if (this.variant === 'duration') {
        return Boolean(this.duration)
      }
      if (this.variant === 'experience') {
        return Boolean(this.skill.level)
      }
      return Boolean(this.skill.years || this.skill.level)
    },
    pillClasses() {
      return {
        'skill-pill--compact': this.compact,
        'skill-pill--bare': !this.hasDetails,
        'skill-pill--experience': this.variant === 'experience',
      }
    },
    pillStyle() {
      const color = this.skill.color
      const vivid = this.variant === 'experience'

      let backgroundColor = 'gray'
      if (color) {
        backgroundColor = vivid ? `${color}e6` : `${color}80`
      } else if (vivid) {
        backgroundColor = '#666'
      }

      return {
        backgroundColor,
        borderColor: color || 'darkgray',
      }
    },
    formattedYears() {
      const years = this.skill.years
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

<style scoped lang="scss">
@use '@/style/variables' as *;

.skill-pill {
  display: inline-flex;
  align-items: center;
  padding: 0 1em;
  border: 2px solid;
  border-radius: 2em;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba($bg-dark, 0.12);

  .skill-pill-label {
    color: $txt-light;
    font-weight: 800;
    white-space: nowrap;
  }

  .skill-pill-details {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
    background: linear-gradient(90deg, rgba($bg, 0.92), rgba($bg, 0.7));
    border-radius: $rad-1;
    padding: 0.5em 0.75em;
    margin-left: 0.75em;
    margin-right: -0.75em;
    color: $txt;
    white-space: nowrap;
  }

  &.skill-pill--bare {
    padding: 0.35em 0.9em;
  }

  &.skill-pill--experience {
    border-width: 2.5px;
    box-shadow: 0 2px 6px rgba($bg-dark, 0.18);

    .skill-pill-label {
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    }

    .skill-pill-details {
      background: rgba($txt-light, 0.92);
      font-weight: 700;
    }
  }

  &.skill-pill--compact {
    font-size: 0.78rem;
    padding: 0 0.7em;

    .skill-pill-details {
      gap: 0.35em;
      padding: 0.35em 0.6em;
      margin-left: 0.5em;
      margin-right: -0.5em;
    }

    &.skill-pill--bare {
      padding: 0.3em 0.7em;
    }

    &.skill-pill--experience {
      font-size: 0.82rem;
      padding: 0 0.75em;

      &.skill-pill--bare {
        padding: 0.35em 0.8em;
      }
    }
  }
}
</style>
