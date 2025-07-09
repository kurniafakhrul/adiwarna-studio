<!-- src/components/layout/Sidebar.vue -->
<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

// Computed property untuk membuat inisial dari nama pengguna
const userInitials = computed(() => {
  if (authStore.user && authStore.user.name) {
    const nameParts = authStore.user.name.split(' ')
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return authStore.user.name.substring(0, 2).toUpperCase()
  }
  return '??'
})

// Fungsi untuk memanggil action logout dari store
function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <div class="flex flex-col w-64 bg-white border-r border-gray-200">
    <div class="flex items-center justify-center h-20 border-b border-gray-200">
      <h1 class="text-xl font-bold text-brand-dark-blue">Adiwarna Studio.</h1>
    </div>
    <div class="flex flex-col flex-1 p-4">
      <nav class="flex-1 space-y-1">
        <p class="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">Menu</p>
        <router-link
          to="/"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Dashboard
        </router-link>

        <p class="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">Order</p>
        <router-link
          to="/bookings"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Pesanan
        </router-link>
        <router-link
          to="/calendar"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Kalender
        </router-link>

        <p class="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">Website</p>
        <router-link
          to="/hero"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Hero
        </router-link>
        <router-link
          to="/projects"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Our Projects
        </router-link>
        <router-link
          to="/packages"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Our Services
        </router-link>
        <router-link
          to="/attributes"
          class="flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Atribut
        </router-link>
      </nav>
      <!-- User Profile Section -->
      <div class="mt-auto">
        <div v-if="authStore.user" class="p-4 bg-brand-light-blue rounded-lg flex items-center">
          <div
            class="w-10 h-10 bg-brand-dark-blue text-white flex items-center justify-center rounded-full font-bold"
          >
            {{ userInitials }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-semibold text-brand-dark-blue">{{ authStore.user.name }}</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
        <button
          v-if="authStore.isAuthenticated"
          @click="handleLogout"
          class="w-full mt-4 flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #eceffd; /* brand-light-blue */
  color: #1c274c; /* brand-dark-blue */
  font-weight: 600;
}
</style>
