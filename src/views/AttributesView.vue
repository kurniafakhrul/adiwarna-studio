<script setup>
import { onMounted, ref } from 'vue';
import { useItemStore } from '@/stores/itemStore';
import { useRouter } from 'vue-router';
import AttributeFormModal from '@/components/attributes/AttributeFormModal.vue';

const itemStore = useItemStore();
const router = useRouter();

const isModalOpen = ref(false);
const editingAttribute = ref(null);

onMounted(() => {
    itemStore.fetchAll();
});

const countItemsInAttribute = (attributeId) => {
    return itemStore.items.filter(i => i.attributeId === attributeId).length;
};

function viewAttributeDetails(attributeId) {
    router.push(`/attributes/${attributeId}`);
}

function openAddModal() {
    editingAttribute.value = null;
    isModalOpen.value = true;
}

function openEditModal(attr) {
    editingAttribute.value = { ...attr };
    isModalOpen.value = true;
}

function handleDelete(attr) {
    if (confirm(`Menghapus atribut "${attr.name}" juga akan menghapus SEMUA item di dalamnya. Apakah Anda yakin?`)) {
        itemStore.deleteAttribute(attr.id);
    }
}

function closeModal() {
    isModalOpen.value = false;
    editingAttribute.value = null;
}

async function handleFormSubmit(formData) {
    if (editingAttribute.value) {
        await itemStore.updateAttribute(editingAttribute.value.id, formData);
    } else {
        await itemStore.addAttribute(formData);
    }
    closeModal();
}
</script>
<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-brand-dark">Atribut</h1>
            <button @click="openAddModal" class="px-4 py-2 text-sm font-bold text-white bg-brand-dark rounded-md hover:opacity-90">
                + Tambah Atribut
            </button>
        </div>
        
        <div v-if="itemStore.isLoading" class="mt-6 text-center text-gray-500">Loading...</div>
        <div v-else-if="itemStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{{ itemStore.error }}</div>
        
        <div v-else class="bg-white p-6 rounded-lg shadow-md">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Atribut</th>
                        <th scope="col" class="px-6 py-3">Jumlah Item</th>
                        <th scope="col" class="px-6 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="attr in itemStore.attributes" :key="attr.id" class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                            <img :src="attr.imageUrl" :alt="attr.name" class="w-10 h-10 object-cover rounded-md mr-4" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/FFFFFF?text=Img';">
                            {{ attr.name }}
                        </th>
                        <td class="px-6 py-4">{{ countItemsInAttribute(attr.id) }} Item</td>
                        <td class="px-6 py-4 text-right">
                            <button @click="viewAttributeDetails(attr.id)" class="font-medium text-blue-600 hover:underline mr-4">Lihat Item</button>
                            <button @click="openEditModal(attr)" class="font-medium text-brand-gold hover:underline mr-4">Edit</button>
                            <button @click="handleDelete(attr)" class="font-medium text-red-600 hover:underline">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <AttributeFormModal 
            :is-open="isModalOpen" 
            :attribute-data="editingAttribute"
            @close="closeModal" 
            @submit="handleFormSubmit" 
        />
    </div>
</template>