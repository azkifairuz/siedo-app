<script setup lang="ts">
defineProps<{
    label: string
    placeholder: string
    type: string
    modelValue: string
}>()

const emits = defineEmits(['update:modelValue']);
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    emits('update:modelValue', target.value);
  }
};
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <label :for="label">{{ label }}</label>
        <input class="rounded-lg py-2 px-3 focus:outline-main-blue outline-1 outline outline-[#ABB8C7]" :id="label"
            :type="type" :placeholder="placeholder" :value="modelValue"
            @input="handleInput">
    </div>
</template>