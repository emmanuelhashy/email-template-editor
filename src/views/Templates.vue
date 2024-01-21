<script setup lang="ts">

</script>
<template>
<p>Templates</p>
</template>
<style scoped>
.col {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.v-spinner {
    display: flex;
    justify-content: end;
    padding-top: 2rem;
    width: 40vw;
}

.template-list {
    width: 100%;
    height: 43rem;
    padding: 1rem;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
}

.template-card {
    display: flex;
    padding: 1rem;
    background-color: white;
    border-radius: 5px;
    width: 70%;
    cursor: pointer;
    margin-bottom: 1rem;
}

.card-img {
    width: 12rem;
    height: 6rem;
    object-fit: cover;
    margin-right: 1rem;
}

.text-bold {
    font-size: 17px;
    font-weight: 600;
}

.spinner-position {
    display: flex;
    justify-content: center;
    widows: 100%;
}

@media (max-width:720px) {
    .template-card {
        flex-direction: column;
    }

    .card-img {
        width: 100%;
        height: 6rem;
        margin-right: 0;
    }
}

@media (max-width:480px) {
    .template-list {
        padding-top: 10rem;
        padding-bottom: 6rem;
    }

    .v-spinner {
        padding-top: 10rem;
        justify-content: center;
        width: 100%;
    }
}
</style>