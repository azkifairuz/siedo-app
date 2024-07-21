<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    label: String,
    placeholder: {
        type: String,
        default: 'Upload bukti'
    },
    modelValue: {
        type: File,
        default: null
    }
});

const emits = defineEmits(['update:modelValue']);

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        console.log('Selected file:', file);
        emits('update:modelValue', file);
    }
};

</script>

<template>
    <div class="w-full  ">
        <label class=" text-[#6D839B] text-[16px] " for="file-upload">
            {{ label }}
        </label>
        <div class="outline-1 outline outline-[#ABB8C7] hover:outline-main-blue focus:outline-main-blue mt-1.5 h-[290px] rounded-lg  flex justify-center items-center " >
            <input type="file" id="file-upload" ref="fileInput" class="hidden" @change="handleFileUpload" />
            <div @click="triggerFileInput" class="cursor-pointer flex flex-col justify-center items-center text-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5 16.125C11.22 16.125 9.375 14.28 9.375 12C9.375 9.72 11.22 7.875 13.5 7.875C15.78 7.875 17.625 9.72 17.625 12C17.625 14.28 15.78 16.125 13.5 16.125ZM13.5 10.125C12.465 10.125 11.625 10.965 11.625 12C11.625 13.035 12.465 13.875 13.5 13.875C14.535 13.875 15.375 13.035 15.375 12C15.375 10.965 14.535 10.125 13.5 10.125Z"
                        fill="#ABB8C7" />
                    <path
                        d="M22.5 34.125H13.5C5.355 34.125 1.875 30.645 1.875 22.5V13.5C1.875 5.355 5.355 1.875 13.5 1.875H19.5C20.115 1.875 20.625 2.385 20.625 3C20.625 3.615 20.115 4.125 19.5 4.125H13.5C6.585 4.125 4.125 6.585 4.125 13.5V22.5C4.125 29.415 6.585 31.875 13.5 31.875H22.5C29.415 31.875 31.875 29.415 31.875 22.5V15C31.875 14.385 32.385 13.875 33 13.875C33.615 13.875 34.125 14.385 34.125 15V22.5C34.125 30.645 30.645 34.125 22.5 34.125Z"
                        fill="#ABB8C7" />
                    <path
                        d="M31.875 8.625H23.625C23.01 8.625 22.5 8.115 22.5 7.5C22.5 6.885 23.01 6.375 23.625 6.375H31.875C32.49 6.375 33 6.885 33 7.5C33 8.115 32.49 8.625 31.875 8.625Z"
                        fill="#ABB8C7" />
                    <path
                        d="M27.75 12.75C27.135 12.75 26.625 12.24 26.625 11.625V3.375C26.625 2.76 27.135 2.25 27.75 2.25C28.365 2.25 28.875 2.76 28.875 3.375V11.625C28.875 12.24 28.365 12.75 27.75 12.75Z"
                        fill="#ABB8C7" />
                    <path
                        d="M4.00495 29.55C3.64495 29.55 3.28495 29.37 3.07495 29.055C2.72995 28.545 2.86495 27.84 3.37495 27.495L10.77 22.53C12.39 21.45 14.625 21.57 16.0949 22.815L16.59 23.25C17.34 23.895 18.615 23.895 19.35 23.25L25.59 17.895C27.195 16.53 29.685 16.53 31.29 17.895L33.735 19.995C34.2 20.4 34.26 21.105 33.855 21.585C33.45 22.05 32.745 22.11 32.265 21.705L29.82 19.605C29.07 18.96 27.795 18.96 27.06 19.605L20.82 24.96C19.23 26.325 16.725 26.325 15.12 24.96L14.625 24.525C13.935 23.94 12.795 23.88 12.03 24.405L4.64995 29.37C4.43995 29.49 4.21495 29.55 4.00495 29.55Z"
                        fill="#ABB8C7" />
                </svg>

                <p class="text-gray-400 mt-2">{{ placeholder }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
