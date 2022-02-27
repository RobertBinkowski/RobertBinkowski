<template>
<svg class="svg" viewBox="0 0 1080 1080">
<g transform="matrix(1 0 0 1 500 540)" >
<path style="stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -200 300 L -200 -500 L 200 -100 L 0 100 L 200 300 L 0 500 L 0 -291.57518000000005" stroke-linecap="round" />
</g>
<g transform="matrix(1 0 0 1 400 440)" >
<path style="stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M 100 200 L -100 0 L 100 -200" stroke-linecap="round" />
</g>
</svg>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables";
    .svg{
        stroke-width: 4;
        height: 7em;
        stroke: $acc-1;
        &:hover{
            stroke: $acc-2;
        }
    }
</style>