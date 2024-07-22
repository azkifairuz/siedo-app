<script setup lang="ts">
import { computed } from 'vue';
import Chip from './Chip.vue';

    const props = defineProps<{
        periode:string,
        workHour:string,
        status:string,
    }>()

    function getColor(status: string): string {
    if (status === 'kurang') {
        return 'main-red';
    } else if (status === 'baik') {
        return 'main-success';
    } else {
        return 'main-safe';
    }
}

const color = computed(() => getColor(props.status));
</script>

<template>
    <div class="bg-surface rounded-[12px] flex flex-col gap-2 shadow-custom-card p-3 ">
        <div class="w-full flex justify-between items-center">
            <h1 class="text-[12px] font-normal">Total jam kerja</h1>
            <p class="text-xs font-medium">{{ periode }}</p>
        </div>
        <div class="w-full flex justify-between items-center">
            <h1 class="text-[14px] font-semibold">{{ workHour }}</h1>
             <Chip :text="status" :color="color + ' capitalize'" /> 
        </div>
    </div>
</template>