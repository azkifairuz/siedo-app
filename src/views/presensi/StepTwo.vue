<script setup lang="ts">
import { usePresensi } from '@/stores/usePresensi';

const presensiStore = usePresensi();


</script>
<template>
    <h1>{{ presensiStore.message }} {{ presensiStore.time }}</h1>
</template>