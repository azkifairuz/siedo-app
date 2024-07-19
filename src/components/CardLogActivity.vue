<script setup lang="ts">
import Chip from "@/components/Chip.vue";
import { computed } from "vue";
const props = defineProps<{
    activity: string,
    time: string,
    date: string,
    status: string,
}>()
function getColor(status: string): string {
    if (status === 'online') {
        return 'main-success';
    } else if (status === 'offline') {
        return 'main-safe';
    } else {
        return 'main-neutral';
    }
}

const parseTime = props.time.split('.')
const color = computed(() => getColor(props.status));
</script>

<template>
    <div class="rounded-xl  p-3 flex gap-[3px] items-stretch  bg-surface shadow-custom-card">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M34.3667 14.0833C32.6167 6.38332 25.9 2.91666 20 2.91666C20 2.91666 20 2.91666 19.9833 2.91666C14.1 2.91666 7.36667 6.36666 5.61667 14.0667C3.66667 22.6667 8.93334 29.95 13.7 34.5333C15.4667 36.2333 17.7333 37.0833 20 37.0833C22.2667 37.0833 24.5333 36.2333 26.2833 34.5333C31.05 29.95 36.3167 22.6833 34.3667 14.0833ZM20 22.4333C17.1 22.4333 14.75 20.0833 14.75 17.1833C14.75 14.2833 17.1 11.9333 20 11.9333C22.9 11.9333 25.25 14.2833 25.25 17.1833C25.25 20.0833 22.9 22.4333 20 22.4333Z"
                fill="#FB3838" />
        </svg>
        <div class="text-main-blue flex justify-between flex-1 flex-col ">
            <h1 v-if="activity == 'masuk'" class="text-[14px] ">Check-In</h1>
            <h1 v-else-if="activity == 'keluar'" class="text-[14px] ">Check-Out</h1>
            <h1 v-else class="text-[14px] ">{{activity}}</h1>
            <h2 class="text-base font-semibold">{{ parseTime[0] }}.{{ parseTime[1] }} WIB</h2>
        </div>
   
        <div class="text-main-blue items-end lex-1 flex  justify-between flex-col gap-1">
            <h1 class="text-[14px] font-medium ">{{ date }}</h1>
            <Chip :text="status" :color="color" />
        </div>
    </div>
</template>