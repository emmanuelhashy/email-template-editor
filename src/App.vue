<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar.vue'

</script>

<template>
  <div class="h-vh">
    <NavBar/>
    <main class="main">
      <Sidebar/>
      <router-view/>
    </main>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: start;
  height: 90%;
}
.h-vh {
  height: 100vh;
}
@media (min-width: 1024px) {

}
</style>
