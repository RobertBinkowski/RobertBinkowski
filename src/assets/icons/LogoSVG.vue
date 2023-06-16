<template>
  <svg class="svg" viewBox="0 0 1080 1080">
    <g transform="matrix(1 0 0 1 500 540)">
      <path
        vector-effect="non-scaling-stroke"
        transform=" translate(0, 0)"
        d="M -200 300 L -200 -500 L 200 -100 L 0 100 L 200 300 L 0 500 L 0 -291.57518000000005"
        stroke-linecap="round"
      />
    </g>
    <g transform="matrix(1 0 0 1 400 440)">
      <path
        vector-effect="non-scaling-stroke"
        transform=" translate(0, 0)"
        d="M 100 200 L -100 0 L 100 -200"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
.svg {
  fill-opacity: 0;
  stroke-width: 4;
  height: 7em;
  stroke: $acc-1;
  transition: $tr-s;
  &:hover {
    stroke: $acc-2;
  }
}
</style>
