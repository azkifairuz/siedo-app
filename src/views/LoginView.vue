<script setup lang="ts">
import BaseInputField from '@/components/BaseInpuField.vue'
import { computed, onMounted, reactive, ref } from 'vue';
import PasswordInputField from '@/components/PasswordInputField.vue';
import Btn from '@/components/PrimaryButton.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import { useSignIn } from '@/stores/useSignIn';
import { useRouter } from 'vue-router';

const login = reactive({
  nidn: "",
  password: ""
})
const show = ref(false);
const alertMessage = ref("");
const authStore = useSignIn();
const router = useRouter()
async function handleLogin() {
  try {
    await authStore.signIn(login.nidn, login.password)
    if (authStore.isAuthenticated) {
      localStorage.setItem('token', authStore.token);
      localStorage.setItem('userid', authStore.user);
      alertMessage.value = `${authStore.message}`;
      router.push({name:'home'})
    }else{
      alertMessage.value = authStore.message || "Login failed!";
    }
  } catch (error: any) {
    if (error) {
      alertMessage.value = `Error: ${error.message}`;
    }
  }finally {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 5000);
  }
}
const isDisable = computed(() => {
  return !login.nidn || !login.password
})


onMounted(()=>{
  if (!authStore.isAuthenticated) {
    alertMessage.value = "Anda belum melakukan login!";
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 5000);
  }

})


</script>

<template>
  <div class="w-full px-6 flex flex-col gap-4 pt-4">
    <h3 class="text-[18px] mb-6 w-full text-center font-semibold text-main-blue">Login</h3>
    <BaseInputField label="Username" placeholder="masukan nidn anda" v-model="login.nidn" type="text" />
    <PasswordInputField label="Kata Sandi" placeholder="masukan katasandi anda" v-model="login.password" />
    <Btn @clickable="handleLogin" text="Masuk" color="bg-main-blue" text-color="text-white" width="w-full"
      :is-disable="isDisable" />
    <h3 class="text-[12px] w-full text-center font-semibold text-main-red">Lupa kata sandi?</h3>
  </div>
  <AlertDialog v-if="show" :message="alertMessage" :duration="5000" />
</template>