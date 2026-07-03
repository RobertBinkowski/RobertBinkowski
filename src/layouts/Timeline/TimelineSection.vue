<template>
  <section id="timelineSection">
    <div class="timeline-graph" :style="graphColumnStyle">
      <!-- Single continuous main trunk behind all rows -->
      <svg
        v-if="trunkHeight > 0"
        class="main-trunk"
        :style="{ height: `${trunkHeight}px` }"
        :viewBox="`0 0 ${trunkWidth} ${trunkHeight}`"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          :x1="trunkX"
          :y1="0"
          :x2="trunkX"
          :y2="trunkHeight"
          :stroke="mainBranch.color || '#005b90'"
          stroke-width="5"
          stroke-linecap="round"
        />
      </svg>

      <div
        v-for="item in timelineItems"
        :id="item.sectionId"
        :key="item.id"
        class="experience-row"
        :class="{ 'experience-row--active': hoveredId === item.id }"
        :style="branchStyle(item.branch)"
        ref="experienceRows"
        @mouseenter="hoveredId = item.id"
        @mouseleave="hoveredId = null"
      >
        <div class="graph-column">
          <TimelineGraphRow
            :item="item"
            :active-lanes="item.activeLanes"
            :max-lane="maxLane"
            :main-color="mainBranch.color || '#005b90'"
            :branch-color="item.branch.color || '#2b9b62'"
            :height="rowHeights[item.id] || 100"
            :highlighted="hoveredId === item.id"
          />
        </div>

        <div class="experience-content">
          <TimelineObject
            :branch="item.branch"
            :entry="item.entry"
            :branch-label="item.branch.label"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TimelineGraphRow from './TimelineGraphRow.vue'
import TimelineObject from './TimelineObject.vue'

const LANE_WIDTH = 18
const ROW_GAP = 8 // matches .timeline-graph gap (0.5rem)

const parseMonthValue = (value) => {
  if (!value) {
    return 0
  }

  const [year, month = '01'] = value.split('-')
  return Number(year) * 12 + Number(month)
}

const intervalsOverlap = (leftItem, rightItem) =>
  leftItem.startMonth < rightItem.endMonth && rightItem.startMonth < leftItem.endMonth

const getEntrySpan = (roles) => {
  if (!roles?.length) {
    return {
      startMonth: 0,
      endMonth: 0,
    }
  }

  const startMonth = Math.min(...roles.map((role) => parseMonthValue(role.start)))
  const hasOpenRole = roles.some((role) => !role.end)
  const endMonth = hasOpenRole
    ? Number.POSITIVE_INFINITY
    : Math.max(...roles.map((role) => parseMonthValue(role.end)))

  return { startMonth, endMonth }
}

const assignLanes = (items) => {
  const sorted = [...items].sort((left, right) => left.startMonth - right.startMonth)
  const laneEnds = []
  const lanes = new Map()

  for (const item of sorted) {
    let lane = 1

    while (lane < laneEnds.length && laneEnds[lane] > item.startMonth) {
      lane += 1
    }

    laneEnds[lane] = item.endMonth
    lanes.set(item.id, lane)
  }

  return {
    lanes,
    maxLane: Math.max(1, laneEnds.length - 1),
  }
}

