<script setup lang="ts">
    dfineProps<{
        day:string,
        semester:string,
        year:string,
        subject:string,
        room:string
    }>()
</script>

<template>
    <div class="bg-surface shadow-custom-card px-6 py-3 ">
        <div class="w-full flex justify-between items-center">
            <h1 class="text-[16px] font-semibold">{{ day }}</h1>
            <p class="text-xs font-normal">sem {{ semester }} {{ year }}</p>
        </div>
        <p class="text-xs font-medium">Mata Kuliah: {{ subject }}</p>
        <p class="text-xs font-medium">Kelas: {{ room }}</p>

    </div>
</template>