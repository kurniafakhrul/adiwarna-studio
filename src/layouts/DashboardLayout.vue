<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
  <div class="flex h-screen bg-brand-background font-sans">
    <Sidebar class="hidden md:flex" />
    <main class="flex-1 p-6 lg:p-10 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
