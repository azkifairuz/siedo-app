<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue';
function hanldePresensi() {
  console.log("presensi");
  
}
</script>

<template>
  <main class="min-h-svh flex flex-col w-100  bg-main-blue">
    <div class="flex justify-between p-6 items-center">
      <div>
        <p class="text-[16px] text-white">Selamat pagi,</p>
        <h1 class="text-white text-[24px] font-semibold">Azkia Ajmal Fairuz</h1>
      </div>
      <div class="w-[80px] h-[80px] flex-shrink-0 bg-gray-400 rounded-[80px]">
      </div>
    </div>
    <div class="relative">
      <div class="bg-surface mx-6  flex flex-col gap-6 shadow-custom-card z-50 relative rounded-[12px] py-3 px-6">
        <h1 class="text-main-blue  text-[14px] font-semibold">Jumat, 12 juni 2024</h1>
        <PrimaryButton
          text="Presensi"
          color="bg-main-blue"
          @clickable="hanldePresensi"
          text-color="text-white"
          :is-disable=false
          width="w-full"
        />
      </div>
      <div class="min-h-svh rounded-[24px] p-6  mt-[-32px] bg-[#FBFBFB] z-0 relative">
          <section class="jadwal-mengajar-section">
              <div class="w-full flex justify-between items-center">
                <h1 class="text-[16px] font-bold">Jadwal Mengajae</h1>
              </div>
          </section>
      </div>
    </div>
  </main>
</template>
