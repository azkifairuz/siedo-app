<script setup lang="ts">
import CardLogActivity from '@/components/CardLogActivity.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import ImageWithBottomText from '@/components/ImageWithBottomText.vue';
import { useActivity } from '@/stores/useActivity';
import type { Activity } from '@/type/Activity';
import { computed, onMounted, ref } from 'vue';
import emptyImage from "@/assets/img/empty.png";
const activityData = ref<Activity[]>([])
const activityStore = useActivity()
const whatFilter = ref<string>('all')

const isAllActive = computed(() => whatFilter.value === 'all');
const isDailyActive = computed(() => whatFilter.value === 'daily');
const isWeeklyActive = computed(() => whatFilter.value === 'weekly');
async function getDailyActivity() {
    activityData.value = []
    await activityStore.getActivity("1", "daily")
    activityData.value = activityStore.activity
    whatFilter.value = 'daily'
}
async function getWeeklyActivity() {
    activityData.value = []

    await activityStore.getActivity("1", "weekly")
    activityData.value = activityData.value = activityStore.activity

    whatFilter.value = 'weekly'
}
async function getAllActivity() {
    activityData.value = []

    await activityStore.getActivity("1", "all")
    activityData.value = activityData.value = activityStore.activity

    whatFilter.value = 'all'
}

onMounted(() => {
    getAllActivity()

})
</script>
<template>

    <div class="font-quicksand min-h-screen p-6 ">
        <h1 class="text-main-blue text-center text-[18px] font-bold">Aktivitas</h1>

        <div class="my-6 flex gap-4 w-full justify-center items-center">
            <button @click="getAllActivity"
                class="rounded-xl cursor-pointer border px-3.5  text-[16px]  border-[rgba(17, 38, 70, 0.20)] text-main-blue"
                :class="{ 'bg-[#E9F4FF]': isAllActive }">Semua</button>
            <button @click="getDailyActivity"
                class="rounded-xl cursor-pointer border px-3.5  text-[16px] border-[rgba(17, 38, 70, 0.20)]  text-main-blue"
                :class="{ 'bg-[#E9F4FF]': isDailyActive }">Hari
                Ini</button>
            <button @click="getWeeklyActivity"
                class="rounded-xl cursor-pointer border px-3.5  text-[16px] border-[rgba(17, 38, 70, 0.20)]  text-main-blue"
                :class="{ 'bg-[#E9F4FF]': isWeeklyActive }">Seminggu</button>
        </div>
        <LoadingPage v-if="activityStore.isLoading" />
        <div v-else-if="activityStore.isEmpty" class="w-full h-full flex justify-center items-center">
                <ImageWithBottomText :image="emptyImage" text="Anda belum melakukan presensi hari ini"/>                                                                                   
        </div>
        <div v-else class="flex flex-col gap-4">
            <CardLogActivity v-for="(activity, index) in activityData" :key="index" :activity="activity.activity"
                :time="activity.time" :date="activity.date" :status="activity.location" />
        </div>

    </div>
</template>