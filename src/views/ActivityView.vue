<script setup lang="ts">
import CardLogActivity from '@/components/CardLogActivity.vue';

</script>
<template>
    <div class="font-quicksand  p-6 ">
        <h1 class="text-main-blue text-center text-[18px] font-bold">Aktivitas</h1>

        <div class="my-6 flex gap-4 w-full justify-center items-center">
            <span class="rounded-xl cursor-pointer border px-3.5  text-[16px]  border-main-blue text-main-blue">Semua</span>
            <span class="rounded-xl cursor-pointer border px-3.5  text-[16px] border-main-blue text-main-blue">Hari Ini</span>
            <span class="rounded-xl cursor-pointer border px-3.5  text-[16px] border-main-blue text-main-blue">Seminggu</span>
        </div>
        <CardLogActivity activity="Check-In" date="Sabtu,  19 Juli 2024" time="08.00" status="online"/>
        <CardLogActivity activity="Check-In" date="Sabtu,  19 Juli 2024" time="08.00" status="offline"/>
        <CardLogActivity activity="Check-In" date="Sabtu,  19 Juli 2024" time="08.00" status="izin"/>
    </div>
</template>