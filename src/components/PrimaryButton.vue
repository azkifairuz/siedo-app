<script setup lang="ts">
defineProps<{
    text: string
    color: string
    width: string
    textColor: string
    isDisable: boolean
}>()
const emits = defineEmits(['clickable']);

function onClick() {
    emits('clickable')
}
</script>

<template>
    <button @click="onClick" class="px-3 py-2 font-bold text-[16px] rounded-[12px] font-quicksand"
        :class="`${isDisable ? 'bg-secondary cursor-not-allowed' : color + ' cursor-pointer'} ${width} ${textColor}`">
        {{ text }}
    </button>
</template>