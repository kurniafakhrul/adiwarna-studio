// src/stores/itemStore.js
import itemService from '@/services/itemService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useItemStore = defineStore('item', () => {
    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchItems() {
        isLoading.value = true;
        error.value = null;
        try {
            items.value = await itemService.getItems();
        } catch (e) {
            error.value = 'Gagal mengambil data item.';
        } finally {
            isLoading.value = false;
        }
    }

    async function addItem(newItemData) {
        try {
            const newItem = await itemService.createItem(newItemData);
            items.value.push(newItem);
        } catch (e) { console.error(e); }
    }

    async function updateItem(itemId, updatedData) {
        try {
            const updatedItem = await itemService.updateItem(itemId, updatedData);
            const index = items.value.findIndex(p => p.id === itemId);
            if (index !== -1) items.value[index] = updatedItem;
        } catch (e) { console.error(e); }
    }

    async function deleteItem(itemId) {
        try {
            await itemService.deleteItem(itemId);
            items.value = items.value.filter(p => p.id !== itemId);
        } catch (e) { console.error(e); }
    }

    return { items, isLoading, error, fetchItems, addItem, updateItem, deleteItem };
});