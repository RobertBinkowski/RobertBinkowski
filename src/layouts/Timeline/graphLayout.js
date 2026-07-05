export const TRUNK_X = 9
export const BRANCH_GAP = 14 // horizontal gap from trunk centre to lane-1 centre
export const LANE_STEP = 10 // extra offset per lane when parallel lanes are needed
export const ROW_GAP = 8
export const GRAPH_LABEL_GUTTER = 0
export const MOBILE_TRUNK_X = 7
export const MOBILE_BRANCH_GAP = 6
export const MOBILE_LANE_STEP = 8
export const PHONE_BREAKPOINT = 768

export const GRAPH_CORNER = 10
export const GRAPH_CURVE_LEAD = 32

/** Map a month value onto the trunk's vertical time axis (0 = newest). */
export const monthToTrunkY = (monthValue, bounds, height) => {
  if (!bounds || height <= 0 || !Number.isFinite(monthValue)) {
    return null
  }

  const { oldest, newest } = bounds
  const span = newest - oldest

  if (span <= 0) {
    return null
  }

  const clamped = Math.min(Math.max(monthValue, oldest), newest)

  return ((newest - clamped) / span) * height
}

/** Smooth fork curve from trunk onto a branch lane (global or row-local coords). */
export const forkCurvePath = (mainX, branchX, forkY, lead = GRAPH_CURVE_LEAD) => {
  const dx = Math.max(branchX - mainX, 1)
  return `M ${branchX} ${forkY - lead} C ${branchX} ${forkY - lead * 0.35} ${branchX - dx * 0.25} ${forkY - 6} ${mainX} ${forkY}`
}

/** Smooth merge curve from a branch lane back onto the trunk. */
export const mergeCurvePath = (mainX, branchX, mergeY, lead = GRAPH_CURVE_LEAD) => {
  const dx = Math.max(branchX - mainX, 1)
  return `M ${branchX} ${mergeY + lead} C ${branchX} ${mergeY + lead * 0.35} ${branchX - dx * 0.25} ${mergeY + 6} ${mainX} ${mergeY}`
}

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
