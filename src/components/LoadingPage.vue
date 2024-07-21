<template>
    <div class="flex fixed top-20 bottom-0 w-full items-center  bg-white justify-center">
      <div class="loader"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Komponen ini tidak memerlukan script tambahan
  </script>
  
  <style scoped>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .loader {
    width: 2.5rem; /* 10 in Tailwind size scale */
    height: 2.5rem; /* 10 in Tailwind size scale */
    border: 5px solid white; /* 4 in Tailwind size scale */
    border-top-color: #112A46; /* Warna biru utama */
    border-bottom-color: #112A46; /* Warna biru utama */
    border-left-color: #112A46; /* Warna biru utama */
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  </style>