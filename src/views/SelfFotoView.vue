<!-- src/views/SelfFotoView.vue -->
<script setup>
import SelfFotoFormModal from '@/components/self-foto/SelfFotoFormModal.vue';
import SelfFotoTable from '@/components/self-foto/SelfFotoTable.vue';
import { useItemStore } from '@/stores/itemStore'; // <-- 1. Impor item store
import { useSelfFotoStore } from '@/stores/selfFotoStore';
import { onMounted, ref } from 'vue';

const selfFotoStore = useSelfFotoStore();
const itemStore = useItemStore(); // <-- 2. Gunakan item store

const isModalOpen = ref(false);
const editingPackage = ref(null);

onMounted(() => {
    // 3. Ambil data dari kedua store saat halaman dimuat
    selfFotoStore.fetchPackages();
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
    if (confirm(`Apakah Anda yakin ingin menghapus paket "${pkg.name}"?`)) {
        selfFotoStore.deletePackage(pkg.id);
    }
}

function closeModal() {
  isModalOpen.value = false;
  editingPackage.value = null;
}

async function handleFormSubmit(formData) {
  if (editingPackage.value) {
    await selfFotoStore.updatePackage(editingPackage.value.id, formData);
  } else {
    await selfFotoStore.addPackage(formData);
  }
  closeModal();
}
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-brand-dark">Manajemen Self Foto</h1>
            <button @click="openAddModal" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">
                + Tambah Paket Self Foto
            </button>
        </div>

        <div v-if="selfFotoStore.isLoading" class="mt-6 text-center text-gray-500">
            Loading packages...
        </div>
        <div v-else-if="selfFotoStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ selfFotoStore.error }}
        </div>
        <div v-else>
            <!-- Tabel ini perlu kita perbarui juga -->
            <SelfFotoTable 
              :packages="selfFotoStore.packages"
              @edit="openEditModal"
              @delete="handleDelete"
            />
        </div>

        <!-- 4. Teruskan daftar semua item ke modal sebagai prop -->
        <SelfFotoFormModal
          :is-open="isModalOpen"
          :package-data="editingPackage"
          :all-items="itemStore.items" 
          @close="closeModal"
          @submit="handleFormSubmit"
        />
    </div>
</template>
