<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Gunakan auth store dan router
const authStore = useAuthStore()
const router = useRouter()

// State untuk menampung input dari form, dimulai dengan string kosong
const username = ref('')
const password = ref('')
const isLoading = ref(false)

// Fungsi yang akan dipanggil saat form di-submit
async function handleLogin() {
  if (!username.value || !password.value) {
    alert('Username dan password harus diisi!')
    return
  }

  isLoading.value = true

  // Panggil action login dari store
  const loginSuccess = await authStore.login({
    username: username.value,
    password: password.value,
  })

  isLoading.value = false

  // Jika login berhasil (berdasarkan return value dari action), arahkan ke dashboard
  if (loginSuccess) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-white">
    <!-- Kolom Kiri: Form Login -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
      <div class="w-full max-w-md">
        <div class="mb-10">
          <!-- Logo Anda -->
          <div class="flex h-20">
            <img src="@/assets/logo.svg" alt="Adiwarna Studio Logo" class="h-10 w-auto" />
          </div>
        </div>
        <h2 class="text-3xl font-bold text-brand-dark-blue mb-2">Selamat Datang</h2>
        <p class="text-gray-500 mb-8">Masukkan email dan kata sandi akun anda</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                v-model="username"
                id="email"
                type="email"
                required
                class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-dark-blue focus:ring-brand-dark-blue"
                placeholder="Masukkan email"
              />
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="password"
                id="password"
                type="password"
                required
                class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-dark-blue focus:ring-brand-dark-blue"
                placeholder="Masukkan kata sandi"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark-blue hover:opacity-90 disabled:opacity-70"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>Masuk</span>
            </button>
          </div>
        </form>
        <div class="mt-12 text-center text-xs text-gray-400">
          <p>Copyright &copy; 2025 BCB Tech. All Rights Reserved</p>
        </div>
      </div>
    </div>
    <!-- Kolom Kanan: Gambar -->
    <div
      class="hidden lg:block lg:w-1/2 bg-cover bg-center"
      style="
        background-image: url('https://images.pexels.com/photos/19038627/pexels-photo-19038627.jpeg');
      "
    ></div>
  </div>
</template>
