<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <header id="nav">
    <img alt="Logo" class="logo" src="@/assets/logo.png" />

    <!-- Routes -->
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <!-- End Routes -->
    <!-- Other Links -->
    <div class="links">
      <a href="">LinkedIn</a>
      <a href="">LinkedIn</a>
      <a href="">LinkedIn</a>
    </div>
    <!-- End -->
  </header>
  <RouterView />
  <FooterBar />
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100vw;
  padding: 1em;
  display: block;
  max-width: 1000px;
  background-color: black;
}
.logo {
  display: block;
  height: 2em;
}
.route-active {
  color: red;
}
#nav .links {
  padding-top: 1em;
  width: 100%;
}
#nav .links a {
  padding: 1em;
}
</style>

<script lang="ts"></script>
