<template>
    <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.loader {
    display: flex;
    gap: 0.25rem;
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;

        background-color: $txt-grey;

        animation: 0.5s bounce infinite alternate;
        &:nth-child(2) {
            animation-delay: 100ms;
        }
        &:nth-child(3) {
            animation-delay: 200ms;
        }
    }
}

@keyframes bounce {
    to {
        translate: 0 -0.25rem;
    }
}
</style>
