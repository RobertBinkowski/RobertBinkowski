<template>
  <article class="timelineObject">
    <header class="entry-header">
      <div class="entry-brand">
        <div class="brand-column">
          <div class="brand-logo">
            <img
              v-if="entry.logo"
              :src="entry.logo"
              :alt="`${entry.organization} logo`"
              width="80"
              height="80"
            />
            <span v-else class="brand-fallback">{{ initials }}</span>
          </div>
        </div>

        <div class="entry-copy">
          <div class="entry-name-row">
            <p class="entry-name">{{ entry.organization }}</p>
            <span v-if="branchLabel" class="branch-badge">{{ branchLabel }}</span>
            <p v-if="entryPeriodLabel" class="entry-period">{{ entryPeriodLabel }}</p>
          </div>
          <p v-if="entry.tagline" class="entry-tagline">{{ entry.tagline }}</p>
          <div v-if="metaItems.length" class="entry-meta">
            <span v-for="(item, index) in metaItems" :key="`${item}-${index}`">
              {{ item }}<span v-if="index < metaItems.length - 1" class="separator">•</span>
            </span>
          </div>
        </div>
      </div>

      <a
        v-if="entry.website"
        class="entry-link-btn"
        :href="entry.website"
        target="_blank"
        rel="noreferrer noopener"
        :aria-label="`Visit ${entry.organization} website`"
      >
        <svg class="entry-link-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 3h7v7M10 14 21 3M15 3h6v6M21 3l-9 9"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </header>

    <div class="role-list">
      <div
        v-for="displayRole in displayRoles"
        :key="displayRole.id"
        class="role-card"
        :data-role-id="displayRole.id"
      >
        <div class="role-header">
          <h3 class="role-title">{{ displayRole.title }}</h3>
          <p v-if="roleDurationLabel(displayRole)" class="role-period">
            {{ roleDurationLabel(displayRole) }}
          </p>
        </div>
        <p v-if="displayRole.subtitle" class="role-subtitle">{{ displayRole.subtitle }}</p>

        <p v-if="displayRole.summary" class="role-summary">
          {{ displayRole.summary }}
        </p>

        <ul v-if="displayRole.highlights && displayRole.highlights.length" class="role-highlights">
          <li v-for="highlight in displayRole.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>

        <div v-if="displayRole.stack && displayRole.stack.length" class="role-stack">
          <skillPill
            v-for="skill in stackSkills(displayRole)"
            :key="skill.name"
            :skill="skill"
            variant="experience"
            :compact="true"
          ></skillPill>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import skillPill from '@/components/skillPill.vue'
import { resolveSkill } from '@/data/skills'

const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
})

const parseMonthValue = (value) => {
  if (!value) {
    return 0
  }

  const [year, month = '01'] = value.split('-')
  return Number(year) * 12 + Number(month)
}

const compareRoles = (leftRole, rightRole) => {
  const leftEnd = leftRole?.end ? parseMonthValue(leftRole.end) : Number.POSITIVE_INFINITY
  const rightEnd = rightRole?.end ? parseMonthValue(rightRole.end) : Number.POSITIVE_INFINITY

  if (leftEnd !== rightEnd) {
    return rightEnd - leftEnd
  }

  return parseMonthValue(rightRole?.start) - parseMonthValue(leftRole?.start)
}

