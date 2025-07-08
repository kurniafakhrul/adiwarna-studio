<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Daftar semua layout yang ada
const layouts = {
  DashboardLayout,
};

// Computed property untuk menentukan layout mana yang aktif
const activeLayout = computed(() => {
  // Ambil nama layout dari meta rute, atau null jika tidak ada
  const layoutName = route.meta.layout;
  return layouts[layoutName] || null;
});
</script>

<template>
  <!-- Jika ada layout yang aktif, gunakan itu -->
  <component :is="activeLayout" v-if="activeLayout">
    <RouterView />
  </component>
  <!-- Jika tidak ada layout (seperti halaman login), tampilkan langsung -->
  <RouterView v-else />
</template>