import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Ini akan menjadi Dashboard kita
import ItemsView from '../views/ItemsView.vue'; // <-- Impor view baru
import LoginView from '../views/LoginView.vue';
import PackagesView from '../views/PackagesView.vue'; // <-- Impor view baru
import UsersView from '../views/UsersView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      meta: { requiresAuth: true, layout: 'DashboardLayout' }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView, // Arahkan path root ke Dashboard
      meta: { 
        requiresAuth: true,
        layout: 'DashboardLayout' // <-- TAMBAHKAN INI
      } 
    },
  
{
  path: '/packages',
  name: 'packages',
  component: PackagesView,
  meta: { requiresAuth: true, layout: 'DashboardLayout' }
},

    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { 
        requiresAuth: true,
        layout: 'DashboardLayout' // Gunakan layout yang sama
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Cek apakah rute yang dituju memerlukan otentikasi
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Cek apakah ada token di localStorage (simulasi pengguna sudah login)
  const isAuthenticated = localStorage.getItem('auth_token');

  if (requiresAuth && !isAuthenticated) {
    // Jika rute butuh otentikasi TAPI pengguna belum login,
    // arahkan ke halaman login.
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    // Jika pengguna sudah login dan mencoba mengakses halaman login,
    // arahkan mereka kembali ke dashboard.
    next({ name: 'home' });
  } else {
    // Jika semua kondisi aman, izinkan navigasi.
    next();
  }});

export default router
