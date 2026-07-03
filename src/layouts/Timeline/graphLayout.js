export const LANE_WIDTH = 18
export const ROW_GAP = 8
export const GRAPH_LABEL_GUTTER = 36

export const laneX = (lane, gutter = GRAPH_LABEL_GUTTER) =>
  gutter + lane * LANE_WIDTH + LANE_WIDTH / 2 + 2

export const graphWidth = (maxLane) => (maxLane + 1) * LANE_WIDTH + 4 + GRAPH_LABEL_GUTTER
