<script setup lang="ts">
import BaseInputField from '@/components/BaseInpuField.vue'
import { computed, reactive, ref } from 'vue';
import PasswordInputField from '@/components/PasswordInputField.vue';
import Btn from '@/components/PrimaryButton.vue';
import AlertDialog from '@/components/AlertDialog.vue';

const login = reactive({
    nidn:"",
    password:""
})
const show = ref(false);

function handleLogin() {
  console.log(login);
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 5000);
}
const isDisable = computed(() => {
    return !login.nidn || !login.password
})




</script>

<template>
    <div class="w-full flex flex-col gap-4 pt-4">
        <h3 class="text-[18px] mb-6 w-full text-center font-semibold text-main-blue">Login</h3>
        <BaseInputField label="Username" placeholder="masukan nidn anda" v-model="login.nidn" type="text" />
        <PasswordInputField label="Kata Sandi" placeholder="masukan katasandi anda" v-model="login.password" />
        <Btn 
            @clickable="handleLogin"
            text="Masuk"
            color="bg-main-blue"
            text-color="text-white"
            width="w-full"
            :is-disable="isDisable"
        />
        <h3 class="text-[12px] w-full text-center font-semibold text-main-red">Lupa kata sandi?</h3>
    </div>
    <AlertDialog v-if="show" message="This is an alert message!" :duration="5000" />

</template>