<template>
  <div>
    <TopNav :links="links" :contacts="contacts" :features="features" />
    <router-view></router-view>
    <FooterBar :contacts="contacts" />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import FooterBar from './components/FooterBar.vue'

import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/firebase'

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav
  },
  data() {
    return {
      links: [
        {
          enabled: true,
          button: false,
          link: '/',
          ico: 'fa-solid fa-house-chimney',
          name: 'Home'
        },
        {
          enabled: true,
          button: false,
          link: '/timeline',
          ico: 'fa-solid fa-timeline',
          name: 'Timeline'
        },
        {
          enabled: true,
          button: true,
          link: '/about',
          ico: 'fa-solid fa-address-card',
          name: 'About'
        }
      ],
      features: {
        DarkMode: {
          enabled: true,
          button: true,
          link: '',
          ico: 'fa-solid fa-moon',
          name: ''
        }
      }
    }
  },
  setup() {
    const contacts = ref([])

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(firestore, 'contacts'))
      querySnapshot.forEach((doc) => {
        contacts.value.push(doc.data())
      })
    })

    return {
      contacts
    }
  }
}
</script>

<style lang="scss" scope>
@import 'assets/scss/root';
#app {
  left: 0;
  right: 0;
  width: 100vw;
  margin-top: -1em;
}
</style>
