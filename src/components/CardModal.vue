<script setup lang="ts">
import ImageWithBottomText from '@/components/ImageWithBottomText.vue';
import modalImg from '@/assets/img/modal.png'
import PrimaryButton from '@/components/PrimaryButton.vue';
defineProps<{
    text: string,
    buttonText: string,
}>()

const emits = defineEmits(['clickable']);

function onClick() {
    emits('clickable')
}

</script>
<template>
    <div class="fixed inset-0 w-full p-6 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="rounded-[12px] w-full py-6 px-3.5 flex flex-col justify-center items-center gap-3.5 bg-white">
            <ImageWithBottomText :image="modalImg" :text="text" />
            <PrimaryButton @clickable="onClick" :text="buttonText" color="bg-main-blue" text-color="text-white"
                :is-disable="false" width="w-full" />
        </div>
    </div>
</template>