<template>
  <main>
    <article>
      <!-- <h1>Timeline Page</h1> -->
      <TimelineObject v-for="article in articles" :key="article" :article="article" />
    </article>
  </main>
</template>

<script lang="ts">
import TimelineObject from '../components/Timeline/TimelineObject.vue'

export default {
  components: {
    TimelineObject
  },
  data() {
    return {
      articles: [
        {
          logo: '../../../public/logo.png',
          title: 'My first article',
          content:
            'This is my first article, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliq',
          date_started: '2019-01',
          date_ended: '2019-01'
        },
        {
          logo: '../../../public/logo.png',
          title: 'My first article',
          content:
            'This is my first article, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliq',
          date_started: '2019-01',
          date_ended: '2019-01'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
