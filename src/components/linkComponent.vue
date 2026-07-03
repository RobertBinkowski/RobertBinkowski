<template>
  <a :href="link.link" :name="link.name" class="contact_link" target="_blank">
    <i :class="link.icon"></i>
    <span v-if="name" class="contact_label">{{ link.name }}</span>
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
    name: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@use '@/style/variables' as *;

.contact_link {
  font-size: 2em;
  &:hover {
    color: $acc-1;
  }

  .contact_label {
    margin-left: 0.4em;
    font-size: 0.5em;
    vertical-align: middle;
  }
}
</style>
