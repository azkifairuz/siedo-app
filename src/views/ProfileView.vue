<script setup lang="ts">
import CardProfile from '@/components/CardProfile.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import IconHumberger from '@/components/icons/IconHumberger.vue';
import { onMounted, reactive } from 'vue';
import type { Profile } from '@/type/Profile';
import { useUser } from '@/stores/useProfile';
import {  getFormattedDate } from "@/utils/formateDate";
import { getToken } from '@/utils/getToken';
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
})

const profileStore = useUser();

const token = getToken()

async function getProfile() {
  if (token) {
   await profileStore.getProfile(token);
    if (profileStore.profile) {
      Object.assign(profile, profileStore.profile);
      console.log(profile);
    }
  }
}

onMounted(() => {
  getProfile()
})
async function hanldePresensi() {
  
}

</script>
<template>
     <main class="min-h-svh flex flex-col w-100  bg-main-blue">
    <div class="flex  p-6 items-center justify-center">
        <p class="text-[20px] text-center flex-1 text-white">Profile dosen</p>
        <div class=" bg-black">
            <IconHumberger/>
        </div>
    </div>
    <div class="relative">
      <div class="bg-surface mx-6  flex flex-col gap-6 shadow-custom-card z-50 relative rounded-[12px] p-3">
        <div class="flex gap-3 items-center ">
          <div class="w-[80px] h-[80px] flex-shrink-0 bg-gray-400 rounded-[80px]">
          </div>
          <div class="text-main-blue">
            <p class="text-[12px] mb-2">Semester Ganjil 2023</p>
            <p class="text-[16px] font-semibold text-main-blue">{{ profile.nama }}</p>
            <p class="text-[12px]">{{ profile.nidn }}</p>
            <p class="text-[12px]">{{ profile.programStudi }}</p>
          </div>
        </div>
        <PrimaryButton text="Edit" color="bg-main-blue" @clickable="hanldePresensi" text-color="text-white"
          :is-disable=false width="w-full" />
      </div>
      <div class="min-h-svh rounded-[24px] p-6  mt-[-62px] bg-[#FBFBFB] z-0 relative">
        <section class="mt-[62px] ">
          <div class="flex flex-col gap-3">
            <CardProfile title="Biodata">
              <template v-slot:body>
                <div class="text-[14px] text-main-blue flex flex-col gap-1">
                  <p>{{ profile.programStudi }}</p>
                  <p>{{ profile.jenjangPendidikan }}</p>
                  <p>{{ profile.jenisKelamin }}</p>
                  <p>{{ profile.tanggalLahir }}</p>
                  <p>{{ profile.alamatSurel }}</p>
                  <p>{{ profile.noTelephone }}</p>
                </div>
              </template>
            </CardProfile>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>