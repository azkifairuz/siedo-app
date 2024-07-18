<script setup lang="ts">
import IconActivityPageInactive from '@/components/icons/IconActivityPageInactive.vue';
import IconHomePageInactive from '@/components/icons/IconHomePageInactive.vue';
import IconProfilePageInactive from '@/components/icons/IconProfilePageInactive.vue';
import IconActivityPageActive from '@/components/icons/IconActivityPageActive.vue';
import IconHomePageActive from '@/components/icons/IconHomePageActive.vue';
import IconProfilePageActive from '@/components/icons/IconProfilePageActive.vue';
import { useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isHomeActive = computed(() => route.name === 'home');
const isActivityActive = computed(() => route.name === 'activity');
const isProfileActive = computed(() => route.name === 'profile');
</script>

<template>
  <div class="font-quicksand mx-6">
    <RouterView />
  </div>
  <nav class="fixed py-[18px] shadow-custom-bottom bg-[#FBFBFB] px-[48px] flex justify-between bottom-0 left-0 right-0">
    <RouterLink to="/home">
      <button>
        <component :is="isHomeActive ? IconHomePageActive : IconHomePageInactive" />
      </button>
    </RouterLink>
    <RouterLink to="/activity">
      <button>
        <component :is="isActivityActive ? IconActivityPageActive : IconActivityPageInactive" />
      </button>
    </RouterLink>
    <RouterLink to="/profile">
      <button>
        <component :is="isProfileActive ? IconProfilePageActive : IconProfilePageInactive" />
      </button>
    </RouterLink>
  </nav>
</template>

<style scoped></style>
