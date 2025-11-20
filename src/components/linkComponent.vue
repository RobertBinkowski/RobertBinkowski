<template>
  <a
    :href="link.link"
    :aria-label="link.name"
    class="contact_link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i :class="link.icon" aria-hidden="true"></i>
    <span class="sr-only">{{ link.name }}</span>
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
@use '@/style/variables' as *;

.contact_link {
  font-size: 2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $txt;
  &:hover,
  &:focus {
    color: $acc-1;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
