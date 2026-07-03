<template>
  <svg
    class="git-graph"
    :class="{ 'git-graph--highlighted': highlighted }"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <!-- Main trunk and parallel branch lanes -->
    <line
      v-for="segment in laneSegments"
      :key="`lane-${segment.lane}-${segment.y1}`"
      :x1="laneX(segment.lane)"
      :y1="segment.y1"
      :x2="laneX(segment.lane)"
      :y2="segment.y2"
      :stroke="segment.lane === 0 ? mainColor : branchColor"
      :stroke-width="strokeWidth(segment.lane)"
      stroke-linecap="round"
      :opacity="segmentOpacity(segment.lane)"
    />

    <!-- Fork at bottom: smooth curve from trunk onto the branch lane -->
    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      :opacity="branchOpacity"
    />

    <!-- Merge at top: smooth curve from branch lane back onto the trunk -->
    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      :opacity="branchOpacity"
    />

    <!-- Fork junction on the trunk (job start) — solid main-colour dot -->
    <circle
      v-if="item.lane > 0 && forksHere"
      :cx="laneX(0)"
      :cy="forkY"
      :r="highlighted ? 7 : 6"
      :fill="mainColor"
    />

    <!-- Merge junction on the trunk (job end) — branch colour where it rejoins -->
    <circle
      v-if="item.lane > 0 && mergesHere"
      :cx="laneX(0)"
      :cy="mergeY"
      :r="highlighted ? 7 : 6"
      :fill="branchColor"
      :opacity="branchOpacity"
    />

    <!-- Current role: HEAD dot at the top of the branch lane -->
    <circle
      v-if="isCurrentRole"
      :cx="laneX(item.lane)"
      :cy="headY"
      :r="highlighted ? 8 : 7"
      :fill="branchColor"
      stroke="#fff"
      :stroke-width="highlighted ? 3 : 2.5"
      :opacity="branchOpacity"
    />
  </svg>
</template>

<script>
const LANE_WIDTH = 18
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
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    width() {
      return (this.maxLane + 1) * LANE_WIDTH + 4
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
      return this.height - CORNER * 2
    },
    mergeY() {
      return CORNER * 2
    },
    headY() {
      return 10
    },
    curveLead() {
      const room = Math.max(0, this.forkY - this.mergeY - 16)
      return Math.min(CURVE_LEAD, Math.max(20, this.height * 0.12), room / 2)
    },
    branchOpacity() {
      return this.highlighted ? 1 : 0.85
    },
    laneSegments() {
      const lead = this.curveLead

      return this.activeLanes.map((lane) => {
        const isOwnLane = lane === this.item.lane
        let y1 = 0
        let y2 = this.height

        // Main trunk always runs the full row height.
        if (lane === 0) {
          return { lane, y1, y2 }
        }

        if (isOwnLane && this.mergesHere) {
          y1 = this.mergeY + lead
        } else if (isOwnLane && this.isCurrentRole) {
          y1 = this.headY
        }

        if (isOwnLane && this.forksHere) {
          y2 = this.forkY - lead
        }

        return { lane, y1, y2 }
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
      return lane * LANE_WIDTH + LANE_WIDTH / 2 + 2
    },
    strokeWidth(lane) {
      if (!this.highlighted) {
        return lane === 0 ? 5 : 4
      }
      return lane === 0 ? 6 : 5
    },
    segmentOpacity(lane) {
      if (this.highlighted && lane === this.item.lane) {
        return 1
      }
      if (this.highlighted && lane === 0) {
        return 0.9
      }
      return lane === 0 ? 1 : 0.85
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
  transition: opacity 0.2s ease;

  &:not(.git-graph--highlighted) {
    opacity: 0.75;
  }

  &.git-graph--highlighted {
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
  }
}
</style>
