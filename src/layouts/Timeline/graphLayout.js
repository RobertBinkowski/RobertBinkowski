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
