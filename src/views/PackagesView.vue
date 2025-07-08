<!-- src/views/PackagesView.vue -->
<script setup>
import PackageFormModal from '@/components/packages/PackageFormModal.vue';
import PackagesTable from '@/components/packages/PackagesTable.vue';
import { usePackageStore } from '@/stores/packageStore';
import { onMounted, ref } from 'vue';

const packageStore = usePackageStore();

const isModalOpen = ref(false);
const editingPackage = ref(null);

onMounted(() => {
  // Ambil data paket dan studio saat halaman dimuat
  packageStore.fetchPackages();
  packageStore.fetchStudios();
});

function openAddModal() {
  editingPackage.value = null;
  isModalOpen.value = true;
}

function openEditModal(pkg) {
  editingPackage.value = pkg;
  isModalOpen.value = true;
}

function handleDelete(pkg) {
    if (confirm(`Apakah Anda yakin ingin menghapus paket "${pkg.name}"?`)) {
        packageStore.deletePackage(pkg.id);
    }
}

function closeModal() {
  isModalOpen.value = false;
  editingPackage.value = null;
}

async function handleFormSubmit(formData) {
  if (editingPackage.value) {
    await packageStore.updatePackage(editingPackage.value.id, formData);
  } else {
    await packageStore.addPackage(formData);
  }
  closeModal();
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark">Manajemen Paket & Layanan</h1>
      <button @click="openAddModal" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90 transition-opacity">
        + Tambah Paket Baru
      </button>
    </div>
    
    <div v-if="packageStore.isLoading" class="mt-6 text-center text-gray-500">Loading packages...</div>
    <div v-else-if="packageStore.error">{{ packageStore.error }}</div>
    <div v-else>
      <PackagesTable 
        :packages="packageStore.packages" 
        :studios="packageStore.studios"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>

    <PackageFormModal 
      :is-open="isModalOpen" 
      :package-data="editingPackage"
      :studios="packageStore.studios"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
  </div>
</template>
