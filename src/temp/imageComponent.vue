<template>
    <picture>
        <img :src="image.src" :alt="image.alt" loading="lazy" />
    </picture>
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            required: true,
        },
    },
};
</script>
