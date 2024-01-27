<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { store } from "../store/store";
import Upload from "./upload/upload.vue"
import CustomSelect from "./custom-select/custom-select.vue"
import type { Bool } from "../store/store"

const { state, SaveConfig } = store;

const onCampaignSelected = (param: Bool) => {
  state.configData.showCampaign = param.value;
};
const onBannerSelected = (param: Bool) => {
  state.configData.showBanner = param.value;
};
watchEffect(() =>
  SaveConfig({
    ...state.configData,
  })
);

function getImgURL(val: string) {
  state.configData.bannerUrl = val
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
          <input class="input" type="text" placeholder="Enter Email Subject" v-model="state.configData.subject" />
          <span style="color: red; font-size: 14px;">{{ state.fieldErrors.subject }}</span>
        </div>
        <div>
          <p class="label">Show Campaign?</p>
          <CustomSelect :options="state.options" @selected="onCampaignSelected" />
        </div>
        
        <div>
          <p class="label">Banner Image</p>
          <div class="input">
            <Upload :callbackFunc="getImgURL" />
          </div>
        </div>
        <div>
          <p class="label">Show Banner?</p>
          <CustomSelect :options="state.options" @selected="onBannerSelected" />
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
  padding-left: 16px;
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