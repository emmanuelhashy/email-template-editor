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
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };
    const formattedDate: string = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}
onMounted(() => {
    FetchAllTemplates()
})

</script>
<template>
    <div class="col">
        <div v-if="state.loadingTemplates"  class="v-spinner">
            <CircleToRhombuseSpinner />
        </div>
        <div v-else class="template-list">
            <div v-for="template in state.templates" :key="template.ID" @click="viewComponent(template.ID)"
                class="template-card">
                <img v-if="template.data.template.bannerImageUrl" class="card-img" :src="template.data.template.bannerImageUrl"
                    alt="banner" />
                <img v-else class="card-img"
                    src="https://res.cloudinary.com/dbgqdye6d/image/upload/v1704989332/NEWSLETTER-HEADER_2.svg" alt="banner">
                <div>
                    <p class="text-bold">{{ template.data.template.subject }}</p>
                    <p>Created At: {{ formatDateToWords(template.createdAt) }}</p>
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