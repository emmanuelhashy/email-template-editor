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

const {
    state, 
    modifyComponentValue, 
    DeleteComponent, 
    SaveComponentProperty, 
    closeAllMenu, 
    toggleMenu,
    moveUp,
    moveDown
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
const selectedAlignment = ref(props.item.properties?.alignment || "left")
const selectedSize = ref(props.item.properties?.size || "22px")
function toggleTextMenu() {
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
        alignment: selectedAlignment.value,
        size: selectedSize.value,
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
    <div class="image-card">
        <div v-if="state.reOrderComponents" class="left">
            <span @click="moveUp(item)">
                <IconCaretUp />
            </span>
            <span @click="moveDown(item)">
                <IconCaretDown />
            </span>
        </div>
        <div class="right">
            <p class="label">Title</p>
            <input class="image-card__input" placeholder="Enter title" v-model="text" @change="modifyComponentValue(item.id, text)"/>
            <div class="image-card__dots">
                <div @click.stop="toggleTextMenu">
                    <IconDots />
                </div>
            </div>
            <div v-show="props.item.showMenu" class="image-card__menu">
                <p @click="openModal" class="menu_item">
                    <IconEdit />
                    <span class="menu_text">Edit Properties</span>
                </p>
                <p @click="openDeleteModal" class="menu_item">
                    <IconDelete />
                    <span class="menu_text">Delete</span>
                </p>
            </div>
        </div>
    </div>
    <Modal :open="isModalOpen" @close="isModalOpen = !isModalOpen">
        <div class="form_fields">
            <input class="input" type="text" placeholder="Enter Email Subject" v-model="text" @change="modifyComponentValue(item.id, text)"/>
            <select class="input" v-model="selectedSize">
                <option disabled>Header Size</option>
                <option value="24px">H1</option>
                <option value="22px">H2</option>
                <option value="20px">H3</option>
            </select>
            <select class="input" v-model="selectedAlignment">
                <option disabled>Alignment</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="center">Center</option>
            </select>
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
.image-card {
    position: relative;
    border: 1px solid #b1b1b1;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 10px;
    display: flex;
}

.image-card__input {
    width: 94%;
    height: 3rem;
    border-radius: 13px;
    color: #000000;
    border: 1px solid #b1b1b1;
    padding: 16px 17px;
    font-size: 14px;
    box-sizing: border-box;
}

.image-card__dots {
    position: absolute;
    right: 4px;
    top: 12px;
    cursor: pointer;
}

.image-card__menu {
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
    background-color: #FB8E0B;
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