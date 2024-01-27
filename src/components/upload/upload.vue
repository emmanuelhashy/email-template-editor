<template>
    <div class="row">
        <div class="split">
            <p class="text-truncate" v-if="imgUrl">{{ imgUrl }}</p>
            <p v-else>No file</p>
            <button v-on:click="open" id="upload_widget" class="upload-button">
                Upload image
            </button>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>
  
<script setup lang="ts">
// import cloudinary from 'cloudinary';
const cloudName = "hzxyensd5";
const uploadPreset = "aoh4fpwm";
import { ref, onMounted } from 'vue';

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

const handleDataReset = (event: any) => {
    imgUrl.value = ""
}

onMounted(() => {
      window.addEventListener('resetData', handleDataReset);
    });
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
    height: 100%;
    font-size: 14px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
}

.row{
    width: 100%;
    height: 100%;
}

.text-truncate {
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.split {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 100%;
}

.img-preview {
    width: 60px;
    height: 35px;
    margin-left: 5px;
}</style>