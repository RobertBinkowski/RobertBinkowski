<template>
  <section id="timelineSection">
    <h2 class="timeline-heading">Experience</h2>
    <div class="timeline-graph" :style="graphColumnStyle" ref="timelineGraph">
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
          :y1="trunkLineStart"
          :x2="trunkX"
          :y2="trunkLineEnd"
          :style="{ stroke: trunkColor }"
          :stroke-width="compactGraph ? 3 : 5"
          stroke-linecap="round"
        />
        <circle
          :cx="trunkX"
          :cy="trunkHeadCy"
          :r="trunkHeadRadius"
          :style="{ fill: trunkColor, stroke: 'var(--color-surface)' }"
          :stroke-width="compactGraph ? 2 : 2.5"
        />

        <!-- Continuous education branch (spans every overlapping row) -->
        <g
          v-if="educationBranchOverlay"
          class="global-branch global-branch--education"
          :class="{ 'global-branch--highlighted': isEducationHighlighted }"
        >
          <line
            :x1="educationBranchOverlay.branchX"
            :y1="educationBranchOverlay.lineY1"
            :x2="educationBranchOverlay.branchX"
            :y2="educationBranchOverlay.lineY2"
            :style="{ stroke: educationBranchOverlay.color }"
            :stroke-width="educationBranchOverlay.strokeWidth"
            stroke-linecap="round"
          />
          <path
            v-if="educationBranchOverlay.showMerge"
            :d="educationBranchOverlay.mergePath"
            fill="none"
            :style="{ stroke: educationBranchOverlay.color }"
            :stroke-width="educationBranchOverlay.strokeWidth"
            stroke-linecap="round"
          />
          <path
            v-if="educationBranchOverlay.showFork"
            :d="educationBranchOverlay.forkPath"
            fill="none"
            :style="{ stroke: educationBranchOverlay.color }"
            :stroke-width="educationBranchOverlay.strokeWidth"
            stroke-linecap="round"
          />
          <circle
            v-if="educationBranchOverlay.showMerge"
            :cx="trunkX"
            :cy="educationBranchOverlay.mergeY"
            :r="educationBranchOverlay.junctionRadius"
            :style="{ fill: educationBranchOverlay.color }"
          />
          <circle
            v-if="educationBranchOverlay.showFork"
            :cx="trunkX"
            :cy="educationBranchOverlay.forkY"
            :r="educationBranchOverlay.junctionRadius"
            :style="{ fill: trunkColor }"
          />
          <!-- Role-change dots sit on the branch at the month the role changed. -->
          <circle
            v-for="marker in educationRoleMarkers"
            :key="marker.id"
            :cx="educationBranchOverlay.branchX"
            :cy="marker.y"
            :r="isEducationHighlighted ? (compactGraph ? 4 : 5.5) : compactGraph ? 3.5 : 5"
            :style="{ fill: educationBranchOverlay.color, stroke: 'var(--color-surface)' }"
            :stroke-width="
              isEducationHighlighted ? (compactGraph ? 2 : 2.5) : compactGraph ? 1.5 : 2
            "
          />
        </g>
      </svg>

      <div
        v-if="yearMarkers.length && !compactGraph"
        class="trunk-years"
        :style="{ height: `${trunkHeight}px`, width: `${trunkWidth}px` }"
        aria-hidden="true"
      >
        <span
          v-for="marker in yearMarkers"
          :key="marker.year"
          class="trunk-year"
          :style="{ top: `${marker.y}px`, left: `${trunkX}px` }"
        >
          <span class="trunk-year__pill">{{ marker.year }}</span>
        </span>
      </div>

      <div
        v-for="(item, rowIndex) in timelineItems"
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
            :active-lane-details="item.activeLaneDetails"
            :max-lane="maxLane"
            :main-color="trunkColor"
            :branch-color="item.branch.color || 'var(--color-branch-work)'"
            :height="rowHeights[item.id] || 100"
            :role-changes="roleMarkerFractions[item.id] || []"
            :highlighted="hoveredId === item.id"
            :compact="compactGraph"
            :branch-head-y="branchHeadY"
            :handoff-fork="item.handoffFork"
            :handoff-merge="item.handoffMerge"
            :is-last-row="rowIndex === timelineItems.length - 1"
            :externally-drawn-branch="item.branch.id === 'education'"
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
import {
  GRAPH_CURVE_LEAD,
  GRAPH_LABEL_GUTTER,
  PHONE_BREAKPOINT,
  TRUNK_BOTTOM_PAD,
  branchHeadY as computeBranchHeadY,
  forkCurvePath,
  graphWidth,
  laneX,
  mergeCurvePath,
  mobileGraphWidth,
  mobileLaneX,
  monthToTrunkY,
  trunkHeadMetrics,
} from './graphLayout.js'

