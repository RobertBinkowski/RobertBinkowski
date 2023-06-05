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
    <div class="right">
      <div class="timelineDetails">
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
  .left {
    display: flex;
    text-align: left;
    .timelineLogo {
      overflow: hidden;
      margin: 1em;
      img {
        filter: drop-shadow(0px 0px 5px $acc-1);
        width: 100%;
        height: 3em;
        object-fit: cover;
      }
    }
    .timelineDate {
      display: flex;
      align-items: center;
      p {
        font-size: 0.9em;
        color: $acc-2-d;
      }
    }
  }
  .timelineDetails {
    display: flex;
    text-align: center;
    min-width: 20em;
    background-color: $acc-1-dd;
    border-radius: $rad-2;
    padding: 1em;
    margin: 1em;
  }
}
</style>
