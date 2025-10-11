<template>
    <div class="wrapper">
        <!-- <div v-show="experience.photo" class="image-experience">
            <img :src="experience.photo" :alt="experience.name" />
        </div> -->
        <div class="details-experience">
            <a :href="experience.link">
                <img :src="experience.logo" :alt="experience.title + ' logo'" />
                <h3>{{ experience.title }}</h3>
                <p>{{ experience.company }}</p>
                <p>{{ experience.start_date }}</p>
                <p>{{ experience.end_date }}</p>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";

.details-experience {
    a {
        img {
            height: 5em;
        }
    }
}
</style>

<script lang="js">
export default {
    props: {
        experience: {
            // type: object,
            required: true
        }
    }
}
</script>