const parseMonthValue = (value) => {
  if (!value) {
    return 0
  }

  const [year, month = '01'] = value.split('-')
  return Number(year) * 12 + Number(month)
}

const intervalsOverlap = (leftItem, rightItem) =>
  leftItem.startMonth < rightItem.endMonth && rightItem.startMonth < leftItem.endMonth

// Role changes are the transitions between consecutive roles within one entry.
// They live in time (at the end of the previous role) rather than at the DOM
// position of a role card, so the dot lands where the change actually happened.
const getRoleChanges = (roles) => {
  const ordered = [...(roles || [])]
    .filter((role) => role.start)
    .sort((left, right) => parseMonthValue(left.start) - parseMonthValue(right.start))

  const changes = []

  for (let index = 1; index < ordered.length; index += 1) {
    const previousRole = ordered[index - 1]
    const month = parseMonthValue(previousRole.end)

    if (month > 0) {
      changes.push({
        id: `${previousRole.id}-to-${ordered[index].id}`,
        month,
      })
    }
  }

  return changes
}

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

const sameMonthHandoff = (newerItem, olderItem) => newerItem?.startMonth === olderItem?.endMonth

// Work and education run on fixed parallel lanes so overlapping periods show
// three lines: master trunk, work branch (lane 1), education branch (lane 2).
const BRANCH_LANE = {
  work: 1,
  education: 2,
}

