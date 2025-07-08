<!-- src/components/layout/Sidebar.vue -->
<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Computed property untuk membuat inisial dari nama pengguna
const userInitials = computed(() => {
    if (authStore.user && authStore.user.name) {
        const nameParts = authStore.user.name.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return authStore.user.name.substring(0, 2).toUpperCase();
    }
    return '??';
});

// Fungsi untuk memanggil action logout dari store
function handleLogout() {
    authStore.logout();
}
</script>

<template>
  <div class="flex flex-col w-64 bg-white border-r border-gray-200">
    <div class="flex items-center justify-center h-20 border-b border-gray-200">
      <h1 class="text-xl font-bold text-brand-dark-blue">Adiwarna Studio.</h1>
    </div>
    <div class="flex flex-col flex-1 p-4">
      <nav class="flex-1 space-y-2">
        <p class="px-4 text-xs font-semibold text-gray-400 uppercase">Menu</p>
        <router-link to="/" class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md">
          <span class="mr-3">&#128202;</span> Dashboard
        </router-link>
        <router-link to="/packages" class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md">
          <span class="mr-3">&#128230;</span> Manajemen Layanan
        </router-link>
        <router-link to="/attributes" class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md">
          <span class="mr-3">&#127991;</span> Atribut
        </router-link>
      </nav>

      <!-- User Profile Section - Sekarang Dinamis -->
      <div class="mt-auto">
        <!-- Tampilkan profil HANYA JIKA data user ada -->
        <div v-if="authStore.user" class="p-4 bg-brand-light-blue rounded-lg flex items-center">
            <div class="w-10 h-10 bg-brand-dark-blue text-white flex items-center justify-center rounded-full font-bold">
                {{ userInitials }}
            </div>
            <div class="ml-3">
                <p class="text-sm font-semibold text-brand-dark-blue">{{ authStore.user.name }}</p>
                <p class="text-xs text-gray-500">Administrator</p>
            </div>
        </div>
        <!-- Tampilkan tombol logout JIKA pengguna terotentikasi (punya token) -->
        <button v-if="authStore.isAuthenticated" @click="handleLogout" class="w-full mt-4 flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md">
            <span class="mr-3">&#128682;</span> Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #ECEFFD; /* brand-light-blue */
  color: #1C274C; /* brand-dark-blue */
  font-weight: 600;
}
</style>

Hasil Akhir
Dengan perubahan ini, masalah Anda akan teratasi. Tombol "S