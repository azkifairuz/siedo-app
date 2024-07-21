<script setup lang="ts">
import AlertDialog from '@/components/AlertDialog.vue';
import BaseInpuField from '@/components/BaseInpuField.vue';
import CardModal from '@/components/CardModal.vue';
import LoadingPage from '@/components/LoadingPage.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TopAppBar from '@/components/TopAppBar.vue';
import { useUser } from '@/stores/useProfile';
import type { ProfileRequest } from '@/type/ProfileRequest';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const biodata = reactive<ProfileRequest>(
    {
        nama: "",
        programStudi: "",
        jenjangPendidikan: "",
        jenisKelamin: "",
        tanggalLahir: "",
        jabatanAkademik: "",
        noTelephone: "",
        alamatSurel: "",
    }
)
const presensiStore = useUser();
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
async function getCurentData() {
    await presensiStore.getProfile();
    if (presensiStore.profile) {
        biodata.nama = presensiStore.profile.nama
        biodata.alamatSurel = presensiStore.profile.alamatSurel
        biodata.jabatanAkademik = presensiStore.profile.jabatanAkademik
        biodata.jenisKelamin = presensiStore.profile.jenisKelamin
        biodata.noTelephone = presensiStore.profile.noTelephone
        biodata.jenjangPendidikan = presensiStore.profile.jenjangPendidikan
        biodata.programStudi = presensiStore.profile.programStudi
        biodata.tanggalLahir = presensiStore.profile.tanggalLahir
    }
}
function backToHome() {
    router.push({ name: 'profile' });
}
const editBiodata = async () => {
    try {
        await presensiStore.updateProfile(biodata);
        alertMessage.value = `${presensiStore.massage}`
        resetAlert()
        if (!presensiStore.error) {
            showModal.value = true
            modalMessage.value = "biodata berhasil ter update"
        }

    } catch (error) {
        alertMessage.value = `${presensiStore.massage}`
        resetAlert()

    } finally {
        resetAlert()
    }
};

onMounted(() => {
    getCurentData()
})

</script>
<template>
    <TopAppBar title="Edit Profile" />
    <div class=" pt-12 ">
        <LoadingPage v-show="presensiStore.isLoading" />
        <CardModal v-if="showModal" :text="modalMessage" button-text="Kembali ke profile" @clickable="backToHome" />
        <div v-else class="flex flex-col p-6 gap-4">
            <BaseInpuField v-model="biodata.nama" label="jabatan akademik" type="text"
                placeholder="jabatan akademink" />

            <PrimaryButton text="Simpan" :is-disable="false" @clickable="editBiodata" width="w-full"
                text-color="text-white" color="bg-main-blue" />
        </div>
        <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />
    </div>
</template>