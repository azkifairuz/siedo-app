<script setup lang="ts">
import AlertDialog from '@/components/AlertDialog.vue';
import BaseInpuField from '@/components/BaseInpuField.vue';
import CardModal from '@/components/CardModal.vue';
import DocumentInputField from '@/components/DocumentInputField.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TopAppBar from '@/components/TopAppBar.vue';
import { usePresensi } from '@/stores/usePresensi';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const reason = ref('');
const file = ref<File>();
const presensiStore = usePresensi();
const show = ref(false)
const showModal = ref(false);
const modalMessage = ref("");
const alertMessage = ref("");
const router = useRouter()

const resetAlert = () => {
    show.value = false;
    setTimeout(() => {
        show.value = true;
        setTimeout(() => {
            show.value = false;
        }, 5000);
    }, 10);
};
function backToHome() {
    router.push({ name: 'home' });
}
const submitIzin = async () => {
    try {
        if (!reason.value) {
            alertMessage.value = 'alasan tidak boleh kosong'
            resetAlert()

            return
        }
        if (!file.value) {
            alertMessage.value = 'file bukti tidak boleh kosong'
            resetAlert()

            return
        }
        await presensiStore.izin(reason.value, file.value);
        alertMessage.value = `${presensiStore.message}`
        modalMessage.value = "Permintaan izin sudah terkirim."
        showModal.value = true
        resetAlert()

    } catch (error) {
        alertMessage.value = `${presensiStore.message}`
        resetAlert()

    } finally {
        resetAlert()
    }



};


</script>
<template>
    <TopAppBar title="Permintaan Izin" />
    <div class=" pt-12 ">
        <LoadingPage v-show="presensiStore.isLoading" />
        <CardModal v-if="showModal" :text="modalMessage" button-text="Kembali ke beranda"
        @clickable="backToHome" />
        <div v-else class="flex flex-col mt-6 p-6 gap-4">
            <BaseInpuField v-model="reason" label="Alasan" type="text" placeholder="apa alasan anda tidak masuk?" />
            <DocumentInputField v-model="file" label="Bukti" />
            <PrimaryButton text="Simpan" :is-disable="false" @clickable="submitIzin" width="w-full"
                text-color="text-white" color="bg-main-blue" />
        </div>
        <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />
    </div>
</template>