<script setup lang="ts">
import IconDots from "./icons/IconDots.vue";
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";
import IconBin from "./icons/IconBin.vue";
import Modal from "./modals/Modal.vue";
import Upload from "./upload/upload.vue"
import { defineProps, ref, watchEffect } from "vue";
import { store } from "../store/store"
import { type component } from "../store/store"
import IconCaretUp from "./icons/IconCaretUp.vue";
import IconCaretDown from "./icons/IconCaretDown.vue";
import IconLightCaretUp from "./icons/IconLightCaretUp.vue";
import IconLightCaretDown from "./icons/IconLightCaretDown.vue";

const { state, modifyComponentValue, DeleteComponent, closeAllMenu, toggleMenu, moveUp, moveDown, findFirstPosition, findLastPosition } = store
const props = defineProps({
    item: {
        type: Object as () => component, // Specify the type of the prop
        required: true
    }
});

const isDeleteModalOpen = ref(false);
const showDeleteModal = ref(false)
function toggleImgMenu() {
    closeAllMenu()
    toggleMenu(props.item.id)
}
function hideMenu() {
    closeAllMenu()
    showDeleteModal.value = true;
}
function openModal() {
    hideMenu();
    isDeleteModalOpen.value = true;
}

function deleteComponent() {
    closeAllMenu()
    DeleteComponent(props.item)
}

function getImgURL(val: string) {
    modifyComponentValue(props.item.id, val)
}

</script>
<template>
    <div class="image-card">
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
            <p class="label">Image</p>
            <div class="image-card__input">
                <Upload :callbackFunc="getImgURL" />
            </div>
            <div class="image-card__dots">
                <div @click.stop="toggleImgMenu">
                    <IconDots />
                </div>
            </div>
            <div v-show="props.item.showMenu" class="image-card__menu">
                <p @click="openModal" class="menu_item">
                    <IconDelete />
                    <span class="menu_text">Delete</span>
                </p>
            </div>
        </div>
    </div>
    <Modal :open="isDeleteModalOpen" @close="isDeleteModalOpen = !isDeleteModalOpen">
        <div class="delete">
            <IconBin />
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

.left span {
    cursor: pointer;
}

.right {
    width: 100%;
}
span {
    margin-right: 8px;
    height: 22px;
}
.delete {
    text-align: center;
    padding: 3rem;

}

.label {
    font-size: 14px;
    margin-bottom: 4px;
}

.delete__text {
    margin: 1rem 0;
    font-weight: 600;
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
    padding-left: 16px;
    font-size: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image-card__dots {
    position: absolute;
    right: 3px;
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
    cursor: pointer;
}

.menu_item:hover {
    background-color: #ebebeb;
}

.menu_text {
    margin-left: 5px;
}




.form_btns {
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 2.5rem;
}

.btn {
    padding: 15px 50px;
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

.delete__btns {
    display: flex;
    justify-content: space-between;
}

.bg-orange {
    background-color: #FB8E0B;
}

.bg-gray {
    background-color: #959595c0;
    color: white;
}
</style>