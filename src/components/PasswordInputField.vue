<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import IconEyesOpen from '@/components/icons/IconEyeOpen.vue';
import IconEyesClose from '@/components/icons/IconEyeClose.vue';

defineProps<{
    label: string,
    placeholder: string,
    modelValue: string
}>();
const isOpen = ref<boolean>(false)
const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target) {
        emits('update:modelValue', target.value);
    }
};

function handleOpen() {
    isOpen.value = !isOpen.value
}  
</script>
<template>
    <div class="flex flex-col gap-1.5 relative">
        <label class="text-[16px] text-[#6D839B]" :for="label">{{ label }}</label>
        <div class="relative">
            <input class="rounded-lg py-2 pl-3 pr-10 focus:outline-main-blue outline-1 outline outline-[#ABB8C7] w-full"
                :id="label" :type="isOpen ? 'text' : 'password'" :placeholder="placeholder" :value="modelValue"
                @input="handleInput" />
            <button @click="handleOpen" v-if="isOpen" class="absolute right-2 top-1/2 transform -translate-y-1/2">

                <IconEyesOpen />

            </button>
            <button @click="handleOpen" v-else class="absolute right-2 top-1/2 transform -translate-y-1/2">
                <IconEyesClose />
            </button>
        </div>
    </div>
</template>