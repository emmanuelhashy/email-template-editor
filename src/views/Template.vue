<script setup lang="ts">
import IconTwitter from "../components/icons/IconTwitter.vue";
import IconApple from "../components/icons/IconApple.vue";
import IconGooglePlay from "../components/icons/IconGooglePlay.vue";
import IconFacebook from "../components/icons/IconFacebook.vue";
import IconLinkedIn from "../components/icons/IconLinkedIn.vue";
import IconInstagram from "../components/icons/IconInstagram.vue";
import CircleToRhombuseSpinner from "../components/Spinners/CircleToRhombuseSpinner.vue"
import { store } from "../store/store";
import { type component } from "../store/store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const { state, FetchTemplateById } = store;
const route = useRoute();

onMounted(() => {
  FetchTemplateById(route.params.id);
});

const getComponent = (componentType: string, position: number) => {
  if (store.state?.template?.data) {
    const component = store.state?.template?.data?.template?.body?.filter((item) => item.component === componentType)
    return component[position]
  }
}
const getComponentAlignment = (componentType: string, position: number): "center" | "left" | "right" | undefined => {
  if (store.state?.template?.data) {
    const component = store.state?.template?.data?.template?.body?.filter((item) => item.component === componentType)
    return component[position]?.align
  }
}

</script>
<template>
  <div v-if="state.loadingTemplate" class="v-spinner">
    <CircleToRhombuseSpinner />
  </div>
  <div v-else class="container">
    <div class="frame">
      <div class="logo-container">
        <img alt="Apex logo" class="logo" src="../assets/logo.svg" height="40px" />
      </div>
      <div class="banners">
        <img v-if="state.template.data?.template.bannerImageUrl" alt="banner image" class="banner-img"
          :src="state.template.data?.template.bannerImageUrl" />
        <img v-else alt="banner image" class="banner-img" src="../assets/placeholder-image.png" />
        <p :style="{ textAlign: getComponentAlignment('text', 0) }" class="banners__title">
          {{ getComponent("text", 0)?.text }}
        </p>
        <p :style="{ textAlign: getComponentAlignment('paragraph', 0) }" class="banners__desc">
          {{ getComponent("paragraph", 0)?.text }}
        </p>
        <p :style="{ textAlign: getComponentAlignment('text', 1) }" class="banners__title">
          {{ getComponent("text", 1)?.text }}
        </p>
        <div class="banner-container">
          <img v-if="getComponent('image', 0)?.imageUrl" alt="banner image" class="banner-img"
            :src="getComponent('image', 0)?.imageUrl" />
          <img v-else alt="banner image" class="banner-img" src="../assets/placeholder-image.png" />
        </div>
        <p :style="{ textAlign: getComponentAlignment('paragraph', 1) }" class="banners__text">
          {{ getComponent("paragraph", 1)?.text }}
        </p>
        <div v-if="state.template.data?.template.showSocialCampaign" class="social-campaign">
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
            Get the most of Apex network by installing our mobile app. You can
            log in by using your existing emails address and password.
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
            Questions or faq? Contact us at
            <a href="" target="_blank">Support@apexnetwork.com. </a>
            If you'd rather not receive this kind of email, Don’t want any more
            emails from Apexnetwork?
            <a>Unsubscribe</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.v-spinner {
  display: flex;
  justify-content: end;
  padding-top: 2rem;
  width: 40vw;
}

.frame {
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 40rem;
  overflow-y: scroll;
  padding-bottom: 2rem;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.social-campaign {
  border-top: 1px solid #edf2f7;
  margin-top: 1rem;
}

.btn-container {
  display: flex;
  margin: 1rem 0;
}

.text-box {
  margin-left: 0.4rem;
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
  border: 0.5px solid #1b1c20;
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
}</style>