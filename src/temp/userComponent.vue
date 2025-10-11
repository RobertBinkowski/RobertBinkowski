<template>
    <div id="user" v-if="user">
        <img
            class="user-photo"
            v-if="user.user.photo"
            :src="user.user.photo"
            :alt="user.user.name"
        />
        <p v-if="user.user.name" class="user-name">
            {{ user.user.name }}
        </p>
        <button class="button" @click="logout" :disabled="user.processing">
            <span v-if="!user.processing">Log Out</span>
            <span v-if="user.processing" class="loading">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    methods: {
        logout() {
            this.$emit("logout");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/variables";
#user {
    @include boxShadow();
    @include backgroundBlur();
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    height: 2em;
    border-radius: $rad-1;
    width: 2em;
    overflow: hidden;
    transition: $tr-s ease-in-out all;
    &:hover,
    &:focus {
        margin-top: 5em;
        height: auto;
        width: auto;
        border-radius: $rad-2;
        .user-photo {
            height: 3em;
            width: 3em;
            left: auto;
        }
    }
    .user-photo {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: $rad-1;
    }
    .user-name {
        margin-top: 2em;
    }
    .button {
        font-weight: bold;
        margin: 1em;
        font-size: 0.8em;
        padding: 0.4em;
    }
}
</style>
