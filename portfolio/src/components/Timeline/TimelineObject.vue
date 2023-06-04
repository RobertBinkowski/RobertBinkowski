<template>
  <div class="timelineObject">
    <div class="left">
      <div class="timelineLogo">
        <img :src="article.logo" :alt="article.name" />
      </div>
      <div class="timelineDate">
        <p>{{ article.date_started }} - {{ article.date_ended }}</p>
      </div>
    </div>
    <div class="timelineDetails">
      <div>
        <p>
          <strong>{{ article.title }}</strong> <br />
          {{ article.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        logo: '../../../public/logo.png',
        title: 'My first article',
        content: 'This is my first article',
        date_started: '2019-01',
        date_ended: '2019-01'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/root';

.timelineObject {
  display: flex;
  width: 100%;
  .timelineDetails {
    display: flex;
    flex-direction: row;
    background-color: $acc-1;
    padding: 1em;
    border-radius: $rad-2;
  }
  .timelineLogo {
    width: 3em;
    height: 3em;
    border-radius: $rad-1;
    background-color: $acc-1-d;
    overflow: hidden;
    padding: 0.3em;
    margin: 0 auto;
    img {
      border-radius: $rad-1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
