<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseInputField from '@/components/BaseInpuField.vue'
import { reactive } from 'vue';

const tes = reactive({
  name:"a",
  password:""
})

function btnTes() {
  console.log(tes);
}

</script>

<template>
  <div class="font-quicksand mx-10">
    <RouterView />
    <h1>{{ tes.name }}</h1>

    <BaseInputField
     label="Username"
     placeholder="masukan nidn anda"
     v-model="tes.name"
     type="text"
    />
    <BaseInputField
     label="Password"
     placeholder="masukan password anda"
     v-model="tes.password"
     type="text"
    />
  </div>
  <button @click="btnTes" class="bg-secondary p-8 m-5">tes</button>
</template>

<style scoped></style>
