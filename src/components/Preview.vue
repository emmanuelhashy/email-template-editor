<script setup lang="ts">
import IconTwitter from "./icons/IconTwitter.vue"
import IconApple from "./icons/IconApple.vue"
import IconGooglePlay from "./icons/IconGooglePlay.vue"
import IconFacebook from "./icons/IconFacebook.vue"
import IconLinkedIn from "./icons/IconLinkedIn.vue"
import IconInstagram from "./icons/IconInstagram.vue"
import { store } from "../store/store"
import { type component } from "../store/store";
import CircleToRhombuseSpinner from "./Spinners/CircleToRhombuseSpinner.vue"

const { state, FindComponent, SaveTemplate, } = store

function getAlignment(type: string, position: number): "center" | "left" | "right" | undefined {
    return FindComponent(type)[position]?.properties?.alignment
}
function getSize(type: string, position: number): string | undefined {
    return FindComponent(type)[position]?.properties?.size
}
function getValue(type: string, position: number): string {
    return FindComponent(type)[position]?.value
}
function sanitizeData(data: component[]) {
    return data.map(component => {
        if (component.iconType === "image") {
            return {
                component: component.iconType,
                imageUrl: component.value,
            }
        }
        return {
            component: component.iconType,
            text: component.value,
            align: component.properties?.alignment
        }
    })
}
function submitTemplate() {
    const templateData = {
        template: {
            subject: state.configData.subject,
            bannerImageUrl: state.configData.bannerUrl,
            showSocialCampaign: state.configData.showCampaign,
            body: sanitizeData(state.componentList)
        }
    }
    SaveTemplate(templateData)
}

</script>
<template>
    <div class="preview">
        <div>
            <div class="logo-container">
                <img alt="Apex logo" class="logo" src="../assets/logo.svg" />
            </div>
            <div class="banners">
                <img v-if="state.configData.showBanner" alt="banner image" class="banner-img" :src="getValue('Image', 0)" />
                <p :style="{ fontSize: '', textAlign: getAlignment('Text', 0) }" class="banners__title">{{ getValue('Text',
                    0) }}</p>
                <p :style="{ textAlign: getAlignment('Paragraph', 0) }" class="banners__desc">
                    {{ getValue('Paragraph', 0) }}
                </p>
                <p :style="{ fontSize: getSize('Text', 1), textAlign: getAlignment('Text', 1) }" class="banners__title">
                    {{ getValue('Text', 1) }}</p>
                <div v-if="state.configData.bannerUrl" class="banner-container"><img alt="banner" class="banner-img"
                        :src="state.configData.bannerUrl" /></div>
                <p :style="{ textAlign: getAlignment('Paragraph', 1) }" class="banners__desc">
                    {{ getValue('Paragraph', 1) }}
                </p>
                <div v-if="state.configData.showCampaign" class="social-campaign">
                    <p>{{ state.configData.showCampaign }}</p>
                    <div class="social-icons">
                        <a href="" target="_blank">
                            <IconTwitter />
                        </a>
                        <a href="" target="_blank">
                            <IconFacebook />
                        </a>
                        <a href="" target="_blank">
                            <IconLinkedIn />
                        </a>
                        <a href="" target="_blank">
                            <IconInstagram />
                        </a>
                    </div>
                    <p>
                        Get the most of Apex network by installing our mobile app. You can log in by using your existing
                        emails address and password.
                    </p>
                    <div class="btn-container">
                        <button class="campaign-btn">
                            <IconApple />
                            <div class="text-box">
                                <p class="btn-text-xs">Get it on</p>
                                <p class="btn-text">App store</p>
                            </div>
                        </button>
                        <button class="campaign-btn">
                            <IconGooglePlay />
                            <div class="text-box">
                                <p class="btn-text-xs">Get it on</p>
                                <p class="btn-text">Google play</p>
                            </div>
                        </button>
                    </div>
                    <p>
                        Questions or faq? Contact us at <a>Support@apexnetwork.com. </a>
                        If you'd rather not receive this kind of email, Don’t want any more emails from Apexnetwork?
                        <a>Unsubscribe</a>.
                    </p>
                </div>
            </div>
        </div>
        <div class="submit-section">
            <div v-if="state.creatingTemplate" class="btn-submit spinner-size">
                <CircleToRhombuseSpinner color="white" />
            </div>
            <button @click="submitTemplate" v-else class="btn-submit">
                Submit Template
            </button>
        </div>
    </div>
</template>
<style scoped>
.spinner-size {
    width: 8.27rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit-section {
    padding: 0 2rem;
}

.btn-submit {
    padding: 10px 10px;
    background-color: #fb8f0be6;
    border: #fb8f0be6;
    color: white;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

.preview {
    max-width: 533px;
    width: 500px;
    background-color: white;
    border-radius: 13px;
    border: 1px solid #EBEBEB;
    box-shadow: 0px 4px 10px 0px #00000014;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    height: 40rem;
    padding: 2rem 0;
    margin-right: 1rem;
    margin-top: 2rem;
}

.social-campaign {
    border-top: 1px solid #EDF2F7;
    margin-top: 1rem;
}

.btn-container {
    display: flex;
    margin: 1rem 0;
}

.text-box {
    margin-left: .4rem;
}

.btn-text-xs {
    font-size: 10px;
    text-align: left;
}

.btn-text {
    font-size: 14px;
    text-align: left;
    font-weight: 700;
}

.campaign-btn {
    display: flex;
    align-items: center;
    width: 8rem;
    height: 3.5rem;
    justify-content: center;
    background-color: white;
    border: 0.5px solid #1B1C20;
    border-radius: 10px;
    margin-right: 1rem;
    cursor: pointer;
}

.social-icons {
    display: flex;
    align-items: center;
    margin: 1rem 0;
}

.social-icons a {
    margin-right: 0.6rem;
}

a {
    text-decoration: none;
    color: #fb8e0b;
}

.banners {
    padding: 0 2rem;
}

.banners__text {
    margin-top: 1rem;
}

.banners__desc {
    margin-top: 1rem;
}

.banners__title {
    font-size: 16px;
    font-weight: 600;
    color: black;
    text-align: center;
    margin: 1rem;
}

.banner-container {
    width: 100%;
}

.logo-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 2rem;
}

.banner-img {
    width: 100%;
    border-radius: 20px;
    height: 10rem;
    object-fit: cover;
}

@media (max-width:480px) {
    .submit-section {
        padding-top: 1rem;
        padding-bottom: 6rem;
    }

    .preview {
        width: 100%;
        margin-left: .7rem;
        margin-right: .7rem;
    }
}
</style>