<template>
  <a :href="link.link" :name="link.name" class="contact_link">
    <i :class="link.icon"></i>
    <span v-if="name">{{ link.name }}</span>
  </a>
</template>

<script>
export default {
  name: 'linkComponent',
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.contact_link {
  font-size: 2em;
}
</style>