export default {
  name: 'TimelineSection',
  components: {
    TimelineGraphRow,
    TimelineObject,
  },
  props: {
    mainBranch: {
      type: Object,
      required: true,
    },
    branches: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rowHeights: {},
      hoveredId: null,
    }
  },
  computed: {
    graphColumnStyle() {
      const width = (this.maxLane + 1) * 18 + 4

      return {
        '--graph-width': `${width}px`,
      }
    },
    rawItems() {
      const items = []

      for (const branch of this.branches) {
        for (const entry of branch.entries || []) {
          const roles = entry.roles || []
          const { startMonth, endMonth } = getEntrySpan(roles)

          items.push({
            id: entry.id,
            branch,
            entry,
            startMonth,
            endMonth,
          })
        }
      }

      return items
    },
    laneData() {
      return assignLanes(this.rawItems)
    },
    maxLane() {
      return this.laneData.maxLane
    },
    trunkWidth() {
      return (this.maxLane + 1) * LANE_WIDTH + 4
    },
    trunkX() {
      return LANE_WIDTH / 2 + 2
    },
    trunkHeight() {
      const rows = this.timelineItems
      if (!rows.length) {
        return 0
      }

      const heights = rows.map((item) => this.rowHeights[item.id] || 0)
      const total = heights.reduce((sum, height) => sum + height, 0)
      return total + ROW_GAP * Math.max(rows.length - 1, 0)
    },
    timelineItems() {
      const { lanes } = this.laneData

      const enriched = this.rawItems.map((item) => ({
        ...item,
        lane: lanes.get(item.id) || 1,
      }))

      const sorted = enriched
        .sort((left, right) => left.startMonth - right.startMonth)
        .map((item) => {
          const activeItems = enriched.filter((candidate) => intervalsOverlap(item, candidate))
          const activeLanes = [0]

          for (const activeItem of activeItems) {
            const lane = activeItem.lane
            if (!activeLanes.includes(lane)) {
              activeLanes.push(lane)
            }
          }

          activeLanes.sort((left, right) => left - right)

          return {
            ...item,
            activeItems,
            activeLanes,
          }
        })

      const reversed = [...sorted].reverse()
      const sectionAnchors = new Set()

      return reversed.map((item) => {
        const sectionId =
          item.branch.sectionId && !sectionAnchors.has(item.branch.sectionId)
            ? item.branch.sectionId
            : undefined

        if (sectionId) {
          sectionAnchors.add(item.branch.sectionId)
        }

        return {
          ...item,
          sectionId,
        }
      })
    },
  },
  watch: {
    timelineItems: {
      handler() {
        this.$nextTick(this.measureRows)
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.measureRows)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.measureRows)
  },
  methods: {
    measureRows() {
      const rows = this.$refs.experienceRows

      if (!rows) {
        return
      }

      const nextHeights = {}

      ;(Array.isArray(rows) ? rows : [rows]).forEach((row, index) => {
        const item = this.timelineItems[index]
        if (item && row) {
          const content = row.querySelector('.experience-content')
          nextHeights[item.id] = Math.max(content?.offsetHeight || row.offsetHeight, 72)
        }
      })

      this.rowHeights = nextHeights
    },
    branchStyle(branch) {
      const accent = branch.color || '#005b90'

      return {
        '--branch-accent': accent,
        '--branch-accent-soft': this.hexToRgba(accent, 0.18),
        '--branch-accent-faint': this.hexToRgba(accent, 0.08),
      }
    },
    hexToRgba(hex, alpha) {
      const normalized = hex.replace('#', '')
      const expanded =
        normalized.length === 3
          ? normalized
              .split('')
              .map((value) => value + value)
              .join('')
          : normalized

      const parsed = Number.parseInt(expanded, 16)

      if (Number.isNaN(parsed)) {
        return `rgba(0, 91, 144, ${alpha})`
      }

      const red = (parsed >> 16) & 255
      const green = (parsed >> 8) & 255
      const blue = parsed & 255

      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#timelineSection {
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: auto;
  margin: 0 auto;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow-x: clip;
  scroll-margin-top: 5rem;

  .timeline-graph {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 100%;
  }

  .main-trunk {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--graph-width);
    pointer-events: none;
    z-index: 0;
  }

  .experience-row {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: var(--graph-width) minmax(0, 1fr);
    gap: 0.5rem;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    scroll-margin-top: 5rem;
  }

  .graph-column {
    position: relative;
    align-self: stretch;
    min-width: 0;
    overflow: visible;

    :deep(.git-graph) {
      position: absolute;
      inset: 0;
    }
  }

  .experience-content {
    min-width: 0;
    max-width: 100%;
    padding: 1.15em 1.25em;
    border: none;
    border-radius: 0.9rem;
    background: $txt-light;
    box-shadow:
      0 1px 2px rgba($bg-dark, 0.04),
      0 4px 12px rgba($bg-dark, 0.06),
      0 12px 28px rgba($bg-dark, 0.04);
    align-self: start;
    overflow-wrap: anywhere;
    word-break: break-word;
    transition: box-shadow $tr-s ease, transform $tr-s ease;
  }

  .experience-row--active {
    .experience-content {
      box-shadow:
        0 2px 4px rgba($bg-dark, 0.06),
        0 8px 20px rgba($bg-dark, 0.1),
        0 16px 36px rgba($bg-dark, 0.08);
      transform: translateY(-1px);
    }
  }
}

@media only screen and (max-width: $compact-size) {
  #timelineSection {
    padding: 0.35rem;

    .experience-row {
      gap: 0.35rem;
    }

    .experience-content {
      padding: 0.75em;
    }
  }
}

@media only screen and (max-width: $phone-size) {
  #timelineSection {
    .experience-row {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.25rem;
    }

    .graph-column {
      display: none;
    }
  }
}
</style>
