<template>
  <a
    :href="link.link"
    :aria-label="link.name"
    class="contact_link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <socialIcon :icon="link.icon" />
    <span v-if="name" class="contact_label">{{ link.name }}</span>
    <span v-else class="sr-only">{{ link.name }}</span>
  </a>
</template>

<script>
import socialIcon from './socialIcon.vue'

export default {
  name: 'linkComponent',
  components: {
    socialIcon,
  },
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
.contact_link {
  font-size: 2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  &:hover,
  &:focus {
    color: var(--color-primary);
  }

  .contact_label {
    margin-left: 0.4em;
    font-size: 0.5em;
    vertical-align: middle;
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
