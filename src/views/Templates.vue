<script setup lang="ts">
import CircleToRhombuseSpinner from "../components/Spinners/CircleToRhombuseSpinner.vue"
import { router } from "../main";
import { store } from "../store/store"
import { onMounted } from 'vue'
import { type component } from "../store/store"

const { state, FetchAllTemplates } = store
function viewComponent(id: string) {
    router.push({ path: `/templates/${id}` })
}
function formatDateToWords(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate: string = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}
function formatDateToTime(dateString: string): string {
    const currentDate = new Date(dateString);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + period;

    return formattedTime
}
onMounted(() => {
    FetchAllTemplates()
})

</script>
<template>
    <div class="col">
        <div v-if="state.loadingTemplates" class="v-spinner">
            <CircleToRhombuseSpinner />
        </div>
        <div v-else class="template-list">
            <div v-if="state.templates.length < 1">
                <h3>No Template available</h3>
            </div>
            <div v-else v-for="template in state.templates" :key="template.ID" @click="viewComponent(template.ID)"
                class="template-card">
                <img v-if="template.data.template.bannerImageUrl" class="card-img"
                    :src="template.data.template.bannerImageUrl" alt="banner" />
                <img v-else class="card-img"
                    src="../assets/placeholder-image.png"
                    alt="banner">
                <div class="card_text-content">
                    <p class="text-bold">{{ template.data.template.subject }}</p>
                    <p>Date: {{ formatDateToWords(template.createdAt) }}</p>
                    <p>Time: {{ formatDateToTime(template.createdAt) }}</p>
                    <p>Created By: {{ template.userId }}</p>
                </div>
            </div>
        </div>
    </div>
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
        padding: 0;
    }

    .card-img {
        width: 100%;
        height: 9rem;
        margin-right: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .card_text-content {
        padding: 1rem;
    }
}

@media (max-width:480px) {
    .template-list {
        padding: 0;
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