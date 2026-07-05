<template>
    <p class="pill">
        {{ value }}
    </p>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@use '@/style/variables' as *;

.pill {
    margin: 0.5em;
    padding: 0.3em 0.7em;
    background-color: var(--color-primary);
    border-radius: $rad-1;
    color: var(--color-text-inverse);
    max-width: calc(100% - 1em);
    overflow-wrap: anywhere;
    text-align: center;
}
</style>
