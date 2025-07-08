import { defineStore } from 'pinia'
// import axios from 'axios' // <-- HAPUS BARIS INI
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// Kita definisikan store dengan nama 'auth'
export const useAuthStore = defineStore('auth', () => {
  // ... (state dan getters tetap sama) ...
  const token = ref(localStorage.getItem('auth_token'))
  const user = ref(JSON.parse(localStorage.getItem('auth_user')))
  const router = useRouter()
  const isAuthenticated = computed(() => !!token.value)

  // --- ACTIONS ---
  // Fungsi untuk login
  //    async function login(credentials) {
  //   try {
  //     // Ganti panggilan axios dengan apiClient
  //     // Perhatikan bahwa kita hanya perlu menulis endpoint-nya saja ('/auth/login')
  //     const response = await apiClient.post('/auth/login', {
  //       username: credentials.username,
  //       password: credentials.password,
  //     })

  //     // ... (sisa dari fungsi login tetap sama) ...
  //     const responseData = response.data

  //     token.value = responseData.token
  //     user.value = {
  //       id: responseData.id,
  //       username: responseData.username,
  //       email: responseData.email,
  //       firstName: responseData.firstName,
  //       lastName: responseData.lastName,
  //       image: responseData.image,
  //     }

  //     localStorage.setItem('auth_token', token.value)
  //     localStorage.setItem('auth_user', JSON.stringify(user.value))

  //     router.push('/')

  //   } catch (error) {
  //     console.error('Login failed:', error)
  //     alert('Login Gagal! Periksa kembali username dan password Anda.')
  //   }
  // }

  async function login(credentials) {
  // --- MULAI BLOK SIMULASI ---
  // Kode ini mensimulasikan login yang berhasil tanpa memanggil API.
  console.log("Menjalankan login dalam mode simulasi...");

  // 1. Buat token dan data pengguna palsu
  const fakeToken = 'ini-adalah-token-palsu-untuk-testing-12345';
  const fakeUser = {
    username: credentials.username || 'User-Test', // Ambil username dari form
  };

  // 2. Set state di Pinia (jika kode ini ada di dalam store)
  token.value = fakeToken;
  user.value = fakeUser;

  // 3. Simpan ke localStorage agar tetap login saat refresh
  localStorage.setItem('auth_token', token.value);
  localStorage.setItem('auth_user', JSON.stringify(user.value));

  // 4. Arahkan ke dashboard
  router.push('/');
  
  // Kembalikan true agar komponen tahu login "berhasil"
  return true; 
  // --- AKHIR BLOK SIMULASI ---
}
  // Fungsi untuk logout
  function logout() {
    // Hapus data dari state
    token.value = null
    user.value = null

    // Hapus data dari localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')

    // Arahkan ke halaman login
    router.push('/login')
  }

  // Return semua state, getters, dan actions yang ingin diekspos
  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  }
})
