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
    background-color: $acc-1;
    border-radius: $rad-1;
    color: $txt-light;
}
</style>
