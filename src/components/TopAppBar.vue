<script setup lang="ts">
import { useRouter } from 'vue-router';


defineProps<{
    title:string
}>()


const router = useRouter();

const goBack = () => {
  router.back();  // or you can use router.go(-1);
};
</script>

<template>
    <div class="p-6 bg-surface flex gap-4  items-center">
        <button @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.92999L3.5 12L9.57 18.07" stroke="#112A46" stroke-width="1.5" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.5 12H3.67004" stroke="#112A46" stroke-width="1.5" stroke-miterlimit="10"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <h1 class="text-[18px] text-main-blue font-semibold">{{ title }}</h1>
    </div>
</template>