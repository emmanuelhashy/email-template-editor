<script setup lang="ts">
import IconDots from "./icons/IconDots.vue";
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";
import Modal from "./modals/Modal.vue";
import { defineProps, ref, watchEffect } from "vue";
import {store} from "../store/store"
import { type component } from "../store/store"
import IconBin from "./icons/IconBin.vue";
import IconCaretUp from "./icons/IconCaretUp.vue";
import IconCaretDown from "./icons/IconCaretDown.vue";
import IconLightCaretUp from "./icons/IconLightCaretUp.vue";
import IconLightCaretDown from "./icons/IconLightCaretDown.vue";
import CustomSelect from "./custom-select/custom-select.vue"
import type { Bool } from "../store/store"

const {
  state, 
  modifyComponentValue, 
  DeleteComponent, 
  SaveComponentProperty, 
  closeAllMenu, 
  toggleMenu,
  moveUp,
  moveDown,
  findFirstPosition,
  findLastPosition
} = store
const props = defineProps({
  item: {
    type: Object as () => component, // Specify the type of the prop
    required: true
  }
});
const text = ref(props.item.value || "")
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedOption = ref(props.item.properties?.alignment || "left")
const options = ref([
  { name: "Left", value: "left" },
  { name: "Right", value: "right" },
  { name: "Center", value: "center" }
]);

const onAlignmentSelected = (param: Bool) => {
  selectedOption.value = param.value;
};
function toggleParagraphMenu() {
  closeAllMenu()
  toggleMenu(props.item.id)
}
function hideMenu() {
  closeAllMenu()
}
function closeAllModals() {
  isModalOpen.value = false;
  isDeleteModalOpen.value = false;
}
function openModal() {
  hideMenu();
  closeAllModals()
  isModalOpen.value = true;
}
function openDeleteModal() {
  hideMenu();
  closeAllModals()
  isDeleteModalOpen.value = true;
}

function saveComponentProperty() {
  let data = <component>{}
  if(props.item.properties != undefined) {
    data = {
      ...props.item,
      value: text.value,
      properties: {
        ...props.item.properties,
        alignment: selectedOption.value,
      }
    }

  }
  SaveComponentProperty(data)
  closeAllModals()
}
function deleteComponent() {
  closeAllMenu()
    DeleteComponent(props.item)
}
</script>
<template>
  <div class="paragraph-card">
    <div v-if="state.reOrderComponents" class="left">
      <span style="cursor:not-allowed" v-if="findFirstPosition(item)">
                <IconLightCaretUp/>
            </span>
            <span v-else @click="moveUp(item)">
                <IconCaretUp />
            </span>
            <span style="cursor:not-allowed" v-if="findLastPosition(item)">
                <IconLightCaretDown/>
            </span>
            <span v-else @click="moveDown(item)">
                <IconCaretDown />
            </span>
        </div>
    <div class="right">
      <p class="label">Paragraph</p>
      <textarea class="paragraph-card__input" placeholder="Enter Paragraph" v-model="text" @change="modifyComponentValue(item.id, text)" col="50" />
      <div class="paragraph-card__dots">
        <div @click.stop="toggleParagraphMenu"><IconDots /></div>
      </div>
      <div v-show="props.item.showMenu" class="paragraph-card__menu">
        <p @click="openModal" class="menu_item">
          <IconEdit />
          <span class="menu_text">Edit Properties</span>
        </p>
        <p @click="openDeleteModal" class="menu_item">
          <IconDelete />
          <span @click="" class="menu_text">Delete</span>
        </p>
      </div>
    </div>
  </div>
  <Modal :open="isModalOpen" @close="isModalOpen = !isModalOpen">
    <div class="form_fields">
      <label>Text</label>
      <input class="input" type="text" placeholder="Enter text" @change="modifyComponentValue(item.id, text)" v-model="text" />
      <label>Alignment</label>
      <CustomSelect :options="options" @selected="onAlignmentSelected" />
      <div class="form_fields__btns">
        <button @click="saveComponentProperty" class="btn bg-orange">
          <span>Save Changes</span>
        </button>
        <button @click="isModalOpen = !isModalOpen" class="btn bg-transparent">
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </Modal>
  <Modal :open="isDeleteModalOpen" @close="isDeleteModalOpen = !isDeleteModalOpen">
        <div class="delete">
            <IconBin/>
            <p class="delete__text">Are you sure you want to delete </p>
            <div class="delete__btns">
                <button @click="deleteComponent" class="btn bg-orange">
                    <span>Yes</span>
                </button>
                <button @click="isDeleteModalOpen = !isDeleteModalOpen" class="btn bg-gray">
                    <span>No</span>
                </button>
            </div>
        </div>
    </Modal>
</template>
<style scoped>
label {
  margin-bottom: -25px;
}
.left {
    display: flex;
    flex-direction: column;
    align-self: center;
}

.right {
    width: 100%;
}
span {
    margin-right: 8px;
    height: 22px;
}
.label {
    font-size: 14px;
    margin-bottom: 4px;
}
.paragraph-card {
  position: relative;
  border: 1px solid #b1b1b1;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 10px;
    display: flex;
}
.paragraph-card__input {
  height: 6rem;
  border-radius: 13px;
  color: #000000;
  border: 1px solid #b1b1b1;
  padding: 16px 17px;
  width: 94%;
  box-sizing: border-box;
  border-bottom: 1px solid #b1b1b1;
  resize: none;
}
.paragraph-card__dots {
  position: absolute;
  right: 4px;
  top: 12px;
  cursor: pointer;
}
.paragraph-card__menu {
  width: 10rem;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  box-shadow: 0px 4px 20px 0px #00000014;
  background-color: white;
  position: absolute;
  z-index: 10;
  top: 3rem;
  right: 0rem;
  padding: 0.3rem 0;
}

.menu_item {
  padding: 0.6rem;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.menu_item:hover {
  background-color: #ebebeb;
}

.menu_text {
  margin-left: 5px;
}

.form_fields {
  height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input {
  width: 100%;
  height: 3rem;
  border-radius: 13px;
  color: #000000;
  border: 1px solid #b1b1b1;
  padding: 14px 17px;
  font-size: 16px;
}

.input::placeholder {
  color: #b1b1b1;
}

.form_btns {
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2.5rem;
}

.btn {
  padding: 15px 42px;
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
}
.bg-orange {
  background-color: #fb8e0b;
}
.bg-gray {
    background-color: #F3F3F3;
    color: #909090;
}

.bg-transparent {
  background-color: transparent;
  color: #000000;
}

.delete {
    text-align: center;
    padding: 3rem;
    
}

.delete__text {
    margin: 1rem 0;
    font-weight: 600;
}

.delete__btns {
    display: flex;
    justify-content: space-between;
}
</style>