<script setup lang="ts">
import ComponentList from './ComponentList.vue'
import LowerFrame from './LowerFrame.vue'
</script>

<template>
  <div class="frame">
    <ComponentList/>
    <div class="space-y">
        <LowerFrame/>
    </div>
  </div>
</template>
<style scoped>
.space-y {
    margin-top: 3rem;
}
.frame {
    max-width: 533px;
    width: 500px;
    background-color: white;
    border-radius: 13px;
    border: 1px solid #EBEBEB;
    box-shadow: 0px 4px 10px 0px #00000014;
    display: flex;
    flex-direction: column;
    justify-content: start;
    overflow-y: scroll;
    height: 40rem;
    padding: 2rem 0;
    margin-right: 1rem;
    margin-top: 2rem;
    z-index: 0;
}
@media (max-width:480px) {

    .frame {
      margin-top: 8rem;
        width: 100%;
        margin-left: .7rem;
        margin-right: .7rem;
    }
}
</style>