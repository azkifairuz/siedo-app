<script setup lang="ts">
import CardProfile from '@/components/CardProfile.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import IconHumberger from '@/components/icons/IconHumberger.vue';
import { onMounted, reactive, ref } from 'vue';
import type { Profile } from '@/type/Profile';
import { useUser } from '@/stores/useProfile';
import { getToken } from '@/utils/getToken';
import { useJurnal } from '@/stores/useJurnal';
import type { Jurnal } from '@/type/Jurnal';
import type { Pkm } from '@/type/Pkm';
import { usePkm } from '@/stores/usePkm';
import LoadingPage from '@/components/LoadingPage.vue';
import empyImg from '@/assets/img/empty.png'
import dumy from '@/assets/img/dumy_image.png'
import { useRouter } from 'vue-router';
const profile = reactive<Profile>({
  nidn: "",
  nama: "",
  programStudi: "",
  jenjangPendidikan: "",
  jenisKelamin: "",
  tanggalLahir: "",
  jabatanAkademik: "",
  noTelephone: "",
  alamatSurel: "",
  isAlreadyPresensi: false
})

const jurnal = ref<Jurnal[]>([])
const pkm = ref<Pkm[]>([])

const profileStore = useUser();
const jurnalStore = useJurnal();
const pkmStore = usePkm();
const router = useRouter()
const token = getToken()
const isLoading = ref<boolean>(false)
const tnglLahir = ref("")

async function getProfile() {
  isLoading.value = true
  try {
    if (token) {
      if (!profileStore.profile) {
        await profileStore.getProfile();
      }
      Object.assign(profile, profileStore.profile);
      tnglLahir.value = profile.tanggalLahir.split('T')[0]
    }

    if (jurnalStore.jurnal.length < 1) {
      await jurnalStore.getAllJurnal()
    }
    jurnal.value = jurnalStore.jurnal
    if (pkmStore.pkm.length < 1) {
      await pkmStore.getAllPkm()
    }
    pkm.value = pkmStore.pkm
  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getProfile()

})
function edit() {
  router.push({ name: "edit-profile" })
}
function biodata() {
  router.push({ name: "edit-biodata" })
}
function goToJurnal() {
  router.push({ name: "create-jurnal" })
}
</script>
<template>
  <LoadingPage v-if="isLoading" />
  <main v-else class="min-h-svh flex flex-col w-100  bg-main-blue">
    <div class="flex  p-6 items-center justify-center">
      <p class="text-[20px] text-center flex-1 text-white">Profile dosen</p>
      <div class=" bg-black">
        <IconHumberger />
      </div>
    </div>
    <div class="relative">
      <div class="bg-surface mx-6  flex flex-col gap-6 shadow-custom-card z-50 relative rounded-[12px] p-3">
        <div class="flex gap-3 items-center ">
          <img :src="dumy" class="w-[80px] h-[80px] flex-shrink-0 bg-gray-400 rounded-[80px]">
          </img>
          <div class="text-main-blue">
            <p class="text-[12px] mb-2">Semester Ganjil 2023</p>
            <p class="text-[16px] font-semibold text-main-blue">{{ profile.nama }}</p>
            <p class="text-[12px]">{{ profile.nidn }}</p>
          </div>
        </div>
        <PrimaryButton text="Edit" color="bg-main-blue" @clickable="edit" text-color="text-white" :is-disable=false
          width="w-full" />
      </div>
      <div class="min-h-svh rounded-t-[24px] p-6  mt-[-62px] bg-[#FBFBFB] z-0 relative">
        <section class="mt-[62px] ">
          <div class="flex flex-col gap-4">
            <CardProfile @clickable="biodata" title="Biodata">
              <template v-slot:body>
                <div class="text-[14px] text-main-blue flex flex-col gap-1">
                  <p>{{ profile.programStudi }}</p>
                  <p>{{ profile.jenjangPendidikan }}</p>
                  <p>{{ profile.jenisKelamin }}</p>
                  <p>{{ tnglLahir }}</p>
                  <p>{{ profile.alamatSurel }}</p>
                  <p>{{ profile.noTelephone }}</p>
                </div>
              </template>
            </CardProfile>
            <CardProfile @clickable="goToJurnal" title="Jurnal">
              <template v-slot:body>
                <div v-if="jurnal.length > 0">
                  <div class="flex flex-col gap-6">

                    <div c v-for="item in jurnal" :key="item.id"
                      class="text-[14px] border-main-blue pb-2 border-b text-main-blue flex flex-col gap-1">
                      <h1 class="text-xs font-medium">{{ item.judulArtikel }}</h1>
                      <p class="text-xs text-main-blue">{{ item.namaJurnal }}</p>
                      <p class="text-main-blue text-[10px] font-light">Volume {{ item.volume }}, No {{ item.nomor }},
                        hal
                        {{
                          item.halaman }},ISSN: {{ item.issn }}, {{ item.tanggalTerbit }}</p>
                      <div class="w-full flex justify-between items-center">
                        <a class="text-[#087BFB] text-[10px] font-light" :href="item.tautanLamanJurnal">Link Jurnal</a>
                        <p class="text-main-blue text-xs cursor-pointer font-medium">edit</p>
                      </div>
                    </div>
                  </div>
                  <!-- <h1 class="text-[12px] mt-4 text-center cursor-pointer text-main-blue font-semibold">Lihat seluruh
                    jurnal anda</h1> -->
                </div>
                <div v-else class="w-full flex flex-col justify-center items-center">
                  <div class="w-[100px]">
                    <img :src="empyImg" alt="">
                  </div>
                  <p class="text-center font-quicksand text-[14px] text-main-blue">belum ada pengabdian masyarakat</p>
                </div>
              </template>
            </CardProfile>

            <CardProfile title="Pengabdian Masyarakat">
              <template v-slot:body>
                <div v-if="pkm.length > 0">

                  <div class="flex flex-col gap-6">

                    <div v-for="item in pkm" :key="item.id"
                      class="text-[14px] border-b border-main-blue pb-2  text-main-blue flex flex-col gap-1">
                      <h1 class="text-xs font-medium">{{ item.judul }}</h1>
                      <p class="text-xs text-main-blue">{{ item.lokasiKegiatan }}</p>
                      <p class="text-main-blue text-[10px] font-light">SK No. {{ item.nomorSkPengesahan }}</p>
                      <div class="w-full flex gap-2 items-center">
                        <p class="text-main-blue text-[10px]">{{ item.lamaKegiatan }}</p>
                        <p class="text-main-blue text-[10px]">{{ item.tahunPelaksanaan }}</p>
                      </div>
                      <p class="text-main-blue text-xs text-end cursor-pointer font-medium">edit</p>

                    </div>
                  </div>

                </div>
                <div v-else class="w-full flex flex-col justify-center items-center">
                  <div class="w-[100px]">
                    <img :src="empyImg" alt="">
                  </div>
                  <p class="text-center font-quicksand text-[14px] text-main-blue">belum ada pengabdian masyarakat</p>
                </div>
              </template>
            </CardProfile>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>