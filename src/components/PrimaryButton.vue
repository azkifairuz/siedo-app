<script setup lang="ts">
defineProps<{
    text: string
    color: string
    width: string
    textColor: string
}>()
</script>

<template>
    <button class="px-3 py-2 rounded-[12px] font-quicksand" :class="`${color} ${width} ${textColor}`">
        {{ text }}
    </button>
</template>