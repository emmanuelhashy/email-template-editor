<script setup lang="ts">
import IconTemplate from './icons/IconTemplate.vue';
import IconAddTemplate from './icons/IconAddTemplate.vue';

</script>
<template>
    <div class="side-bar">
        <div class="user">
            <img src="../assets/itunes.svg" class="user__img" />
            <p class="user__name">Admin</p>
        </div>
        <router-link class="router-link" to="/templates">
            <IconTemplate/>
            <p class="nav-link">Templates</p>
        </router-link>
        <router-link class="router-link" to="/create">
            <IconAddTemplate/>
            <p class="nav-link">Create Template</p>
        </router-link>
    </div>
</template>
<style scoped>
a {
    text-decoration: none;
    color: black;
    margin: .5rem 0;
}

.user {
    display: flex;
    align-items: center;
    margin: 1.3rem 0;
}

.user__img {
    height: 30px;
    width: 30px;
    object-fit: cover;
    border-radius: 200px;
}

.user__name {
    font-weight: 600;
    margin-left: 8px;
}

.side-bar {
    background-color: white;
    border-right: 0.5px solid lightgray;
    height: 100%;
    width: 18rem;
    padding: 0 1rem;
}

.router-link {
  color: #B2B2B2;
  padding: .5rem 1rem;
  font-weight: 500;
  font-size: 14px;
  display: flex;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
}
.router-link-active {
    background-color: #fb8f0b;
    color: white;
    width: 100%;
    border-radius: 5px;
}

@media (max-width:480px) {
  .side-bar {
    display: none;
  }
}

</style>