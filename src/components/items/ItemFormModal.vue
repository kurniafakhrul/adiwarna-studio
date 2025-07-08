<!-- src/components/items/ItemFormModal.vue -->
<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  itemData: Object,
});
const emit = defineEmits(['close', 'submit']);
const form = ref({});
const imagePreview = ref(null);
const modalTitle = computed(() => props.itemData ? 'Edit Item' : 'Tambah Item Baru');

watch(() => props.itemData, (newData) => {
  if (newData) {
    form.value = { ...newData };
    imagePreview.value = newData.imageUrl;
  } else {
    form.value = { name: '', isFree: true, price: 0, imageUrl: null };
    imagePreview.value = null;
  }
}, { immediate: true, deep: true });

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            form.value.imageUrl = e.target.result; // Simulasikan menyimpan URL gambar (base64)
        };
        reader.readAsDataURL(file);
    }
}

function handleSubmit() {
  emit('submit', form.value);
}
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-brand-dark mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Gambar Item</label>
          <div class="mt-1 flex items-center space-x-4">
            <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="w-20 h-20 object-cover rounded-md bg-gray-100">
            <div v-else class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md text-gray-400">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <input type="file" @change="handleFileChange" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90"/>
          </div>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nama Item</label>
          <input v-model="form.name" id="name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div class="flex items-center">
          <input v-model="form.isFree" id="isFree" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
          <label for="isFree" class="ml-2 block text-sm text-gray-900">Item ini gratis</label>
        </div>
        <div v-if="!form.isFree">
          <label for="price" class="block text-sm font-medium text-gray-700">Harga</label>
          <input v-model.number="form.price" id="price" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div class="mt-8 flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Batal</button>
          <button type="submit" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">Simpan Item</button>
        </div>
      </form>
    </div>
  </div>
</template>
