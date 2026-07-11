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
      :style="{ stroke: segment.color }"
      :stroke-width="strokeWidth(segment.lane, segment.isOwn)"
      stroke-linecap="round"
      class="git-graph__lane"
      :class="{
        'git-graph__branch': segment.isOwn,
        'git-graph__parallel': !segment.isOwn,
      }"
    />

    <!-- Fork at bottom: smooth curve from trunk onto the branch lane -->
    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :style="{ stroke: branchColor }"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Merge at top: smooth curve from branch lane back onto the trunk -->
    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :style="{ stroke: branchColor }"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Role-change dots along the branch, placed by time (multi-role jobs) -->
    <circle
      v-for="marker in roleChangeDots"
      :key="marker.id"
      :cx="laneX(item.lane)"
      :cy="marker.y"
      :r="roleRadius"
      :style="{ fill: branchColor, stroke: 'var(--color-surface)' }"
      :stroke-width="roleStrokeWidth"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Fork junction on the trunk (job start) — solid main-colour dot -->
    <circle
      v-if="item.lane > 0 && forksHere"
      :cx="laneX(0)"
      :cy="forkY"
      :r="forkRadius"
      :style="{ fill: mainColor }"
    />

    <!-- Merge junction on the trunk (job end) — branch colour where it rejoins -->
    <circle
      v-if="item.lane > 0 && mergesHere"
      :cx="laneX(0)"
      :cy="mergeY"
      :r="forkRadius"
      :style="{ fill: branchColor }"
      class="git-graph__lane git-graph__branch"
    />

    <!-- Current role: HEAD dot at the top of the branch lane -->
    <circle
      v-if="isCurrentRole"
      :cx="laneX(item.lane)"
      :cy="branchHeadY"
      :r="headRadius"
      :style="{ fill: branchColor, stroke: 'var(--color-surface)' }"
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
    activeLaneDetails: {
      type: Array,
      required: true,
    },
    maxLane: {
      type: Number,
      required: true,
    },
    mainColor: {
      type: String,
      default: 'var(--color-trunk)',
    },
    branchColor: {
      type: String,
      default: 'var(--color-branch-work)',
    },
    height: {
      type: Number,
      default: 120,
    },
    roleChanges: {
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
    externallyDrawnBranch: {
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
      return this.item.lane > 0 && !this.externallyDrawnBranch
    },
    mergesHere() {
      return (
        this.item.lane > 0 && Number.isFinite(this.item.endMonth) && !this.externallyDrawnBranch
      )
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
    // Convert each role-change fraction into a Y offset along this row's branch
    // line, running from the fork (start, bottom) up to the branch head/merge.
    roleChangeDots() {
      if (this.externallyDrawnBranch || this.item.lane <= 0) {
        return []
      }

      const bottom = this.forkY
      const top = this.isCurrentRole ? this.branchHeadY : this.mergeY

      return (this.roleChanges || []).map((change) => ({
        id: change.id,
        y: bottom + (top - bottom) * change.fraction,
      }))
    },
    laneSegments() {
      if (this.externallyDrawnBranch) {
        return []
      }

      const lead = this.curveLead

      return (this.activeLaneDetails || []).map(({ lane, color, isOwn }) => {
        let y1 = 0
        let y2 = this.height

        if (isOwn && this.mergesHere) {
          y1 = this.mergeY + lead
        } else if (isOwn && this.isCurrentRole) {
          y1 = this.branchHeadY
        }

        if (isOwn && this.forksHere) {
          y2 = this.forkY - lead
        }

        return { lane, color, isOwn, y1, y2 }
      })
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
    strokeWidth(lane, isOwn = lane === this.item.lane) {
      if (this.compact) {
        return this.highlighted && isOwn ? 3 : 2.5
      }

      if (this.highlighted && isOwn) {
        return 5
      }
      return isOwn ? 4 : 3.5
    },
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.git-graph {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  &__lane {
    opacity: 0.75;
    transition:
      opacity 0.2s ease,
      filter 0.2s ease;
  }

  &__parallel {
    opacity: 0.55;
  }

  &.git-graph--highlighted .git-graph__branch {
    opacity: 1;
    filter: drop-shadow(0 0 4px fade(var(--color-shadow), 0.15));
  }
}
</style>
