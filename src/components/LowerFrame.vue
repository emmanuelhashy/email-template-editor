<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { store } from "../store/store";

import Upload from "./upload/upload.vue"

const { state, SaveConfig } = store;
const subject = ref(state.configData.subject || "");
const bannerUrl = ref(state.configData.bannerUrl || "");
const showCampaign = ref(state.configData.showCampaign || false);
const showBanner = ref(state.configData.showBanner || false);



watchEffect(() =>
  SaveConfig({
    ...state.configData,
    subject: subject.value,
    bannerUrl: bannerUrl.value,
    showBanner: showBanner.value,
    showCampaign: showCampaign.value,
  })
);

function getImgURL(val: string) {
    console.log({val})
    bannerUrl.value = val
}
</script>

<template>
  <div class="lower-frame">
    <div class="header">
      <p class="header-text">Template Config</p>
    </div>
    <div class="form">
      <div class="form_fields">
        <div>
          <p class="label">Email Subject</p>
          <input class="input" type="text" placeholder="Enter Email Subject" v-model="subject" />
        </div>
        <div>
          <p class="label">Banner Image</p>
          <div class="input">
            <Upload :callbackFunc="getImgURL"/>

          </div>
        </div>
        <div>
          <p class="label">Show Banner?</p>
          <select class="select" placeholder="show banner" v-model="showBanner">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <p class="label">Show Campaign?</p>
          <select class="select" v-model="showCampaign">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.label {
  font-size: 14px;
}
.preview-btn {
  display: flex;
  margin: 2rem 2rem;
}

.element {
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  border: 1px solid #b1b1b1;
  margin: 1rem 0;
}

.element:last-child {
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}

.left {
  /* padding: 1rem; */
  padding-top: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  border-right: 1px solid #b1b1b1;
  display: flex;
  flex-direction: column;
}

.right {
  display: flex;
  padding-left: 1rem;
}

.icon-box {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
}

.bg-red {
  background-color: #fd6003;
}

.bg-orange {
  background-color: #fb8e0b;
}

.form_btns {
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin: 2.5rem 0; */
}

.btn {
  padding: 8px 30px;
  border-radius: 30px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.form_fields__btns {
  display: flex;
  justify-content: center;
}

.bg-transparent {
  background-color: transparent;
  color: #000000;
}

.header {
  background-color: #f9f9f9;
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 1rem;
}
.header-text {
  color: #8a8a8a;
  font-weight: 500;
  font-size: 16px;
}

.input {
  width: 100%;
  height: 3rem;
  border-radius: 13px;
  color: #000000;
  border: 1px solid #b1b1b1;
  padding: 16px 17px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.select {
  width: 100%;
  height: 3rem;
  border-radius: 13px;
  color: #000000;
  border: 1px solid #b1b1b1;
  padding: 0 17px;
  font-size: 14px;
}

.input::placeholder {
  color: #b1b1b1;
}

.form {
  padding: 0 1rem;
}

.form_fields {
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form_btns {
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
}

.btn {
  padding: 17px 50px;
  border-radius: 30px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>