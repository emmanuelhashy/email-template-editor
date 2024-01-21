<script setup lang="ts">
import IconTemplate from './icons/IconTemplate.vue';
import IconAddTemplate from './icons/IconAddTemplate.vue';

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" />
  </header>
  <nav>
    <div class="nav-item">
      <router-link class="router-link" to="/templates">
        <IconTemplate/>
        <p>Templates</p>
      </router-link>
    </div>
    <div class="nav-item">
      <router-link class="router-link" to="/create">
        <IconAddTemplate/>
        <p>Create Template</p>
      </router-link>
    </div>
  </nav>
</template>
<style scoped>
a {
  text-decoration: none;
}
header {
  padding: 17px 1rem;
  background-color: white;
  width: 100%;
}

nav {
  position: absolute;
  bottom: 0;
  display: none;
}
.router-link {
  color: #B2B2B2;
  font-size: 14px;
  display: flex;
    flex-direction: column;
    align-items: center;
}
.router-link-active {
    color: #fb8f0b;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width:480px) {
  header {
  position: fixed;
  z-index: 2;
}
  nav {
    background-color: white;
    padding: 1rem 0;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    width: 100%;
    display: flex;
    position: fixed;
    justify-content: space-around;
    z-index: 2;
  }
  .nav-item {
    margin-right: 1rem;
  }

}
</style>