<script setup lang="ts">
import IconPlus from './icons/IconPlus.vue';
import IconCaretUp from "./icons/IconCaretUp.vue";
import IconCaretDown from "./icons/IconCaretDown.vue";
import IconImage from './icons/IconImage.vue';
import IconTitle from './icons/IconTitle.vue';
import IconParagraph from './icons/IconParagraph.vue';
import ImageComponent from './ImageComponent.vue';
import TextComponent from './TextComponent.vue'
import ParagraphComponent from './ParagraphComponent.vue'
import { ref, watchEffect } from 'vue';
import { store, sortedComponentList } from "../store/store"
import { type component } from "../store/store"

const { state, AddComponent, closeAllMenu, toggleArrows } = store

function toggleMenu() {
    closeAllMenu()
    state.showMenu = !state.showMenu
}
function addComponent(item: component) {
    state.showMenu = false
    AddComponent(item)
}

</script>
<template>
    <div class="reorder">
        <button @click="toggleArrows" v-if="sortedComponentList.length > 1" class="reorder-button">
            <span v-if="!state.reOrderComponents">Enable components Re-order</span>
            <span v-else>Disable components Re-order</span>
        </button>
    </div>
    <div class="list-container">
        <div v-for="d in sortedComponentList" :key="d.id" class="list">
            <div class="element">
                <div class="right">
                    <div v-if="d.iconType === 'image'">
                        <ImageComponent :item="d" />
                    </div>
                    <div v-if="d.iconType === 'text'">
                        <TextComponent :item="d" />
                    </div>
                    <div v-if="d.iconType === 'paragraph'">
                        <ParagraphComponent :item="d" />
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <button class="add-btn" @click.stop="toggleMenu">
                <span>Add Component</span>
                <IconPlus />
            </button>
            <div v-show="state.showMenu" class="menu">
                <p v-for="(d, index) in state.componentTypes" :key="index" @click="addComponent(d)"
                    :class="{ disabled: d.disabled }" class="menu_item">
                    <span>
                        <i v-if="d.iconType === 'image'">
                            <IconImage />
                        </i>
                        <i v-if="d.iconType === 'text'">
                            <IconTitle />
                        </i>
                        <i v-if="d.iconType === 'paragraph'">
                            <IconParagraph />
                        </i>
                    </span>
                    <span class="menu_text">{{ d.name }}</span>
                    <span v-if="d.disabled" class="flex-end">Disabled</span>
                </p>
                <!-- <p class="menu_item">
                    <IconTitle/>
                    <span class="menu_text">Title</span>
                </p>
                <p class="menu_item">
                    <IconParagraph/>
                    <span class="menu_text">Paragraph</span>
                </p> -->
            </div>
        </div>
    </div>
</template>
<style scoped>
.reorder-button {
    padding: 8px 10px;
    background-color: #FB8E0B;
    border: #FB8E0B;
    color: white;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}

.reorder {
    display: flex;
    justify-content: end;
    padding: 0 1rem;
    margin-bottom: 1rem;
}

.element {
    display: flex;
    align-items: center;
}

.left {
    display: flex;
    flex-direction: column;
}

.right {
    width: 100%;
}

.list-container {
    padding: 0 1rem;
}

.list {
    margin-bottom: 1rem;
}

.btn-container {
    display: flex;
    justify-content: center;
    position: relative;
}

.menu {
    width: 16rem;
    border-radius: 10px;
    border: 1px solid #EBEBEB;
    box-shadow: 0px 4px 20px 0px #00000014;
    background-color: white;
    position: absolute;
    top: 3.8rem;
    padding: .3rem 0;
}

.menu_item {
    padding: 0.6rem;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.flex-end {
    right: 10px;
    position: absolute;
    font-size: 10px;
}

.menu_item:hover {
    background-color: #EBEBEB;
}

.disabled {
    background-color: #ebebeb82;
    cursor: not-allowed;
}

.menu_text {
    margin-left: 5px;
}
.add-btn span {
    margin-right: 4px;
}
.add-btn {
    padding: 14px 50px;
    background-color: #FB8E0B;
    border-radius: 4px;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;
    display: flex;
    align-items: center;
}

@media (max-width:480px) {
    .list-container {
        margin-top: 1rem;
    }
}
</style>