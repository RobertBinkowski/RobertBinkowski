<template>
  <article class="timelineObject">
    <header class="entry-header">
      <component :is="brandTag" class="entry-brand" v-bind="brandAttributes">
        <div class="brand-column">
          <div class="brand-logo">
            <img v-if="entry.logo" :src="entry.logo" :alt="`${entry.organization} logo`" />
            <span v-else class="brand-fallback">{{ initials }}</span>
          </div>
        </div>

        <div class="entry-copy">
          <div class="entry-name-row">
            <p class="entry-name">{{ entry.organization }}</p>
            <span v-if="branchLabel" class="branch-badge">{{ branchLabel }}</span>
            <p v-if="showEntryPeriod" class="entry-period">
              {{ formatMonthYear(entryPeriod.start) }} -
              {{ entryPeriod.end ? formatMonthYear(entryPeriod.end) : 'Present' }}
            </p>
          </div>
          <p v-if="entry.tagline" class="entry-tagline">{{ entry.tagline }}</p>
          <div v-if="metaItems.length" class="entry-meta">
            <span v-for="(item, index) in metaItems" :key="`${item}-${index}`">
              {{ item }}<span v-if="index < metaItems.length - 1" class="separator">•</span>
            </span>
          </div>
        </div>
      </component>
    </header>

    <div class="role-list" :class="{ 'role-list--linked': displayRoles.length > 1 }">
      <div v-for="displayRole in displayRoles" :key="displayRole.id" class="role-card">
        <div class="role-header">
          <h4 class="role-title">{{ displayRole.title }}</h4>
          <p v-if="roleDateLabel(displayRole)" class="role-period">
            {{ roleDateLabel(displayRole) }}
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
    showEntryPeriod() {
      return this.displayRoles.length > 1 && this.entryPeriod
    },
    brandAttributes() {
      if (!this.entry.website) {
        return {}
      }

      return {
        href: this.entry.website,
        target: '_blank',
        rel: 'noreferrer noopener',
      }
    },
    brandTag() {
      return this.entry.website ? 'a' : 'div'
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
    roleDateLabel(role) {
      if (this.displayRoles.length > 1) {
        return this.formatRoleDuration(role.start, role.end)
      }

      return `${this.formatMonthYear(role.start)} - ${
        role.end ? this.formatMonthYear(role.end) : 'Present'
      }`
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
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--branch-accent-soft);
  }

  .entry-brand {
    display: flex;
    gap: 0.65rem;
    align-items: flex-start;
    color: inherit;
    text-decoration: none;
    min-width: 0;
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
    color: $txt;
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
    color: $txt-grey;
    font-size: 0.88rem;
    line-height: 1.3;
  }

  .entry-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: 0.2rem;
    color: $txt-grey;
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
      margin-top: 0.85rem;
      padding-top: 0.85rem;
      border-top: 1px solid rgba($txt-grey, 0.15);
    }
  }

  // When one job holds several roles, draw a small git-style lane connecting
  // them. The lane lives in a gutter left of the cards (margin, not padding)
  // so the separator border between roles never crosses it.
  .role-list--linked {
    .role-card {
      position: relative;
      margin-left: 1.35rem;

      // Node marker aligned with the role title.
      &::before {
        content: '';
        position: absolute;
        left: -1.35rem;
        top: 0.2rem;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--branch-accent);
        box-shadow: 0 0 0 2px $txt-light;
        z-index: 1;
      }

      & + .role-card::before {
        top: 1.05rem;
      }

      // Connector line running from this role's node to the next one.
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        left: calc(-1.35rem + 3.5px);
        top: calc(0.2rem + 5px);
        bottom: calc(-1.9rem - 5px);
        width: 3px;
        border-radius: 999px;
        background: var(--branch-accent);
        opacity: 0.35;
      }

      & + .role-card:not(:last-child)::after {
        top: calc(1.05rem + 5px);
      }
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
    color: $txt-grey;
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

    li::marker {
      color: var(--branch-accent);
    }
  }

  .role-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.85rem;
    padding-top: 0.65rem;
    border-top: 1px solid rgba($txt-grey, 0.15);
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
