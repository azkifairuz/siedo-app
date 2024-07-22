<script setup lang="ts">
import AlertDialog from '@/components/AlertDialog.vue';
import BaseInpuField from '@/components/BaseInpuField.vue';
import CardModal from '@/components/CardModal.vue';
import DocumentInputField from '@/components/DocumentInputField.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TopAppBar from '@/components/TopAppBar.vue';
import { useJurnal } from '@/stores/useJurnal';
import type { JurnalRequest } from '@/type/Jurnal';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const jurnal = reactive<JurnalRequest>(
    {
        judulArtikel: "",
        namaJurnal: "",
        tautanLamanJurnal: "",
        tanggalTerbit: "",
        volume: "",
        nomor: "",
        halaman: "",
        penerbitPenyelanggara: "",
        issn: "",
    }
)
const file = ref<File>();
const jurnalStore = useJurnal();
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
const editBiodata = async () => {
    try {
        if (!file.value) {
            alertMessage.value = 'file tidak boleh kosong'
            resetAlert()

            return
        }
        await jurnalStore.createJurnal(jurnal, file.value);
        resetAlert()

        if (!jurnalStore.error) {
            showModal.value = true
            modalMessage.value = "berhasil membuat jurnal"
        }
        console.log(jurnalStore.error);
        console.log(jurnalStore.error);

        alertMessage.value = `${jurnalStore.message}`

    } catch (error) {
        alertMessage.value = `${jurnalStore.message}`
        resetAlert()

    } finally {
        resetAlert()
    }
};



</script>
<template>
    <TopAppBar title="Upload Jurnal" />
    <div class=" pt-12 ">
        <LoadingPage v-show="jurnalStore.isLoading" />
        <CardModal v-if="showModal" :text="modalMessage" button-text="Kembali ke profile" @clickable="backToHome" />
        <div v-else class="flex flex-col p-6 gap-4">
            <BaseInpuField v-model="jurnal.judulArtikel" label="Judul Artikel" type="text" placeholder="judul" />
            <BaseInpuField v-model="jurnal.namaJurnal" label="Nama Jurnal" type="text" placeholder="Nama" />
            <BaseInpuField v-model="jurnal.volume" label="volume" type="number" placeholder="volume" />
            <BaseInpuField v-model="jurnal.nomor" label="no" type="number" placeholder="nomor jurnal" />
            <BaseInpuField v-model="jurnal.halaman" label="halaman" type="text" placeholder="halaman" />
            <BaseInpuField v-model="jurnal.issn" label="issn" type="text" placeholder="isssn" />
            <BaseInpuField v-model="jurnal.tanggalTerbit" label="tahun terbit" type="number"
                placeholder="tahun terbit" />
            <BaseInpuField v-model="jurnal.tautanLamanJurnal" label="tautan" type="text" placeholder="link jurnal" />
            <DocumentInputField v-model="file" label="uploda document" />
            <PrimaryButton text="Simpan" :is-disable="false" @clickable="editBiodata" width="w-full"
                text-color="text-white" color="bg-main-blue" />
        </div>
        <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />
    </div>
</template>