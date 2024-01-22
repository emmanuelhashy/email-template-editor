<script setup lang="ts">
import Preview from "../components/Preview.vue";
import Frame from "../components/Frame.vue"
</script>
<template>
    <div class="main">
        <Frame/>
        <Preview/>
    </div>
</template>
<style scoped>
.main {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
}
</style>