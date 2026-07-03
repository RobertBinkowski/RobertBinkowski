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

    <!-- Fork: trunk → branch lane (smooth git-style curve) -->
    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      :opacity="branchOpacity"
    />

    <!-- Merge: branch lane → trunk -->
    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :stroke="branchColor"
      :stroke-width="strokeWidth(item.lane)"
      stroke-linecap="round"
      :opacity="branchOpacity"
    />

    <!-- Junction rings on the trunk where branches fork / merge -->
    <g v-if="item.lane > 0 && forksHere" class="junction">
      <circle
        :cx="laneX(0)"
        :cy="forkY"
        :r="9"
        fill="none"
        :stroke="mainColor"
        :stroke-width="highlighted ? 3 : 2.5"
      />
      <circle :cx="laneX(0)" :cy="forkY" :r="5" :fill="mainColor" />
    </g>

    <g v-if="item.lane > 0 && mergesHere" class="junction">
      <circle
        :cx="laneX(0)"
        :cy="mergeY"
        :r="9"
        fill="none"
        :stroke="mainColor"
        :stroke-width="highlighted ? 3 : 2.5"
      />
      <circle :cx="laneX(0)" :cy="mergeY" :r="5" :fill="mainColor" />
    </g>

    <!-- Commit dot on the branch lane (job start, bottom of row) -->
    <circle
      v-if="item.lane > 0"
      :cx="laneX(item.lane)"
      :cy="commitY"
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
      // Each finished job merges back into the trunk; open roles stay on the branch.
      return this.item.lane > 0 && Number.isFinite(this.item.endMonth)
    },
    forkY() {
      return CORNER * 2
    },
    mergeY() {
      return this.height - CORNER * 2
    },
    commitY() {
      return this.mergesHere ? this.mergeY - CORNER : this.height - 14
    },
    branchOpacity() {
      return this.highlighted ? 1 : 0.85
    },
    laneSegments() {
      const forkPad = CORNER * 2
      const mergePad = CORNER * 2

      return this.activeLanes.map((lane) => {
        const isOwnLane = lane === this.item.lane
        let y1 = 0
        let y2 = this.height

        if (lane === 0) {
          return { lane, y1, y2 }
        }

        if (isOwnLane && this.forksHere) {
          y1 = forkPad
        }

        if (isOwnLane && this.mergesHere) {
          y2 = this.height - mergePad
        }

        return { lane, y1, y2 }
      })
    },
    forkPath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const r = CORNER

      // Classic git fork: down the trunk, curve out onto the branch lane.
      if (branchX > mainX) {
        return `M ${mainX} 0 V ${r} Q ${mainX} ${r * 2} ${mainX + r} ${r * 2} H ${branchX}`
      }

      return `M ${mainX} 0 V ${r} Q ${mainX} ${r * 2} ${mainX - r} ${r * 2} H ${branchX}`
    },
    mergePath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const r = CORNER
      const y = this.height

      // Classic git merge: along the branch lane, curve back onto the trunk.
      if (branchX > mainX) {
        return `M ${branchX} ${y - r * 2} V ${y - r} Q ${branchX} ${y} ${branchX - r} ${y} H ${mainX}`
      }

      return `M ${branchX} ${y - r * 2} V ${y - r} Q ${branchX} ${y} ${branchX + r} ${y} H ${mainX}`
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
