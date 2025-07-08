// src/stores/selfFotoStore.js
import selfFotoService from '@/services/selfFotoService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSelfFotoStore = defineStore('selfFoto', () => {
    const packages = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchPackages() {
        isLoading.value = true;
        error.value = null;
        try {
            packages.value = await selfFotoService.getPackages();
        } catch (e) {
            error.value = 'Gagal mengambil data paket Self Foto.';
        } finally {
            isLoading.value = false;
        }
    }

    async function addPackage(newPackageData) {
        try {
            const newPackage = await selfFotoService.createPackage(newPackageData);
            packages.value.push(newPackage);
        } catch (e) { console.error(e); }
    }

    async function updatePackage(packageId, updatedData) {
        try {
            const updatedPackage = await selfFotoService.updatePackage(packageId, updatedData);
            const index = packages.value.findIndex(p => p.id === packageId);
            if (index !== -1) packages.value[index] = updatedPackage;
        } catch (e) { console.error(e); }
    }

    async function deletePackage(packageId) {
        try {
            await selfFotoService.deletePackage(packageId);
            packages.value = packages.value.filter(p => p.id !== packageId);
        } catch (e) { console.error(e); }
    }

    return { packages, isLoading, error, fetchPackages, addPackage, updatePackage, deletePackage };
});