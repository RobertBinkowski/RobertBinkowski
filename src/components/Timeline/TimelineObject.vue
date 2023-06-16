<template>
  <div class="timelineObject">
    <div class="left">
      <img class="timelineLogo" :src="article.logo" :alt="article.name" />
      <p class="timelineDate">{{ article.date_started }} - {{ article.date_ended }}</p>
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
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/root';

.timelineObject {
  display: flex;
  justify-content: space-around;
  width: 100%;

  .left {
    display: flex;
    align-items: center;
    position: relative;
    left: 2em;
    .timelineLogo {
      overflow: hidden;
      filter: drop-shadow(0px 0px 5px $acc-1);
      height: 3em;
      object-fit: cover;
    }
    .timelineDate {
      font-size: 0.9em;
      color: $acc-2-d;
    }
  }
  .timelineDetails {
    text-align: center;
    min-width: 20em;
    background-color: $acc-1-dd;
    border-radius: $rad-2;
    padding: 1em;
    margin: 1em;
  }
}
</style>
