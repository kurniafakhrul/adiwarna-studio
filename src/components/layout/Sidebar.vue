<!-- src/components/layout/Sidebar.vue -->
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
      <!-- User Profile Section -->
      <div class="mt-auto">
        <div class="p-4 bg-brand-light-blue rounded-lg flex items-center">
            <div class="w-10 h-10 bg-brand-dark-blue text-white flex items-center justify-center rounded-full font-bold">
                JD
            </div>
            <div class="ml-3">
                <p class="text-sm font-semibold text-brand-dark-blue">Jackson Dunn</p>
                <p class="text-xs text-gray-500">Administrator</p>
            </div>
        </div>
        <button class="w-full mt-4 flex items-center px-4 py-2 text-gray-600 hover:bg-brand-light-blue rounded-md">
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