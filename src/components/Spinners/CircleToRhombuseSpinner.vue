<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true,
    default: '#FB8E0B'
  }
});
</script>

<template>
  <div class="circles-to-rhombuses-spinner">
    <div v-for="i in 3" class="circle" :style="{ border: `3px solid ${props.color}` }"></div>
  </div>
</template>
<style>
.circles-to-rhombuses-spinner,
.circles-to-rhombuses-spinner * {
  box-sizing: border-box;
}

.circles-to-rhombuses-spinner {
  height: 15px;
  width: calc((15px + 15px * 1.125) * 3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.circles-to-rhombuses-spinner .circle {
  height: 15px;
  width: 15px;
  margin-left: calc(15px * 1.125);
  transform: rotate(45deg);
  border-radius: 10%;
  overflow: hidden;
  background: transparent;

  animation: circles-to-rhombuses-animation 1200ms linear infinite;
}

.circles-to-rhombuses-spinner .circle:nth-child(1) {
  animation-delay: calc(150ms * 1);
  margin-left: 0;
}

.circles-to-rhombuses-spinner .circle:nth-child(2) {
  animation-delay: calc(150ms * 2);
}

.circles-to-rhombuses-spinner .circle:nth-child(3) {
  animation-delay: calc(150ms * 3);
}

@keyframes circles-to-rhombuses-animation {
  0% {
    border-radius: 10%;
  }

  17.5% {
    border-radius: 10%;
  }

  50% {
    border-radius: 100%;
  }

  93.5% {
    border-radius: 10%;
  }

  100% {
    border-radius: 10%;
  }
}

@keyframes circles-to-rhombuses-background-animation {
  50% {
    opacity: 0.4;
  }
}
</style>