const assignLanes = (items) => {
  const lanes = new Map()

  for (const item of items) {
    lanes.set(item.id, BRANCH_LANE[item.branch.id] ?? 1)
  }

  const maxLane = Math.max(1, ...lanes.values())

  return { lanes, maxLane }
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
      resizeObserver: null,
      compactGraph: false,
      compactMedia: null,
      emPx: 16,
      measuredTrunkHeight: 0,
    }
  },
  computed: {
    trunkColor() {
      return this.mainBranch.color || 'var(--color-trunk)'
    },
    graphColumnStyle() {
      const width = this.compactGraph ? mobileGraphWidth(this.maxLane) : graphWidth(this.maxLane)

      return {
        '--graph-width': `${width}px`,
        '--graph-gutter': `${GRAPH_LABEL_GUTTER}px`,
        '--main-color': this.trunkColor,
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
      return this.compactGraph ? mobileGraphWidth(this.maxLane) : graphWidth(this.maxLane)
    },
    trunkX() {
      return this.compactGraph ? mobileLaneX(0) : laneX(0)
    },
    trunkHeadRadius() {
      return trunkHeadMetrics(this.compactGraph).radius
    },
    trunkHeadCy() {
      return trunkHeadMetrics(this.compactGraph).cy
    },
    trunkLineStart() {
      return trunkHeadMetrics(this.compactGraph).lineStart
    },
    trunkLineEnd() {
      const overlay = this.educationBranchOverlay

      if (overlay?.showFork && overlay.forkY != null) {
        return Math.max(this.trunkLineStart, overlay.forkY)
      }

      return Math.max(this.trunkLineStart, this.trunkHeight - TRUNK_BOTTOM_PAD)
    },
    educationItemId() {
      return this.timelineItems.find((item) => item.branch.id === 'education')?.id ?? null
    },
    isEducationHighlighted() {
      return Boolean(this.educationItemId && this.hoveredId === this.educationItemId)
    },
    branchHeadY() {
      return computeBranchHeadY(this.compactGraph, this.emPx)
    },
    trunkHeight() {
      const rows = this.timelineItems
      if (!rows.length) {
        return 0
      }

      const heights = rows.map((item) => this.rowHeights[item.id] || 0)
      const summed = heights.reduce((sum, height) => sum + height, 0)

      return Math.max(summed, this.measuredTrunkHeight)
    },
    timelineBounds() {
      const items = this.rawItems

      if (!items.length) {
        return null
      }

      const nowMonth = this.currentMonthValue()
      let oldest = Number.POSITIVE_INFINITY
      let newest = Number.NEGATIVE_INFINITY

      for (const item of items) {
        oldest = Math.min(oldest, item.startMonth)
        const end = Number.isFinite(item.endMonth) ? item.endMonth : nowMonth
        newest = Math.max(newest, end)
      }

      if (!Number.isFinite(oldest) || !Number.isFinite(newest) || newest <= oldest) {
        return null
      }

      return { oldest, newest }
    },
    yearMarkers() {
      const bounds = this.timelineBounds
      const height = this.trunkHeight

      if (!bounds || height <= 0) {
        return []
      }

      const { oldest, newest } = bounds
      const span = newest - oldest
      const minY = 14
      const maxY = height - 14
      const markers = []

      for (let year = Math.ceil(newest / 12); year >= Math.floor(oldest / 12); year -= 1) {
        const monthValue = year * 12 + 1
        const y = ((newest - monthValue) / span) * height

        if (y < minY || y > maxY) {
          continue
        }

        markers.push({ year, y })
      }

      return markers
    },
    educationBranchOverlay() {
      const eduLane = BRANCH_LANE.education
      const eduItem = this.timelineItems.find((item) => item.branch.id === 'education')
      const bounds = this.timelineBounds
      const height = this.trunkHeight

      if (!eduItem || !bounds || height <= 0) {
        return null
      }

      const mergeY = monthToTrunkY(eduItem.endMonth, bounds, height)
      const forkY = monthToTrunkY(eduItem.startMonth, bounds, height)

      if (mergeY == null || forkY == null || forkY <= mergeY) {
        return null
      }

      const branchX = this.compactGraph ? mobileLaneX(eduLane) : laneX(eduLane)
      const mainX = this.trunkX
      const color = eduItem.branch.color || 'var(--color-branch-education)'
      const lead = Math.min(
        GRAPH_CURVE_LEAD,
        Math.max(20, (forkY - mergeY) * 0.08),
        Math.max(0, forkY - mergeY - 16) / 2,
      )
      const highlighted = this.isEducationHighlighted
      const strokeWidth = highlighted
        ? this.compactGraph
          ? 4.5
          : 5.5
        : this.compactGraph
          ? 3.5
          : 4

      return {
        branchX,
        mainX,
        color,
        lineY1: mergeY + lead,
        lineY2: forkY - lead,
        mergeY,
        forkY,
        lead,
        mergePath: mergeCurvePath(mainX, branchX, mergeY, lead),
        forkPath: forkCurvePath(mainX, branchX, forkY, lead),
        showMerge: Number.isFinite(eduItem.endMonth),
        showFork: Number.isFinite(eduItem.startMonth),
        junctionRadius: highlighted ? (this.compactGraph ? 4.5 : 7) : this.compactGraph ? 4 : 6,
        strokeWidth,
      }
    },
    roleChangesByItem() {
      const map = {}

      for (const item of this.rawItems) {
        map[item.id] = getRoleChanges(item.entry.roles)
      }

      return map
    },
    // Work branches are drawn per-row, so express each role change as a fraction
    // along the entry's own time span; the row converts it to a local Y offset.
    roleMarkerFractions() {
      const map = {}
      const nowMonth = this.currentMonthValue()

      for (const item of this.rawItems) {
        const effectiveEnd = Number.isFinite(item.endMonth) ? item.endMonth : nowMonth
        const span = effectiveEnd - item.startMonth

        map[item.id] =
          span > 0
            ? (this.roleChangesByItem[item.id] || []).map((change) => ({
                id: change.id,
                fraction: (change.month - item.startMonth) / span,
              }))
            : []
      }

      return map
    },
    // The education branch is drawn on the shared time axis, so its role-change
    // dots are placed by absolute month rather than a per-row fraction.
    educationRoleMarkers() {
      const overlay = this.educationBranchOverlay
      const eduItem = this.timelineItems.find((item) => item.branch.id === 'education')
      const bounds = this.timelineBounds
      const height = this.trunkHeight

      if (!overlay || !eduItem || !bounds || height <= 0) {
        return []
      }

      return (this.roleChangesByItem[eduItem.id] || [])
        .map((change) => ({
          id: change.id,
          y: monthToTrunkY(change.month, bounds, height),
        }))
        .filter((marker) => marker.y != null)
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
          const laneDetailsByLane = new Map()

          for (const activeItem of activeItems) {
            const lane = activeItem.lane
            if (lane <= 0 || laneDetailsByLane.has(lane)) {
              continue
            }

            laneDetailsByLane.set(lane, {
              lane,
              color:
                activeItem.branch.color ||
                (activeItem.branch.id === 'education'
                  ? 'var(--color-branch-education)'
                  : 'var(--color-branch-work)'),
              isOwn: lane === item.lane,
            })
          }

          const activeLaneDetails = [...laneDetailsByLane.values()]
            .filter((detail) => detail.lane !== BRANCH_LANE.education)
            .sort((left, right) => left.lane - right.lane)

          return {
            ...item,
            activeItems,
            activeLaneDetails,
          }
        })

      const reversed = [...sorted].reverse()
      const sectionAnchors = new Set()

      return reversed.map((item, index) => {
        const sectionId =
          item.branch.sectionId && !sectionAnchors.has(item.branch.sectionId)
            ? item.branch.sectionId
            : undefined

        if (sectionId) {
          sectionAnchors.add(item.branch.sectionId)
        }

        const older = reversed[index + 1]
        const newer = reversed[index - 1]

        return {
          ...item,
          sectionId,
          handoffFork: Boolean(older && sameMonthHandoff(item, older)),
          handoffMerge: Boolean(newer && sameMonthHandoff(newer, item)),
        }
      })
    },
  },
  watch: {
    timelineItems: {
      handler() {
        this.$nextTick(() => {
          this.measureRows()
          this.observeRows()
        })
      },
      immediate: true,
    },
  },
  mounted() {
    this.compactMedia = window.matchMedia(`(max-width: ${PHONE_BREAKPOINT}px)`)
    this.syncCompactGraph()
    this.syncEmPx()
    this.compactMedia.addEventListener('change', this.syncCompactGraph)
    window.addEventListener('resize', this.measureRows)
    window.addEventListener('resize', this.syncEmPx)
    this.resizeObserver = new ResizeObserver(() => this.measureRows())
    this.$nextTick(this.observeRows)
  },
  beforeUnmount() {
    this.compactMedia?.removeEventListener('change', this.syncCompactGraph)
    window.removeEventListener('resize', this.measureRows)
    window.removeEventListener('resize', this.syncEmPx)
    this.resizeObserver?.disconnect()
  },
  methods: {
    syncEmPx() {
      this.emPx = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    },
    syncCompactGraph() {
      this.compactGraph = this.compactMedia?.matches ?? false
      this.$nextTick(this.measureRows)
    },
    currentMonthValue() {
      const now = new Date()
      return now.getUTCFullYear() * 12 + (now.getUTCMonth() + 1)
    },
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
          nextHeights[item.id] = Math.max(row.offsetHeight, content?.offsetHeight || 0, 72)
        }
      })

      this.rowHeights = nextHeights

      this.$nextTick(() => {
        const graph = this.$refs.timelineGraph
        this.measuredTrunkHeight = graph?.offsetHeight || 0
      })
    },
    observeRows() {
      if (!this.resizeObserver) {
        return
      }

      this.resizeObserver.disconnect()
      const rows = this.$refs.experienceRows
      const graph = this.$refs.timelineGraph

      if (graph) {
        this.resizeObserver.observe(graph)
      }

      if (!rows) {
        return
      }

      ;(Array.isArray(rows) ? rows : [rows]).forEach((row) => {
        const content = row.querySelector('.experience-content')
        if (content) {
          this.resizeObserver.observe(content)
        }
      })
    },
    branchStyle(branch) {
      const accent = branch.color || 'var(--color-trunk)'

      return {
        '--branch-accent': accent,
        '--branch-accent-soft': `color-mix(in srgb, ${accent} 18%, transparent)`,
        '--branch-accent-faint': `color-mix(in srgb, ${accent} 8%, transparent)`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

#timelineSection {
  --site-rev: 2;
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: auto;
  margin: 0 auto;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow-x: clip;
  scroll-margin-top: 5rem;

  .timeline-heading {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .timeline-graph {
    position: relative;
    display: flex;
    flex-direction: column;
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

    .global-branch {
      opacity: 0.85;
      transition:
        opacity 0.2s ease,
        filter 0.2s ease;

      &.global-branch--highlighted {
        opacity: 1;
        filter: drop-shadow(0 0 4px fade(var(--color-shadow), 0.15));
      }
    }
  }

  .trunk-years {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2;
  }

  .trunk-year {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .trunk-year__pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.22em 0.55em;
    border-radius: 2em;
    background: var(--main-color);
    color: var(--color-text-inverse);
    font-size: 0.8em;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    transform: rotate(-90deg);
    transform-origin: center center;
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
    margin: 0.5em 0;
    padding: 1.15em 1.25em;
    border: none;
    border-radius: 0.9rem;
    background: var(--color-surface);
    box-shadow:
      0 1px 2px fade(var(--color-shadow), 0.04),
      0 4px 12px fade(var(--color-shadow), 0.06),
      0 12px 28px fade(var(--color-shadow), 0.04);
    align-self: start;
    overflow-wrap: anywhere;
    word-break: break-word;
    transition:
      box-shadow $tr-s ease,
      transform $tr-s ease;
  }

  .experience-row--active {
    .experience-content {
      box-shadow:
        0 2px 4px fade(var(--color-shadow), 0.06),
        0 8px 20px fade(var(--color-shadow), 0.1),
        0 16px 36px fade(var(--color-shadow), 0.08);
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
      grid-template-columns: var(--graph-width) minmax(0, 1fr);
      gap: 0.35rem;
    }

    .experience-content {
      padding: 0.75em 0.85em;
    }
  }
}
</style>
