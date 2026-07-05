<template>
  <footer>
    <div class="footer-content">
      <div class="footer-brand">
        <logoSVG />
        <p class="brand-name">Robert Binkowski</p>
        <p class="brand-tagline">
          Software engineer building reliable web products — from PHP APIs to Vue front-ends.
        </p>
      </div>

      <div class="footer-column">
        <p class="column-title">Connect</p>
        <div class="footer-links">
          <linkComponent
            v-for="contact in contacts"
            :key="contact.name"
            :link="contact"
            :name="true"
          ></linkComponent>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ currentYear }} <strong>Robert Binkowski</strong>. Designed and developed by me.</p>
      <p class="license" xmlns:cc="http://creativecommons.org/ns#">
        This work is licensed under
        <a
          href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          >CC BY-NC-ND 4.0</a
        >
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
@use '@/style/variables' as *;
@use 'sass:color';

footer {
  position: relative;
  background: $fot-back;
  color: rgba($bg, 0.92);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: clip;

  // Accent line along the top edge.
  &::before {
    content: '';
    display: block;
    height: 3px;
    background: linear-gradient(to right, $acc-1, $acc-2);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 2.5em;
    max-width: $content-width;
    margin: 0 auto;
    padding: 3em 1.5em 2.5em;
    text-align: left;
  }

  .footer-brand {
    svg {
      margin-bottom: 0.75em;
    }

    .brand-name {
      margin: 0 0 0.35em;
      font-size: 1.1em;
      font-weight: 900;
      color: $txt-light;
    }

    .brand-tagline {
      margin: 0;
      font-size: 0.9em;
      line-height: 1.5;
      color: rgba($bg, 0.65);
      max-width: 28ch;
    }
  }

  .footer-column {
    .column-title {
      margin: 0 0 0.9em;
      font-size: 0.8em;
      font-weight: 900;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: color.scale($acc-1, $lightness: 18%);
    }

    ul {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.15em;
    }

    li {
      padding: 0;

      &:hover {
        background: none;
      }

      a {
        font-size: 0.95em;
        font-weight: 600;
      }
    }

    a {
      color: rgba($bg, 0.88);
      transition: $tr-f;

      &:hover {
        color: color.scale($acc-1, $lightness: 18%);
      }
    }
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65em;

    .contact_link {
      color: rgba($bg, 0.88);
    }
  }

  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em 2em;
    max-width: $content-width;
    margin: 0 auto;
    padding: 1.25em 1.5em;
    border-top: 1px solid rgba($bg, 0.12);
    font-size: 0.8em;
    color: rgba($bg, 0.78);

    p {
      margin: 0;
    }

    strong {
      color: color.scale($acc-1, $lightness: 18%);
    }

    a {
      color: rgba($bg, 0.88);

      &:hover {
        color: color.scale($acc-1, $lightness: 18%);
      }
    }
  }
}

@media only screen and (max-width: $phone-size) {
  footer {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 2em;
      text-align: center;
    }

    .footer-brand .brand-tagline {
      margin: 0 auto;
    }

    .footer-links {
      align-items: center;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>

<script>
import LogoSVG from '@/components/_logo.vue'
import linkComponent from '@/components/linkComponent.vue'

export default {
  name: 'footerView',
  components: {
    LogoSVG,
    linkComponent,
  },
  props: {
    contacts: {
      type: Array,
      required: false,
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
