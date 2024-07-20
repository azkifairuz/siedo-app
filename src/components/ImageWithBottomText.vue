<script setup lang="ts">

defineProps<{
    text:string
    image:string
}>()
</script>

<template>
    <div class="w-full gap-4 flex flex-col justify-center items-center">
        <img :src=image alt="">
        <h1
            class="text-[18px] font-medium text-center                                                                                                                                                   text-main-blue">
          {{ text }}</h1>
    </div>
</template>