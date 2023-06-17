<template>
  <div>
    <TopNav :links="links" :contacts="contacts" :features="features" />
    <router-view :contacts="contacts"></router-view>
    <FooterBar :contacts="contacts" />
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import FooterBar from './components/FooterBar.vue'

import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/firebase/init'

export default {
  name: 'app',
  components: {
    FooterBar,
    TopNav
  },
  setup() {
    const contacts = ref([])
    const links = ref([])

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(firestore, 'contacts'))
      querySnapshot.forEach((doc) => {
        contacts.value.push(doc.data())
      })
      const querySnapshot1 = await getDocs(query(collection(firestore, 'links'), orderBy('order')))
      querySnapshot1.forEach((doc) => {
        console.log(doc.data())
        links.value.push(doc.data())
      })
    })

    return {
      contacts,
      links
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
