<!-- src/views/AttributeDetailView.vue -->
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useItemStore } from '@/stores/itemStore';
import ItemsTable from '@/components/items/ItemsTable.vue';
import ItemFormModal from '@/components/items/ItemFormModal.vue';

const route = useRoute();
const router = useRouter();
const itemStore = useItemStore();

const isModalOpen = ref(false);
const editingItem = ref(null);
const attributeId = route.params.id;

const currentAttribute = computed(() => {
    return itemStore.attributes.find(attr => attr.id === attributeId) || { name: 'Loading...' };
});

const filteredItems = computed(() => {
    return itemStore.items.filter(item => item.attributeId === attributeId);
});

onMounted(() => {
    if (itemStore.attributes.length === 0 || itemStore.items.length === 0) {
        itemStore.fetchAll();
    }
});

function openAddItemModal() {
    editingItem.value = null;
    isModalOpen.value = true;
}

function openEditItemModal(item) {
    editingItem.value = { ...item };
    isModalOpen.value = true;
}

function handleDeleteItem(item) {
    if (confirm(`Apakah Anda yakin ingin menghapus item "${item.name}"?`)) {
        itemStore.deleteItem(item.id);
    }
}

function closeModal() {
    isModalOpen.value = false;
    editingItem.value = null;
}

async function handleFormSubmit(formData) {
    formData.attributeId = attributeId; // Otomatis set attributeId
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
        <div v-if="itemStore.isLoading" class="text-center p-10">Loading...</div>
        <div v-else-if="currentAttribute">
            <div class="flex items-center mb-6">
                <button @click="router.push('/attributes')" class="mr-4 p-2 hover:bg-gray-200 rounded-full">&larr;</button>
                <div>
                    <h1 class="text-3xl font-bold text-brand-dark">{{ currentAttribute.name }}</h1>
                    <p class="text-sm text-gray-500">Website / Atribut / {{ currentAttribute.name }}</p>
                </div>
            </div>
            <div class="flex justify-end mb-6">
                <button @click="openAddItemModal" class="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90 shadow-sm transition">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
    </svg>
    Tambah Item
</button>
            </div>
            
            <ItemsTable :items="filteredItems" @edit="openEditItemModal" @delete="handleDeleteItem" />

            <ItemFormModal 
                :is-open="isModalOpen" 
                :item-data="editingItem"
                @close="closeModal" 
                @submit="handleFormSubmit" 
            />
        </div>
    </div>
</template>
