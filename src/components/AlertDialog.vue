<template>
    <transition name="fade">
      <div v-if="visible"
           class="fixed bottom-4 left-4 right-4 bg-main-blue text-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4">
        <span>{{ message }}</span>
        <button @click="closeDialog" class="bg-red-500 text-white px-3 py-1 rounded">
          Close
        </button>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const props = defineProps<{
    message: string;
    duration?: number;
  }>();
  
  const visible = ref(true);
  
  const closeDialog = () => {
    visible.value = false;
  };
  
  const duration = props.duration || 5000;
  
  onMounted(() => {
    setTimeout(() => {
      closeDialog();
    }, duration);
  });
  </script>
  
  <style scoped>
 
  </style>
  