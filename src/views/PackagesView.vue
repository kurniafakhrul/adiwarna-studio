<!-- src/views/PackagesView.vue -->
<script setup>
import { onMounted, ref } from 'vue';
import { usePackageStore } from '@/stores/packageStore';
import { useItemStore } from '@/stores/itemStore';
import PackagesTable from '@/components/packages/PackagesTable.vue';
import PackageFormModal from '@/components/packages/PackageFormModal.vue';

const packageStore = usePackageStore();
const itemStore = useItemStore();

const isModalOpen = ref(false);
const editingPackage = ref(null);

onMounted(() => {
    packageStore.fetchPackages();
    itemStore.fetchItems();
});

function openAddModal() {
    editingPackage.value = null;
    isModalOpen.value = true;
}

function openEditModal(pkg) {
    editingPackage.value = { ...pkg };
    isModalOpen.value = true;
}

function handleDelete(pkg) {
    if (confirm(`Apakah Anda yakin ingin menghapus layanan "${pkg.name}"?`)) {
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
            <h1 class="text-3xl font-bold text-brand-dark">Manajemen Layanan</h1>
            <button @click="openAddModal" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90 transition-opacity">
                + Tambah Layanan Baru
            </button>
        </div>

        <div v-if="packageStore.isLoading" class="mt-6 text-center text-gray-500">
            Loading services...
        </div>
        <div v-else-if="packageStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ packageStore.error }}
        </div>
        <div v-else>
            <PackagesTable 
                :packages="packageStore.packages"
                @edit="openEditModal"
                @delete="handleDelete"
            />
        </div>

        <PackageFormModal 
            :is-open="isModalOpen"
            :package-data="editingPackage"
            :all-items="itemStore.items"
            @close="closeModal"
            @submit="handleFormSubmit"
        />
    </div>
</template>