// src/stores/packageStore.js
import packageService from '@/services/packageService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePackageStore = defineStore('package', () => {
  const packages = ref([]);
  const studios = ref([]); // <-- State baru untuk studio
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchPackages() { /* ... (tetap sama) ... */ }

  // Action baru untuk mengambil data studio
  async function fetchStudios() {
    try {
        const data = await packageService.getStudios();
        studios.value = data;
    } catch(e) {
        console.error("Gagal mengambil data studio:", e);
    }
  }

  async function addPackage(newPackageData) { /* ... (tetap sama) ... */ }
  async function updatePackage(packageId, updatedData) { /* ... (tetap sama) ... */ }
  async function deletePackage(packageId) { /* ... (tetap sama) ... */ }

  return { packages, studios, isLoading, error, fetchPackages, fetchStudios, addPackage, updatePackage, deletePackage };
});
