<script setup lang="ts">
defineProps<{
    text:string,
    color:string
}>()
</script>

<template>
    <div class="rounded-xl px-2.5 py-1" :class="`bg-${color} text-${color}`">
        {{ text }}
    </div>
</template>