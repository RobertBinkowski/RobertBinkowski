<template>
  <svg
    class="git-graph"
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
      :stroke-width="segment.lane === 0 ? 5 : 4"
      stroke-linecap="round"
    />

    <!-- Gentle S-curve from trunk into the branch lane -->
    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :stroke="branchColor"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- Gentle S-curve from branch lane back into the trunk -->
    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :stroke="branchColor"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- Junction dots sit on the main trunk where branches fork and merge -->
    <g v-if="item.lane > 0 && forksHere" class="junction">
      <circle
        :cx="laneX(0)"
        :cy="forkY"
        :r="9"
        fill="none"
        :stroke="mainColor"
        stroke-width="2.5"
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
        stroke-width="2.5"
      />
      <circle :cx="laneX(0)" :cy="mergeY" :r="5" :fill="mainColor" />
    </g>
  </svg>
</template>

<script>
const LANE_WIDTH = 18
const CURVE = 22

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
    forkY() {
      return CURVE * 1.35
    },
    mergeY() {
      return this.height - CURVE * 1.35
    },
    laneSegments() {
      return this.activeLanes.map((lane) => {
        const isOwnLane = lane === this.item.lane
        let y1 = 0
        let y2 = this.height

        if (lane === 0) {
          return { lane, y1, y2 }
        }

        if (isOwnLane && this.forksHere) {
          y1 = this.forkY
        }

        if (isOwnLane && this.mergesHere) {
          y2 = this.mergeY
        }

        return { lane, y1, y2 }
      })
    },
    forkPath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const y = this.forkY

      // Smooth horizontal ease-out from the trunk, then into the branch lane.
      if (branchX > mainX) {
        return `M ${mainX} 0 C ${mainX} ${y * 0.55} ${branchX} ${y * 0.15} ${branchX} ${y}`
      }

      return `M ${mainX} 0 C ${mainX} ${y * 0.55} ${branchX} ${y * 0.15} ${branchX} ${y}`
    },
    mergePath() {
      const mainX = this.laneX(0)
      const branchX = this.laneX(this.item.lane)
      const y = this.mergeY
      const bend = CURVE * 0.85

      // Ease from the branch lane onto the trunk at the merge junction.
      if (branchX > mainX) {
        return `M ${branchX} ${y} C ${branchX} ${y + bend} ${mainX + bend * 0.35} ${y + bend * 0.35} ${mainX} ${y}`
      }

      return `M ${branchX} ${y} C ${branchX} ${y + bend} ${mainX - bend * 0.35} ${y + bend * 0.35} ${mainX} ${y}`
    },
  },
  methods: {
    laneX(lane) {
      return lane * LANE_WIDTH + LANE_WIDTH / 2 + 2
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
}
</style>
