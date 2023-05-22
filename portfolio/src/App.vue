<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import TopNav from './components/TopNav.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div>
    <TopNav />
    <RouterView />
    <FooterBar />
  </div>
</template>
