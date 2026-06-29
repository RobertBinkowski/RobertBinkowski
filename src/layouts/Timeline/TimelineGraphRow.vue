<template>
  <svg
    class="git-graph"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
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

    <path
      v-if="item.lane > 0 && forksHere"
      :d="forkPath"
      fill="none"
      :stroke="branchColor"
      stroke-width="4"
      stroke-linecap="round"
    />

    <path
      v-if="item.lane > 0 && mergesHere"
      :d="mergePath"
      fill="none"
      :stroke="branchColor"
      stroke-width="4"
      stroke-linecap="round"
    />

    <circle
      :cx="laneX(item.lane)"
      :cy="commitY"
      :r="7"
      :fill="branchColor"
      stroke="#fff"
      stroke-width="2.5"
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
    commitY() {
      return this.forksHere ? CORNER * 2 + 8 : 14
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
  },
}
</script>

<style lang="scss" scoped>
.git-graph {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
