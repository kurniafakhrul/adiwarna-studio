<!-- src/views/ItemsView.vue -->
<script setup>
import ItemFormModal from '@/components/items/ItemFormModal.vue';
import ItemsTable from '@/components/items/ItemsTable.vue';
import { useItemStore } from '@/stores/itemStore';
import { onMounted, ref } from 'vue';

const itemStore = useItemStore();
const isModalOpen = ref(false);
const editingItem = ref(null);

onMounted(() => {
    itemStore.fetchItems();
});

function openAddModal() {
    editingItem.value = null;
    isModalOpen.value = true;
}

function openEditModal(item) {
  editingItem.value = { ...item };
  isModalOpen.value = true;
}

function handleDelete(item) {
    if (confirm(`Apakah Anda yakin ingin menghapus item "${item.name}"?`)) {
        itemStore.deleteItem(item.id);
    }
}

function closeModal() {
  isModalOpen.value = false;
  editingItem.value = null;
}

async function handleFormSubmit(formData) {
  if (editingItem.value) {
    await itemStore.updateItem(editingItem.value.id, formData);
  } else {
    await itemStore.addItem(formData);
  }
  closeModal();
}
</script>
<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-brand-dark">Manajemen Item (Add-ons)</h1>
            <button @click="openAddModal" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">
                + Tambah Item Baru
            </button>
        </div>

        <div v-if="itemStore.isLoading" class="mt-6 text-center text-gray-500">Loading items...</div>
        <div v-else-if="itemStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{{ itemStore.error }}</div>
        <div v-else>
            <ItemsTable :items="itemStore.items" @edit="openEditModal" @delete="handleDelete" />
        </div>

        <ItemFormModal :is-open="isModalOpen" :item-data="editingItem" @close="closeModal" @submit="handleFormSubmit" />
    </div>
</template>