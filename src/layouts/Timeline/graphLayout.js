export const LANE_WIDTH = 18
export const ROW_GAP = 8
export const GRAPH_LABEL_GUTTER = 0
export const MOBILE_LANE_WIDTH = 10
export const PHONE_BREAKPOINT = 768

export const laneX = (lane, gutter = GRAPH_LABEL_GUTTER) =>
  gutter + lane * LANE_WIDTH + LANE_WIDTH / 2 + 2

export const graphWidth = (maxLane) => (maxLane + 1) * LANE_WIDTH + 4 + GRAPH_LABEL_GUTTER

export const mobileLaneX = (lane) => lane * MOBILE_LANE_WIDTH + MOBILE_LANE_WIDTH / 2 + 2

export const mobileGraphWidth = (maxLane) => (maxLane + 1) * MOBILE_LANE_WIDTH + 4

export const TRUNK_HEAD_RADIUS = { desktop: 7, compact: 5 }
export const BRANCH_HEAD_RADIUS = { desktop: 7, compact: 4.5 }

export const trunkHeadMetrics = (compact = false) => {
  const radius = compact ? TRUNK_HEAD_RADIUS.compact : TRUNK_HEAD_RADIUS.desktop

  return {
    radius,
    cy: radius,
    lineStart: radius * 2,
  }
}

/** Place branch HEAD one em below the trunk head dot. */
export const branchHeadY = (compact, emPx) => {
  const { lineStart } = trunkHeadMetrics(compact)
  const headRadius = compact ? BRANCH_HEAD_RADIUS.compact : BRANCH_HEAD_RADIUS.desktop

  return lineStart + emPx + headRadius
}
