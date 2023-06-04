<template>
  <div>
    {{ article.name }}
  </div>
</template>

<script lang="js">
import { ref } from 'vue'

const loadData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'Matt Maribojoc',
                logo: '',
                info: 'I run a VueJS community over at https://learnvue.co, develop web sites, and post whatever I find cool on the Internet.',
                date-start: "2019-01-01",
                date-end: "2020-01-01",
            })
        }, 1000)
    })
}

export default {
    async setup() {
        const article = ref(await loadData())

        return {
            article,
        }
    },
}
</script>
