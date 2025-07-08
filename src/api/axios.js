import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

// Membuat instance Axios baru
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


// Menambahkan "interceptor" pada request
// Interceptor ini akan berjalan SEBELUM setiap request dikirim.
apiClient.interceptors.request.use(
  (config) => {
    // Ambil auth store
    const authStore = useAuthStore();
    const token = authStore.token;

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    // Lakukan sesuatu jika ada error pada request
    return Promise.reject(error);
  }
);

// Ekspor instance yang sudah dikonfigurasi
export default apiClient;