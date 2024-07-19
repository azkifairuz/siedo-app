<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
import CardLearningSchedule from '@/components/CardLearningSchedule.vue'
import { onMounted, reactive } from 'vue';
import type { Profile } from '@/type/Profile';
import { useUser } from '@/stores/useProfile';
import {  getFormattedDate } from "@/utils/formateDate";
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

const token = localStorage.getItem('token');

async function getProfile() {
  if (token) {
   await profileStore.getProfile(token);
    if (profileStore.profile) {
      Object.assign(profile, profileStore.profile);
      console.log(profile);
    }
  }
}
const dateNow = getFormattedDate()

onMounted(() => {
  getProfile()
})

function hanldePresensi() {
  console.log("presensi");
}
</script>

<template>
  <main class="min-h-svh flex flex-col w-100  bg-main-blue">
    <div class="flex justify-between p-6 items-center">
      <div>
        <p class="text-[16px] text-white">Selamat pagi,</p>
        <h1 class="text-white text-[24px] font-semibold">{{ profile.nama }}</h1>
      </div>
      <div class="w-[80px] h-[80px] flex-shrink-0 bg-gray-400 rounded-[80px]">
      </div>
    </div>
    <div class="relative">
      <div class="bg-surface mx-6  flex flex-col gap-6 shadow-custom-card z-50 relative rounded-[12px] py-3 px-6">
        <h1 class="text-main-blue  text-[14px] font-semibold">{{ dateNow }}</h1>
        <PrimaryButton text="Presensi" color="bg-main-blue" @clickable="hanldePresensi" text-color="text-white"
          :is-disable=false width="w-full" />
      </div>
      <div class="min-h-svh rounded-[24px] p-6  mt-[-32px] bg-[#FBFBFB] z-0 relative">
        <section class="jadwal-mengajar-section mt-[57px] ">
          <div class="w-full flex justify-between items-center mb-6 cursor-pointer">
            <h1 class="text-[16px] font-bold">Jadwal Mengajar</h1>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.6825 14.94L11.5725 10.05C12.15 9.4725 12.15 8.5275 11.5725 7.95L6.6825 3.06" stroke="#112A46"
                stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </div>
          <div class="flex flex-col gap-3">
            <CardLearningSchedule day="Jumat" semester="ganjil" year="2023/2024" subject="Pemrograman Dasar"
              room="2Ti03" />
            <CardLearningSchedule day="Jumat" semester="ganjil" year="2023/2024" subject="Pemrograman Dasar"
              room="2Ti03" />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
