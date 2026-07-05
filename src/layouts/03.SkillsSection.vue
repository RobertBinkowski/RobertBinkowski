<template>
  <section id="skills-section">
    <div
      v-for="(track, trackIdx) in tracks"
      :key="`skills-track-${trackIdx}`"
      class="skills-wrapper"
      :class="{ backwards: trackIdx % 2, 'is-animating': marqueeReady }"
    >
      <skillPill
        v-for="(skill, idx) in track"
        :key="`${skill.name}-${idx}`"
        :skill="skill"
      ></skillPill>
    </div>
  </section>
</template>

<script>
import skillPill from '@/components/skillPill.vue'

const TRACK_COUNT = 4
// The marquee animation translates by -50%, so the content must be an even
// number of identical copies for the loop point to be invisible.
const TRACK_COPIES = 4

export default {
  name: 'SkillsSection',
  components: {
    skillPill,
  },
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      marqueeReady: false,
    }
  },
  mounted() {
    requestAnimationFrame(() => {
      this.marqueeReady = true
    })
  },
  computed: {
    tracks() {
      if (!Array.isArray(this.skills) || !this.skills.length) {
        return []
      }

      const buckets = Array.from({ length: TRACK_COUNT }, () => [])
      this.skills.forEach((skill, index) => {
        buckets[index % TRACK_COUNT].push(skill)
      })

      return buckets
        .filter((bucket) => bucket.length)
        .map((bucket) => Array.from({ length: TRACK_COPIES }, () => bucket).flat())
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#skills-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: min(1000px, 100%);
  gap: 1em;
  min-height: auto;
  max-height: none;
  overflow: hidden;
  box-sizing: border-box;
  padding: 6em 1em;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: min(10rem, 18vw);
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
    animation: none;

    &.is-animating {
      animation: scroll 60s linear infinite;
      animation-play-state: running;
    }

    &:hover {
      animation-play-state: paused;
    }

    // Spacing lives on the pills (not flex gap) so one full copy of the
    // track is exactly half the total width and the loop stays seamless.
    .skill-pill {
      margin-right: 1em;
    }
  }

  .backwards {
    animation-name: scrollBackwards;
  }
}

@media only screen and (max-width: $compact-size) {
  #skills-section {
    padding: 4em 0.75em;

    &::before,
    &::after {
      width: min(4rem, 10vw);
    }

    .skills-wrapper .skill-pill {
      margin-right: 0.65em;
      font-size: 0.85rem;
    }
  }
}
</style>
