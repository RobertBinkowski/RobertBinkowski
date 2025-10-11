<template>
    <div>
        <a :href="link.link" :name="link.name">
            <i :class="link.icon"></i>
            <span v-if="name">{{ link.name }}</span>
        </a>
    </div>
</template>

<script>
export default {
    name: "linkComponent",
    props: {
        link: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped lang="scss">
span {
    margin-left: 1em;
}
</style>
