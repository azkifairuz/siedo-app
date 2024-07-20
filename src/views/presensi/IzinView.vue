<script setup lang="ts">
import BaseInpuField from '@/components/BaseInpuField.vue';
import DocumentInputField from '@/components/DocumentInputField.vue';
import PrimaryButton from '@/components/PrimaryButton.vue';
import TopAppBar from '@/components/TopAppBar.vue';
import { reactive } from 'vue';
const izin = reactive({
  reason:"",
  document:""
})
</script>
<template>
    <TopAppBar title="Permintaan Izin" />
    <div class=" pt-12 ">
        <div class="flex flex-col mt-6 p-6 gap-4">
            <BaseInpuField  v-model="izin.reason" label="Alasan" type="text" placeholder="apa alasan anda tidak masuk?" />
            <DocumentInputField label="Bukti"/>
            <PrimaryButton text="Simpan" :is-disable="false" @clickable="" width="w-full" text-color="text-white" color="bg-main-blue"/>
        </div>
    </div>
</template>