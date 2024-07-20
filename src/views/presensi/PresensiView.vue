<script setup lang="ts">
import TopAppBar from "@/components/TopAppBar.vue";
import ImageWithBottomText from "@/components/ImageWithBottomText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import getTimeOfDay from "@/utils/sayHelo";
import userLocationImg from "@/assets/img/location_review.png"
import { ref } from "vue";
import { usePresensi } from "@/stores/usePresensi";
import LoadingPage from "@/components/LoadingPage.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { useRouter } from "vue-router";
import CardModal from "@/components/CardModal.vue";
const timeOfDay = getTimeOfDay()
const show = ref(false);
const showModal = ref(false);
const modalMessage = ref("");
const alertMessage = ref("");

function backToHome() {
    router.push({ name: 'home' });
}
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

    if (!presensiStore.error) {
        showModal.value = true
        modalMessage.value = `Presensi masuk anda berhasil pada jam ${presensiStore.time}`
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

    if (!presensiStore.error) {
        showModal.value = true
        modalMessage.value = `Presensi masuk anda berhasil pada jam ${presensiStore.time}`
    }
}

</script>
<template>
    <div class="min-h-screen  flex flex-col ">
        <TopAppBar title="Presensi" />
        <main class="font-quicksand flex-1 h-screen mb-20">
            <LoadingPage v-if="presensiStore.isLoading" />
            <CardModal v-else-if="showModal" :text="modalMessage" button-text="Kembali ke beranda"
                @clickable="backToHome" />
            <div v-else class=" p-6 min-h-screen  flex flex-col gap-6  justify-center items-center ">
                <ImageWithBottomText :image="userLocationImg"
                    :text="`Selamat ${timeOfDay}! Dimana anda akan bekerja hari ini`" />
                <div class="flex flex-col gap-3 w-full">
                    <PrimaryButton @clickable="checkInOffline" color="bg-main-blue hover:bg-secondary"
                        text-color=" text-white hover:text-black" :is-disable="presensiStore.isLoading" text="Di kampus"
                        width="w-full" />
                    <PrimaryButton @clickable="checkinOnline" color="bg-surface"
                        text-color=" text-main-blue  border-2 hover:text-surface hover:bg-main-blue border-main-blue"
                        :is-disable="presensiStore.isLoading" text="Dari rumah" width="w-full" />
                    <PrimaryButton color="bg-main-yellow" text-color="text-main-blue"
                        :is-disable="presensiStore.isLoading" text="izin" width="w-full" />
                </div>
                <AlertDialog v-show="show" :message="alertMessage" :duration="5000" />
            </div>
        </main>
    </div>
</template>