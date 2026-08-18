<template>
  <a
    :href="link.link"
    class="bento-card"
    :class="[`bento-card--${link.size || 'compact'}`]"
    :style="{ '--bento-accent': link.accent || 'var(--color-primary)' }"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="link.name"
  >
    <img
      v-if="link.background"
      class="bento-photo"
      :src="link.background"
      alt=""
      width="800"
      height="600"
      loading="lazy"
      decoding="async"
    />
    <span class="bento-veil" aria-hidden="true" />

    <span class="bento-icon">
      <socialIcon :icon="link.icon" />
    </span>

    <img
      v-if="link.portrait"
      class="bento-portrait"
      :src="link.portrait"
      alt=""
      width="80"
      height="80"
      loading="lazy"
      decoding="async"
    />

    <div class="bento-copy">
      <p class="bento-name">{{ link.name }}</p>
      <p v-if="link.tagline" class="bento-tagline">{{ link.tagline }}</p>

      <div class="bento-details">
        <dl v-if="link.stats?.length" class="bento-stats">
          <div v-for="stat in link.stats" :key="`${link.name}-${stat.label}`" class="bento-stat">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
        <p v-if="link.detail" class="bento-note">{{ link.detail }}</p>
        <span class="bento-cta">Open {{ link.name }}</span>
      </div>
    </div>
  </a>
</template>

<script>
import socialIcon from '@/components/socialIcon.vue'

export default {
  name: 'bentoCard',
  components: {
    socialIcon,
  },
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

.bento-card {
  --bento-accent: var(--color-primary);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  min-height: 16rem;
  overflow: hidden;
  border-radius: 1.15rem;
  color: var(--color-text-inverse);
  text-shadow: none;
  isolation: isolate;
  background: color-mix(in srgb, var(--bento-accent) 55%, var(--color-surface-inverse));
  box-shadow:
    6px 6px 12px var(--color-shadow-neu-dark),
    -6px -6px 12px var(--color-shadow-neu-light);

  &:hover,
  &:focus-visible {
    color: var(--color-text-inverse);
  }

  &:focus-visible {
    outline: 3px solid var(--bento-accent);
    outline-offset: 3px;
  }
}

.bento-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.7s ease;
  z-index: 0;
}

.bento-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--bento-accent) 18%, transparent) 0%,
      transparent 38%,
      color-mix(in srgb, var(--color-surface-inverse) 78%, transparent) 100%
    ),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-surface-inverse) 28%, transparent) 0%,
      transparent 45%
    );
  transition: background 0.4s ease;
}

.bento-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.85rem;
  color: var(--color-text-inverse);
  background: color-mix(in srgb, var(--color-surface-inverse) 42%, transparent);
  border: 1px solid fade(var(--color-text-inverse), 0.28);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  .social-icon {
    font-size: 1.2rem;
  }
}

.bento-portrait {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 999px;
  border: 2px solid fade(var(--color-text-inverse), 0.7);
  box-shadow: 0 8px 18px fade(var(--color-surface-inverse), 0.35);
}

.bento-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.35em;
  padding: 1.25rem 1.2rem 1.15rem;
}

.bento-name {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  line-height: 1.15;
}

.bento-tagline {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: fade(var(--color-text-inverse), 0.88);
}

.bento-details {
  display: grid;
  gap: 0.75rem;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(0.6rem);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    max-height 0.45s ease,
    margin 0.35s ease;
}

.bento-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 0.15rem 0 0;
}

.bento-stat {
  min-width: 0;
  padding: 0.55rem 0.6rem;
  border-radius: 0.7rem;
  background: fade(var(--color-surface-inverse), 0.38);
  border: 1px solid fade(var(--color-text-inverse), 0.14);

  dt {
    margin: 0 0 0.2rem;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: fade(var(--color-text-inverse), 0.72);
  }

  dd {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    overflow-wrap: anywhere;
  }
}

.bento-note {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  font-weight: 600;
  color: fade(var(--color-text-inverse), 0.9);
  max-width: 46ch;
}

.bento-cta {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: 0.35em 0.75em;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--bento-accent);
  color: var(--color-text-inverse);

  &::after {
    content: '→';
    font-size: 0.95em;
  }
}

.bento-card--featured {
  min-height: 22rem;
}

@media (hover: hover) and (min-width: $phone-size) {
  .bento-card:hover .bento-photo,
  .bento-card:focus-visible .bento-photo,
  .bento-card:focus-within .bento-photo {
    transform: scale(1.08);
  }

  .bento-card:hover .bento-veil,
  .bento-card:focus-visible .bento-veil,
  .bento-card:focus-within .bento-veil {
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--bento-accent) 32%, transparent) 0%,
        color-mix(in srgb, var(--color-surface-inverse) 42%, transparent) 42%,
        color-mix(in srgb, var(--color-surface-inverse) 88%, transparent) 100%
      ),
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--color-surface-inverse) 38%, transparent) 0%,
        transparent 50%
      );
  }

  .bento-card:hover .bento-details,
  .bento-card:focus-visible .bento-details,
  .bento-card:focus-within .bento-details {
    max-height: 18rem;
    opacity: 1;
    transform: translateY(0);
    margin-top: 0.55rem;
  }
}

@media (hover: none), (max-width: #{$phone-size - 1}) {
  .bento-details {
    max-height: none;
    opacity: 1;
    transform: none;
    margin-top: 0.55rem;
  }

  .bento-photo {
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-photo,
  .bento-details {
    transition: none;
  }

  .bento-photo {
    transform: none;
  }
}

@media only screen and (max-width: $phone-size) {
  .bento-stats {
    grid-template-columns: 1fr;
  }

  .bento-card,
  .bento-card--featured {
    min-height: 18rem;
  }
}
</style>
