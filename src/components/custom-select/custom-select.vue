<template>
    <div class="custom-select" @click="toggleOptions">
      <div class="selected-option">
        <p>{{ selectedOption }}</p>
        <p v-if="isOpen">
            <IconCaretUp />
        </p>
        <p v-else="isOpen">
            <IconCaretDown />
        </p>
    </div>
      <ul v-if="isOpen" class="options">
        <li v-for="option in options" :key="option.name" @click.stop="selectOption(option)">
          {{ option.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import IconCaretUp from "../icons/IconCaretUp.vue";
import IconCaretDown from "../icons/IconCaretDown.vue";
import type {Bool} from "../../store/store"
  
  export default {
    props: {
      options: {
        type: Array as () => Bool[],
        required: true,
      },
    },
    components: {
        IconCaretUp,
        IconCaretDown
    },
    setup(props, { emit }) {
      const isOpen = ref(false);
      const isClicked = ref(false);
      const selectedOption = ref(props.options[1].name);
  
      const toggleOptions = () => {
        isOpen.value = !isOpen.value;
        isClicked.value = true
      };

      const handleDataReset = (event: any) => {
        selectedOption.value = event.detail
      }
  
      const selectOption = (option: Bool) => {
        selectedOption.value = option.name;
        isOpen.value = false;
        console.log(isOpen.value, "value");
        
        emit('selected', option);
      };
  
      onMounted(() => {
      window.addEventListener("click", ()=> {
          if(isClicked.value != true ) {
            isOpen.value = false;
          }
          isClicked.value = false
      })
      window.addEventListener('resetData', handleDataReset);
    });
      return { isOpen, selectedOption, toggleOptions, selectOption };
    },
    
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    cursor: pointer;
  }
  
  .selected-option {
    height: 3rem;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 13px;
    width: 100%;
  }
  .options:last-child {
    border-bottom: none;
  }
  
  .options {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 13px;
    margin-top: 5px;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    /* display: none; */
  }
  
  .options li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  
  .options li:hover {
    background-color: #f0f0f0;
  }
  </style>
  