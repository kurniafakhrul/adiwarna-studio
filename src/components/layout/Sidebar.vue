<!-- src/components/layout/Sidebar.vue -->
<template>
  <div class="flex flex-col w-64 bg-brand-dark">
    <div class="flex items-center justify-center h-16 border-b border-gray-700">
      <span class="text-white font-bold uppercase tracking-wider">Studio Admin</span>
    </div>
    <div class="flex flex-col flex-1 overflow-y-auto">
      <nav class="flex-1 px-2 py-4">
        <router-link to="/" class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          Dashboard
        </router-link>
        <router-link to="/packages" class="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          Manajemen Layanan
        </router-link>
        <router-link to="/attributes" class="flex items-center px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700 rounded-md">
          <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
          Atribut
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #cfaa3b; /* brand-gold */
  color: #1a1a1a; /* brand-dark */
  font-weight: 600;
}
</style>