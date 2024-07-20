<script setup lang="ts">
import ImageWithBottomText from "@/components/ImageWithBottomText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import getTimeOfDay from "@/utils/sayHelo";
import userLocationImg from "@/assets/img/location_review.png"
const timeOfDay = getTimeOfDay()
</script>
<template>
    <div class=" p-6 min-h-screen flex flex-col gap-6  justify-center items-center ">
        <ImageWithBottomText :image="userLocationImg"
            :text="`Selamat ${timeOfDay}! Dimana anda akan bekerja hari ini`" />
       <div class="flex flex-col gap-3 w-full">
        <PrimaryButton color="bg-main-blue hover:bg-secondary" text-color=" text-white hover:text-black" :is-disable="false" text="Di kampus"
            width="w-full" />
        <PrimaryButton color="bg-surface" text-color=" text-main-blue  border-2 hover:text-surface hover:bg-main-blue border-main-blue" :is-disable="false" text="Dari rumah"
            width="w-full" />
        <PrimaryButton color="bg-main-yellow" text-color="text-main-blue" :is-disable="false" text="izin"
            width="w-full" />
       </div>
    </div>
</template>