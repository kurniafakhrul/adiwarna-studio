// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PackagesView from '../views/PackagesView.vue'
import AttributesView from '../views/AttributesView.vue'; // <-- Impor baru
import AttributeDetailView from '../views/AttributeDetailView.vue'; // <-- Impor baru

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, layout: 'DashboardLayout' }
    },
    {
      path: '/packages',
      name: 'packages',
      component: PackagesView,
      meta: { requiresAuth: true, layout: 'DashboardLayout' }
    },
    {
      path: '/attributes', // Halaman utama untuk daftar atribut
      name: 'attributes',
      component: AttributesView,
      meta: { requiresAuth: true, layout: 'DashboardLayout' }
    },
    {
      path: '/attributes/:id', // Halaman detail untuk item di dalam atribut
      name: 'attribute-detail',
      component: AttributeDetailView,
      meta: { requiresAuth: true, layout: 'DashboardLayout' }
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
