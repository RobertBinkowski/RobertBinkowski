<template>
  <svg
    class="git-graph"
    :class="{ 'git-graph--highlighted': highlighted }"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <!-- Parallel branch lanes (main trunk is drawn once in TimelineSection) -->
    <line
      v-for="segment in laneSegments"
      :key="`lane-${segment.lane}-${segment.y1}`"
      :x1="laneX(segment.lane)"
      :y1="segment.y1"
      :x2="laneX(segment.lane)"
      :y2="segment.y2"
      :stroke="branchColor"
      :stroke-width="strokeWidth(segment.lane)"
      stroke-linecap="round"
      class="git-graph__lane"
      :class="{ 'git-graph__branch': segment.lane === item.lane }"
    />

    <!-- Fork at bottom: smooth curve from trunk onto the branch lane -->
    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Merge at top: smooth curve from branch lane back onto the trunk -->
    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Role milestones along the branch (multi-role jobs) -->
    <circle
      v-for="marker in roleMarkers"
      :key="marker.roleId"
      :cx="laneX(item.lane)"
      :cy="marker.y"
      :r="roleRadius"
      :fill="branchColor"
      stroke="#fff"
      :stroke-width="roleStrokeWidth"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Fork junction on the trunk (job start) — solid main-colour dot -->
    <circle
      v-if="item.lane > 0 && forksHere"
      :cx="laneX(0)"
      :cy="forkY"
      :r="forkRadius"
      :fill="mainColor"
    />

    <!-- Merge junction on the trunk (job end) — branch colour where it rejoins -->
    <circle
      v-if="item.lane > 0 && mergesHere"
      :cx="laneX(0)"
      :cy="mergeY"
      :r="forkRadius"
      :fill="branchColor"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Current role: HEAD dot at the top of the branch lane -->
    <circle
      v-if="isCurrentRole"
      :cx="laneX(item.lane)"
      :cy="branchHeadY"
      :r="headRadius"
      :fill="branchColor"
      stroke="#fff"
      :stroke-width="headStrokeWidth"
      class="git-graph__lane git-graph__branch"
    />
  </svg>
</template>

<script>
import { graphWidth, laneX as graphLaneX, mobileGraphWidth, mobileLaneX } from './graphLayout.js'

const CORNER = 10
// ~2em of vertical run before a fork/merge curve begins (viewBox units ≈ px).
const CURVE_LEAD = 32

export default {
  name: 'TimelineGraphRow',
  props: {
    item: {
      type: Object,
      required: true,
    },
    activeLanes: {
      type: Array,
      required: true,
    },
    maxLane: {
      type: Number,
      required: true,
    },
    mainColor: {
      type: String,
      default: '#005b90',
    },
    branchColor: {
      type: String,
      default: '#2b9b62',
    },
    height: {
      type: Number,
      default: 120,
    },
    roleMarkers: {
      type: Array,
      default: () => [],
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    branchHeadY: {
      type: Number,
      required: true,
    },
    handoffFork: {
      type: Boolean,
      default: false,
    },
    handoffMerge: {
      type: Boolean,
      default: false,
    },
    isLastRow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    width() {
      return this.compact ? mobileGraphWidth(this.maxLane) : graphWidth(this.maxLane)
    },
    roleRadius() {
      if (this.compact) {
        return this.highlighted ? 4 : 3.5
      }

      return this.highlighted ? 6 : 5
    },
    roleStrokeWidth() {
      if (this.compact) {
        return this.highlighted ? 2 : 1.5
      }

      return this.highlighted ? 2.5 : 2
    },
    forkRadius() {
      return this.compact ? 4 : 6
    },
    headRadius() {
      if (this.compact) {
        return this.highlighted ? 5 : 4.5
      }

      return this.highlighted ? 8 : 7
    },
    headStrokeWidth() {
      if (this.compact) {
        return this.highlighted ? 2 : 1.75
      }

      return this.highlighted ? 3 : 2.5
    },
    forksHere() {
      return this.item.lane > 0
    },
    mergesHere() {
      return this.item.lane > 0 && Number.isFinite(this.item.endMonth)
    },
    isCurrentRole() {
      return this.item.lane > 0 && !Number.isFinite(this.item.endMonth)
    },
    forkY() {
      if (this.handoffFork || this.isLastRow) {
        return this.height
      }

      return this.height - CORNER * 2
    },
    mergeY() {
      return this.handoffMerge ? 0 : CORNER * 2
    },
    curveLead() {
      const room = Math.max(0, this.forkY - this.mergeY - 16)
      return Math.min(CURVE_LEAD, Math.max(20, this.height * 0.12), room / 2)
    },
    laneSegments() {
      const lane = this.item.lane
      if (lane <= 0) {
        return []
      }

      const lead = this.curveLead
      let y1 = 0
      let y2 = this.height

      if (this.mergesHere) {
        y1 = this.mergeY + lead
      } else if (this.isCurrentRole) {
        y1 = this.branchHeadY
      }

      if (this.forksHere) {
        y2 = this.forkY - lead
      }

      return [{ lane, y1, y2 }]
    },
    forkPath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const j = this.forkY
      const lead = this.curveLead
      const dx = Math.max(branchX - mainX, 1)

      // Curve begins on the branch ~2em above the junction, easing onto the trunk.
      return `M ${branchX} ${j - lead} C ${branchX} ${j - lead * 0.35} ${branchX - dx * 0.25} ${j - 6} ${mainX} ${j}`
    },
    mergePath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const j = this.mergeY
      const lead = this.curveLead
      const dx = Math.max(branchX - mainX, 1)

      // Curve begins on the branch ~2em below the junction, easing onto the trunk.
      return `M ${branchX} ${j + lead} C ${branchX} ${j + lead * 0.35} ${branchX - dx * 0.25} ${j + 6} ${mainX} ${j}`
    },
  },
  methods: {
    laneX(lane) {
      return this.compact ? mobileLaneX(lane) : graphLaneX(lane)
    },
    strokeWidth(lane) {
      if (this.compact) {
        return this.highlighted && lane === this.item.lane ? 3 : 2.5
      }

      if (this.highlighted && lane === this.item.lane) {
        return 5
      }
      return 4
    },
  },
}
</script>

<style lang="scss" scoped>
.git-graph {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  &__lane {
    opacity: 0.75;
    transition: opacity 0.2s ease, filter 0.2s ease;
  }

  &.git-graph--highlighted .git-graph__branch {
    opacity: 1;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
  }
}
</style>
