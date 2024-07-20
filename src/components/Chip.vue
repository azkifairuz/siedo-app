<script setup lang="ts">
defineProps<{
    text:string,
    color:string
}>()
</script>

<template>
    <div class="rounded-xl px-2.5 py-1 font-bold text-center border text-[8px] w-fit" :class="`border-${color} text-${color}`">
        {{ text }}
    </div>
</template>