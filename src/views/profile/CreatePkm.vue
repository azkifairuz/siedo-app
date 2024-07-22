<script setup lang="ts">
import AlertDialog from '@/components/AlertDialog.vue';
import BaseInpuField from '@/components/BaseInpuField.vue';
import CardModal from '@/components/CardModal.vue';
import DocumentInputField from '@/components/DocumentInputField.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TopAppBar from '@/components/TopAppBar.vue';
import { usePkm } from '@/stores/usePkm';
import type { PkmRequest } from '@/type/Pkm';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const pkm = reactive<PkmRequest>(
    {
        judul: "",
        tahunPelaksanaan: "",
        lamaKegiatan: "",
        lokasiKegiatan: "",
        nomorSkPengesahan: "",
    }
)

const file = ref<File>();
const pkmStore = usePkm();
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
    router.push({ name: 'profile' });
}
const createPkm = async () => {
    try {
        if (!file.value) {
            alertMessage.value = 'file tidak boleh kosong'
            resetAlert()
            return
        }
        await pkmStore.createPkm(pkm, file.value);
        resetAlert()

        if (!pkmStore.error) {
            showModal.value = true
            modalMessage.value = "berhasil upload pkm"
        }

        alertMessage.value = `${pkmStore.message}`
    } catch (error) {
        alertMessage.value = `${pkmStore.message}`
        resetAlert()

    } finally {
        resetAlert()
    }
};



</script>
<template>
    <TopAppBar title="Upload PKM" />
    <div class=" pt-12 ">
        <LoadingPage v-show="pkmStore.isLoading" />
        <CardModal v-if="showModal" :text="modalMessage" button-text="Kembali ke profile" @clickable="backToHome" />
        <div v-else class="flex flex-col p-6 gap-4">
            <BaseInpuField v-model="pkm.judul" label="judul" type="text" placeholder="judul" />
            <BaseInpuField v-model="pkm.tahunPelaksanaan" label="Tahun pelaksanaan" type="text" placeholder="tahun pelaksanaan" />
            <BaseInpuField v-model="pkm.lamaKegiatan" label="lama kegiatan" type="text" placeholder="e.g:6 bulan" />
            <BaseInpuField v-model="pkm.lokasiKegiatan" label="lokasi" type="text" placeholder="lokasi" />
            <BaseInpuField v-model="pkm.nomorSkPengesahan" label="nomor SK" type="text" placeholder="456/TIE/2023" />
            <DocumentInputField v-model="file" label="uploda document" />
            <PrimaryButton text="Simpan" :is-disable="false" @clickable="createPkm" width="w-full"
                text-color="text-white" color="bg-main-blue" />
        </div>
        <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />
    </div>
</template>