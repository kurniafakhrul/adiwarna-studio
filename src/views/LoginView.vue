<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Gunakan auth store dan router
const authStore = useAuthStore();
const router = useRouter();

// State untuk menampung input dari form, dimulai dengan string kosong
const username = ref('');
const password = ref('');
const isLoading = ref(false);

// Fungsi yang akan dipanggil saat form di-submit
async function handleLogin() {
  if (!username.value || !password.value) {
    alert('Username dan password harus diisi!');
    return;
  }
  
  isLoading.value = true;
  
  // Panggil action login dari store
  const loginSuccess = await authStore.login({ 
    username: username.value, 
    password: password.value 
  });
  
  isLoading.value = false;

  // Jika login berhasil (berdasarkan return value dari action), arahkan ke dashboard
  if (loginSuccess) {
    router.push('/');
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">
        Backoffice Login
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <div class="mt-1">
            <input v-model="username" id="username" name="username" type="text" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your username"
            />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1">
            <input v-model="password" id="password" name="password" type="password" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div>
          <button type="submit" :disabled="isLoading"
            class="w-full flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
            <span v-if="isLoading">Loading...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>