export default {
  name: 'TimelineObject',
  components: {
    skillPill,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
    entry: {
      type: Object,
      required: true,
    },
    branchLabel: {
      type: String,
      default: '',
    },
  },
  computed: {
    entryPeriod() {
      const roles = this.entry.roles || []
      if (!roles.length) {
        return null
      }

      const start = roles.reduce(
        (earliest, role) => (!earliest || role.start < earliest ? role.start : earliest),
        null,
      )
      const hasOpenRole = roles.some((role) => !role.end)
      const end = hasOpenRole
        ? null
        : roles.reduce(
            (latest, role) => (!latest || role.end > latest ? role.end : latest),
            null,
          )

      return { start, end }
    },
    displayRoles() {
      return [...(this.entry.roles || [])].sort(compareRoles)
    },
    entryPeriodLabel() {
      if (!this.entryPeriod) {
        return ''
      }

      const endLabel = this.entryPeriod.end
        ? this.formatMonthYear(this.entryPeriod.end)
        : 'Present'

      return `${this.formatMonthYear(this.entryPeriod.start)} - ${endLabel}`
    },
    initials() {
      return (this.entry.organization || '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('')
    },
    metaItems() {
      return [this.entry.location, this.entry.mode, this.entry.engagement].filter(Boolean)
    },
  },
  methods: {
    formatMonthYear(value) {
      if (!value) {
        return 'Present'
      }

      const [year, month = '01'] = value.split('-').map(Number)
      return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)))
    },
    stackSkills(role) {
      return (role.stack || []).map((name) => resolveSkill(name) || { name })
    },
    roleDurationLabel(role) {
      return this.formatRoleDuration(role.start, role.end)
    },
    formatRoleDuration(start, end) {
      const startMonths = parseMonthValue(start)
      const endMonths = end ? parseMonthValue(end) : parseMonthValue(this.currentMonth())
      const totalMonths = Math.max(endMonths - startMonths, 1)

      if (totalMonths < 12) {
        return `${totalMonths} mos`
      }

      const years = Math.floor(totalMonths / 12)
      const months = totalMonths % 12

      if (!months) {
        return `${years} yr${years === 1 ? '' : 's'}`
      }

      return `${years} yr${years === 1 ? '' : 's'} ${months} mo${months === 1 ? '' : 's'}`
    },
    currentMonth() {
      const now = new Date()
      const month = String(now.getUTCMonth() + 1).padStart(2, '0')
      return `${now.getUTCFullYear()}-${month}`
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.timelineObject {
  max-width: 100%;
  min-width: 0;

  .entry-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
    padding-bottom: 0;
    border-bottom: none;
  }

  .entry-brand {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    min-width: 0;
    flex: 1;
  }

  .entry-link-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--branch-accent-soft);
    border-radius: 0.55rem;
    background: var(--branch-accent-faint);
    color: var(--branch-accent);
    text-decoration: none;
    transition:
      background $tr-s ease,
      border-color $tr-s ease,
      color $tr-s ease,
      transform $tr-s ease;

    &:hover {
      background: var(--branch-accent-soft);
      border-color: var(--branch-accent);
      transform: translateY(-1px);
    }

    &:focus-visible {
      outline: 2px solid var(--branch-accent);
      outline-offset: 2px;
    }
  }

  .entry-link-icon {
    width: 1.05rem;
    height: 1.05rem;
  }

  .brand-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    width: auto;
    max-width: 100%;
    gap: 0.35rem;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    max-height: 5rem;
    max-width: 100%;

    img {
      display: block;
      height: 5rem;
      width: auto;
      max-width: 100%;
      object-fit: contain;
      box-sizing: border-box;
      background: transparent;
    }
  }

  .brand-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    padding: 0.35rem 0.5rem;
    color: var(--branch-accent);
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .entry-period {
    margin: 0;
    padding: 0.12rem 0.45rem;
    border: 1px solid var(--branch-accent-soft);
    border-radius: 999px;
    background: var(--branch-accent-faint);
    color: var(--branch-accent);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.2;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .entry-copy {
    min-width: 0;
    flex: 1;
  }

  .entry-name-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }

  .entry-name {
    margin: 0;
    color: var(--color-text);
    font-size: clamp(1rem, 3.5vw, 1.3rem);
    font-weight: 900;
    overflow-wrap: anywhere;
  }

  .branch-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.12rem 0.4rem;
    border: 1px solid var(--branch-accent-soft);
    border-radius: 999px;
    background: var(--branch-accent-faint);
    color: var(--branch-accent);
    font-size: 0.72rem;
    flex-shrink: 0;
  }

  .entry-tagline {
    margin: 0.1rem 0 0;
    color: var(--color-text-muted);
    font-size: 0.88rem;
    line-height: 1.3;
  }

  .entry-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: 0.2rem;
    color: var(--color-text-muted);
    font-size: 0.8rem;
    overflow-wrap: anywhere;
  }

  .separator {
    margin-left: 0.25rem;
  }

  .role-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .role-card {
    display: block;
    min-height: 0;
    margin: 0;
    padding: 0;

    & + .role-card {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: none;
      box-shadow: inset 0 8px 8px -8px fade(var(--color-shadow), 0.08);
    }
  }

  // Title and dates sit side by side and wrap together on narrow screens.
  .role-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3rem 0.6rem;
    margin-bottom: 0.25rem;
  }

  .role-period {
    flex-shrink: 0;
    margin: 0;
    padding: 0.15rem 0.45rem;
    border: 1px solid var(--branch-accent-soft);
    border-radius: 999px;
    background: var(--branch-accent-faint);
    color: var(--branch-accent);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.2;
    white-space: nowrap;
  }

  .role-title {
    margin: 0;
    color: var(--branch-accent);
    font-size: 1rem;
    font-weight: 800;
  }

  .role-subtitle {
    margin: 0.15rem 0 0;
    color: var(--color-text-muted);
    font-size: 0.82rem;
  }

  .role-summary {
    margin: 0.25rem 0 0;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .role-highlights {
    display: grid;
    gap: 0.2rem;
    margin: 0.35rem 0 0;
    padding-left: 1rem;
    list-style: disc;
    font-size: 0.85rem;
    line-height: 1.4;

    li {
      padding: 0;
      border-radius: 0;
      transition: none;

      &:hover {
        background: none;
      }

      &::marker {
        color: var(--branch-accent);
      }
    }
  }

  .role-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.85rem;
    padding-top: 0.75rem;
    border-top: none;
    box-shadow: inset 0 6px 6px -6px fade(var(--color-shadow), 0.06);
  }
}

@media only screen and (max-width: $compact-size) {
  .timelineObject {
    .entry-brand {
      align-items: flex-start;
    }
  }
}

@media only screen and (max-width: $phone-size) {
  .timelineObject {
    .entry-brand {
      flex-direction: column;
      align-items: stretch;
    }

    .brand-column {
      flex-direction: row;
      align-items: center;
      width: 100%;
      max-width: 100%;
      gap: 0.5rem;
    }

    .brand-logo {
      max-height: 3rem;

      img {
        height: 3rem;
      }
    }

    .brand-fallback {
      min-width: 2.5rem;
      min-height: 2.5rem;
    }

    .role-period {
      white-space: normal;
    }
  }
}
</style>
