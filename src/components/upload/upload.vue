<template>
    <div>
        <div class="split">
            <button v-on:click="open" id="upload_widget" class="upload-button">
                Upload image
            </button>
            <img v-if="imgUrl" alt="banner" :src="imgUrl" class="img-preview" />
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
  
<script setup lang="ts">
// import cloudinary from 'cloudinary';
const cloudName = "hzxyensd5";
const uploadPreset = "aoh4fpwm";
import { ref } from 'vue';

const props = defineProps({
    callbackFunc: {
        type: Function,
        required: true
    }
});

const imgUrl = ref("")
const errorMessage = ref("")


const myWidget = cloudinary.createUploadWidget(
    {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true,
        theme: "purple",
        styles: {
            palette: {
                window: "#AE5107",
                windowBorder: "#F2B870",
                tabIcon: "#FDE4C5",
                menuIcons: "#FDE4C5",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#FD6003",
                action: "#FD6003",
                inactiveTabIcon: "#FDE4C5",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E06300"
            },
            frame: {
                background: "#0E2F5B99"
            },
        },
    },
    (error: any, result: { event: string; info: any; }) => {
        if (!error && result && result.event === "success") {
            imgUrl.value = result.info.url
            props.callbackFunc(result.info.url)
        }
        else if (error) {
            errorMessage.value = error.message;
        }
    }
);

function open() {
    myWidget.open();
}
</script>  
<style scoped>
footer > div > img{
    display:none !important;
  }
.bc-link {
    border-color: #FB8E0B !important;
}

.bg-link {
    background-color: red !important;
}

.upload-button {
    padding: 10px 10px;
    background-color: #FB8E0B;
    border: #FB8E0B;
    color: white;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 600;
}

.split {
    display: flex;
}

.img-preview {
    width: 60px;
    height: 35px;
    margin-left: 5px;
}</style>