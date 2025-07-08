// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    // --- STATE ---
    // Baca data dari localStorage saat store pertama kali dibuat.
    const token = ref(localStorage.getItem('auth_token'));
    const user = ref(JSON.parse(localStorage.getItem('auth_user'))); // JSON.parse akan mengubah string kembali menjadi objek
    const router = useRouter();

    // --- GETTERS ---
    const isAuthenticated = computed(() => !!token.value);

    // --- ACTIONS ---
    async function login(credentials) {
        // --- MULAI BLOK SIMULASI ---
        console.log("Menjalankan login dalam mode simulasi...");

        const fakeToken = 'ini-adalah-token-palsu-untuk-testing-12345';
        const fakeUser = {
            name: credentials.username,
            email: credentials.username,
        };

        token.value = fakeToken;
        user.value = fakeUser;

        localStorage.setItem('auth_token', token.value);
        localStorage.setItem('auth_user', JSON.stringify(user.value));
        
        // Arahkan ke dashboard setelah login
        router.push('/');
        return true;
    }

    function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        router.push('/login');
    }

    return { token, user, isAuthenticated, login, logout };
});