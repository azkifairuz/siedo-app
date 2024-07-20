<script setup lang="ts">
import ImageWithBottomText from "@/components/ImageWithBottomText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import getTimeOfDay from "@/utils/sayHelo";
import userLocationImg from "@/assets/img/location_review.png"
import { ref } from "vue";
import { usePresensi } from "@/stores/usePresensi";
import LoadingPage from "@/components/LoadingPage.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { useRouter } from "vue-router";

const timeOfDay = getTimeOfDay()
const show = ref(false);
const alertMessage = ref("");

const presensiStore = usePresensi();
const inLocation = ref<boolean>(true)
const router = useRouter()
async function checkInOffline() {
    await presensiStore.checkInOffline(inLocation.value)
    alertMessage.value = `${presensiStore.message}`
    show.value = false; 
    setTimeout(() => {
        show.value = true;
    }, 10); 
    setTimeout(() => {
        show.value = false;
    }, 5000); 
    console.log(presensiStore.error);
    
    if (!presensiStore.error) {
        router.push({ name: 'presensi-end' });
    }
}
async function checkinOnline() {
    await presensiStore.checkInOnline()
    alertMessage.value = `${presensiStore.message}`
    show.value = false; 
    setTimeout(() => {
        show.value = true;
    }, 10); 
    setTimeout(() => {
        show.value = false;
    }, 5000); 
    console.log(presensiStore.error);
    
    if (!presensiStore.error) {
        router.push({ name: 'presensi-end' });
    }
}
</script>
<template>
    <LoadingPage v-if="presensiStore.isLoading" />
    <div v-else class=" p-6 min-h-screen flex flex-col gap-6  justify-center items-center ">
        <ImageWithBottomText :image="userLocationImg"
            :text="`Selamat ${timeOfDay}! Dimana anda akan bekerja hari ini`" />
        <div class="flex flex-col gap-3 w-full">
            <PrimaryButton @clickable="checkInOffline" color="bg-main-blue hover:bg-secondary"
                text-color=" text-white hover:text-black" :is-disable="presensiStore.isLoading" text="Di kampus" width="w-full" />
            <PrimaryButton @clickable="checkinOnline" color="bg-surface"
                text-color=" text-main-blue  border-2 hover:text-surface hover:bg-main-blue border-main-blue"
                :is-disable="presensiStore.isLoading" text="Dari rumah" width="w-full" />
            <PrimaryButton color="bg-main-yellow" text-color="text-main-blue" :is-disable="presensiStore.isLoading" text="izin"
                width="w-full" />
        </div>
        <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />

    </div>

</template>