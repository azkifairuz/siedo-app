<script setup lang="ts">
  defineProps<{
        title:string,

    }>()
</script>
<template>
    <div class="shadow-custom-card">
        <div class="bg-main-blue text-white p-2 flex justify-between items-center rounded-t-lg">
            <span class="text-[14p] text-white font-semibold">{{ title }}</span>
            <button class="text-white">
                <!-- Icon for edit, you can use any icon library here -->
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.33333 1.33333H6C2.66666 1.33333 1.33333 2.66666 1.33333 6V10C1.33333 13.3333 2.66666 14.6667 6 14.6667H10C13.3333 14.6667 14.6667 13.3333 14.6667 10V8.66666"
                        stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M10.6933 2.01333L5.44 7.26667C5.24 7.46667 5.04 7.86 5 8.14667L4.71333 10.1533C4.60666 10.88 5.12 11.3867 5.84666 11.2867L7.85333 11C8.13333 10.96 8.52666 10.76 8.73333 10.56L13.9867 5.30667C14.8933 4.4 15.32 3.34667 13.9867 2.01333C12.6533 0.680001 11.6 1.10667 10.6933 2.01333Z"
                        stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M9.94 2.76666C10.3867 4.36 11.6333 5.60666 13.2333 6.06" stroke="white" stroke-width="1.5"
                        stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div class="px-3 py-2 bg-white rounded-b-lg">
            <slot name="body"></slot>
        </div>
    </div>
</template>