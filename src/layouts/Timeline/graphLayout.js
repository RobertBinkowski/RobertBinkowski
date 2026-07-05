export const TRUNK_X = 9
export const BRANCH_GAP = 14 // horizontal gap from trunk centre to lane-1 centre
export const LANE_STEP = 10 // extra offset per lane when parallel lanes are needed
export const ROW_GAP = 8
export const GRAPH_LABEL_GUTTER = 0
export const MOBILE_TRUNK_X = 7
export const MOBILE_BRANCH_GAP = 6
export const MOBILE_LANE_STEP = 8
export const PHONE_BREAKPOINT = 768

export const laneX = (lane, gutter = GRAPH_LABEL_GUTTER) => {
  const trunk = gutter + TRUNK_X
  if (lane === 0) {
    return trunk
  }
  return trunk + BRANCH_GAP + (lane - 1) * LANE_STEP
}

export const graphWidth = (maxLane) => laneX(maxLane) + LANE_STEP / 2 + 4

export const mobileLaneX = (lane) => {
  const trunk = MOBILE_TRUNK_X
  if (lane === 0) {
    return trunk
  }
  return trunk + MOBILE_BRANCH_GAP + (lane - 1) * MOBILE_LANE_STEP
}

export const mobileGraphWidth = (maxLane) => mobileLaneX(maxLane) + MOBILE_LANE_STEP / 2 + 4

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
