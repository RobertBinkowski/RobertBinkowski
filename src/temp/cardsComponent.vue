<template>
    <div id="cards">
        <div class="card">
            <div class="card-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path
                        d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                    />
                </svg>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                    />
                </svg>
            </div>
        </div>
        <div class="card">
            <div class="card-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M493.7 .9L299.4 75.6l2.3-29.3c1-12.8-12.8-21.5-24-15.1L101.3 133.4C38.6 169.7 0 236.6 0 309C0 421.1 90.9 512 203 512c72.4 0 139.4-38.6 175.7-101.3L480.8 234.3c6.5-11.1-2.2-25-15.1-24l-29.3 2.3L511.1 18.3c.6-1.5 .9-3.2 .9-4.8C512 6 506 0 498.5 0c-1.7 0-3.3 .3-4.8 .9zM192 192a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm16 96a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/style/variables' as *;
@use '@/style/mixins' as *;

#cards {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: center;
    max-width: 1300px;
    align-items: center;
    margin-top: 2em;

    &:hover > .card::after {
        opacity: 1;
    }

    .card {
        background-color: $bg;
        border-radius: 0.5em;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 15em;
        height: 15em;

        svg {
            height: 3em;
            fill: $txt;
            margin: auto;
        }

        &::before,
        &::after {
            border-radius: inherit;
            content: "";
            height: 100%;
            left: 0px;
            opacity: 0;
            position: absolute;
            top: 0px;
            transition: opacity 500ms;
            width: 100%;
        }
        &:hover::before {
            opacity: 1;
        }

        &::before {
            background: radial-gradient(
                800px circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, 0.04),
                transparent 40%
            );
            z-index: 30;
        }

        &::after {
            background: radial-gradient(
                600px circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, 0.5),
                transparent 40%
            );
            z-index: 1;
        }

        & > .card-content {
            background-color: $bg;
            border-radius: inherit;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            inset: 1px;
            padding: 10px;
            position: absolute;
            z-index: 2;
        }
    }
}
</style>

<script>
export default {
    mounted() {
        const cardsElement = document.getElementById("cards");

        if (cardsElement) {
            cardsElement.onmousemove = (e) => {
                const cards = cardsElement.getElementsByClassName("card");
                for (const card of cards) {
                    const rect = card.getBoundingClientRect(),
                        x = e.clientX - rect.left,
                        y = e.clientY - rect.top;

                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }
            };
        }
    },
    beforeDestroy() {
        const cardsElement = document.getElementById("cards");
        if (cardsElement) {
            cardsElement.onmousemove = null;
        }
    },
};
</script>
