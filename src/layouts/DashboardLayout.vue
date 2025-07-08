<script setup>
import Sidebar from '@/components/layout/Sidebar.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
}
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <Sidebar class="hidden md:flex" />

    <div class="flex flex-col flex-1 overflow-y-auto">
      <!-- Navbar Atas -->
      <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div class="flex items-center px-4">
          <span v-if="authStore.user" class="text-gray-700 font-semibold">
            Welcome, {{ authStore.user.username }}!
          </span>
        </div>
        <div class="flex items-center pr-4">
          <!-- Tombol Logout dengan tema emas -->
          <button @click="handleLogout" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90 transition-opacity">
            Logout
          </button>
        </div>
      </div>

      <!-- Konten Halaman Utama -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
