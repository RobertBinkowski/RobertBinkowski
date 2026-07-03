<template>
  <div class="skill-pill" :class="pillClasses" :style="pillStyle">
    <span class="skill-pill-label">{{ skill.name }}</span>
    <span v-if="hasDetails" class="skill-pill-details">
      <span v-if="skill.years">{{ formattedYears }}</span>
      <span v-if="skill.years && skill.level" class="divider">•</span>
      <span v-if="skill.level">{{ skill.level }}</span>
    </span>
  </div>
</template>

<script>
const parseHex = (hex) => {
  const normalized = (hex || '').replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((value) => value + value)
          .join('')
      : normalized

  const parsed = Number.parseInt(expanded, 16)
  if (Number.isNaN(parsed)) {
    return null
  }

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  }
}

const darkenHex = (hex, amount = 0.25) => {
  const rgb = parseHex(hex)
  if (!rgb) {
    return hex || '#555'
  }

  const mix = (value) => Math.round(value * (1 - amount))
  const toHex = (value) => value.toString(16).padStart(2, '0')

  return `#${toHex(mix(rgb.r))}${toHex(mix(rgb.g))}${toHex(mix(rgb.b))}`
}

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
      validator: (value) => ['marquee', 'experience'].includes(value),
    },
  },
  computed: {
    hasDetails() {
      return this.variant === 'marquee' && Boolean(this.skill.years || this.skill.level)
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
      const isExperience = this.variant === 'experience'

      if (!color) {
        return {
          backgroundColor: isExperience ? 'rgba(0, 0, 0, 0.06)' : 'gray',
          borderColor: isExperience ? 'rgba(0, 0, 0, 0.12)' : 'darkgray',
          '--pill-label-color': isExperience ? '#333' : '#fff',
        }
      }

      if (isExperience) {
        // Soft tinted fill with a readable dark label.
        return {
          backgroundColor: `${color}22`,
          borderColor: `${color}55`,
          '--pill-label-color': darkenHex(color, 0.45),
        }
      }

      return {
        backgroundColor: `${color}80`,
        borderColor: color,
        '--pill-label-color': '#ffffff',
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
    color: var(--pill-label-color, #{$txt-light});
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
    border-width: 1.5px;
    box-shadow: none;

    .skill-pill-label {
      font-weight: 800;
      letter-spacing: 0.01em;
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
      font-size: 0.92rem;
      padding: 0.4em 0.95em;
    }
  }
}
</style>
