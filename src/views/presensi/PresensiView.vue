<script setup lang="ts">
import TopAppBar from "@/components/TopAppBar.vue";
import { RouterView } from 'vue-router';

</script>
<template>
    <div class="min-h-screen  flex flex-col ">
        <TopAppBar title="Presensi" />
        <main class="font-quicksand flex-1 h-screen mb-20">
            <RouterView />
        </main>
    </div>
</template>