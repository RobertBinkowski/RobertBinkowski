<template>
  <article class="timelineObject">
    <header class="entry-header">
      <component :is="brandTag" class="entry-brand" v-bind="brandAttributes">
        <div class="brand-column">
          <div class="brand-logo">
            <img v-if="entry.logo" :src="entry.logo" :alt="`${entry.organization} logo`" />
            <span v-else class="brand-fallback">{{ initials }}</span>
          </div>
          <p v-if="entryPeriod" class="entry-period">
            <span class="entry-period-line"
              >{{ formatMonthYear(entryPeriod.start) }} -
              {{ entryPeriod.end ? formatMonthYear(entryPeriod.end) : 'Present' }}</span
            >
          </p>
        </div>

        <div class="entry-copy">
          <div class="entry-name-row">
            <p class="entry-name">{{ entry.organization }}</p>
            <span v-if="branchLabel" class="branch-badge">{{ branchLabel }}</span>
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
          <div class="role-copy">
            <h4 class="role-title">{{ displayRole.title }}</h4>
            <p v-if="displayRole.subtitle" class="role-subtitle">{{ displayRole.subtitle }}</p>
          </div>
          <p class="role-period">
            {{ formatMonthYear(displayRole.start) }} -
            {{ displayRole.end ? formatMonthYear(displayRole.end) : 'Present' }}
          </p>
        </div>

        <p v-if="displayRole.summary" class="role-summary">
          {{ displayRole.summary }}
        </p>

        <ul v-if="displayRole.highlights && displayRole.highlights.length" class="role-highlights">
          <li v-for="highlight in displayRole.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>

        <div v-if="displayRole.stack && displayRole.stack.length" class="role-stack">
          <span v-for="skill in displayRole.stack" :key="skill">{{ skill }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
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
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.timelineObject {
  max-width: 100%;
  min-width: 0;

  .entry-header {
    margin-bottom: 0.5rem;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
    margin: 0;
    width: auto;
    max-width: 100%;
    color: $txt-grey;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.25;
    text-align: center;
  }

  .entry-period-line {
    display: block;
    font-size: 0.75rem;
    line-height: 1.3;
    text-align: left;
    overflow-wrap: anywhere;
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

  // When one job holds several roles, draw a small git-style lane connecting them.
  .role-list--linked {
    .role-card {
      position: relative;
      padding-left: 1.35rem;

      // Node marker aligned with the role title.
      &::before {
        content: '';
        position: absolute;
        left: 0;
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
        left: 3.5px;
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

  .role-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .role-copy {
    min-width: 0;
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
    font-size: 0.92rem;
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
    gap: 0.4rem;
    margin-top: 0.85rem;
    padding-top: 0.65rem;
    border-top: 1px solid rgba($txt-grey, 0.15);

    span {
      padding: 0.3rem 0.65rem;
      border: 1px solid var(--branch-accent-soft);
      border-radius: 999px;
      background: var(--branch-accent-faint);
      color: $txt;
      font-size: 0.82rem;
      font-weight: 700;
      line-height: 1.2;
    }
  }
}

@media only screen and (max-width: $compact-size) {
  .timelineObject {
    .entry-brand {
      align-items: flex-start;
    }

    .entry-period {
      font-size: 0.68rem;
    }

    .role-stack span {
      font-size: 0.78rem;
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

    .entry-period {
      flex: 1;
      align-items: flex-start;
      text-align: left;
    }

    .entry-period-line {
      text-align: left;
    }

    .role-header {
      flex-direction: column;
    }

    .role-period {
      align-self: flex-start;
      white-space: normal;
    }
  }
}
</style>
