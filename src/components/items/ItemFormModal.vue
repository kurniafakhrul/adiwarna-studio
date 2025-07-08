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
    // Reset form dengan field stok baru
    form.value = { name: '', isFree: true, price: 0, imageUrl: null, trackQuantity: false, quantity: 0 };
    imagePreview.value = null;
  }
}, { immediate: true, deep: true });

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            form.value.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function handleSubmit() {
  // Jika pelacakan stok tidak aktif, pastikan jumlahnya 0
  if (!form.value.trackQuantity) {
    form.value.quantity = 0;
  }
  emit('submit', form.value);
}
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-brand-dark mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- ... (Input gambar dan nama item tetap sama) ... -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nama Item</label>
          <input v-model="form.name" id="name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <!-- Opsi Pelacakan Stok -->
        <fieldset class="border p-4 rounded-md">
            <legend class="text-sm font-medium text-gray-900 px-1">Manajemen Stok</legend>
            <div class="flex items-center mt-2">
                <input v-model="form.trackQuantity" id="trackQuantity" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
                <label for="trackQuantity" class="ml-2 block text-sm text-gray-900">Lacak jumlah stok item ini</label>
            </div>
            <div v-if="form.trackQuantity" class="mt-4">
                <label for="quantity" class="block text-sm font-medium text-gray-700">Jumlah Stok Tersedia</label>
                <input v-model.number="form.quantity" id="quantity" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
        </fieldset>

        <!-- Opsi Harga -->
        <fieldset class="border p-4 rounded-md">
            <legend class="text-sm font-medium text-gray-900 px-1">Pengaturan Harga</legend>
            <div class="flex items-center mt-2">
                <input v-model="form.isFree" id="isFree" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold" />
                <label for="isFree" class="ml-2 block text-sm text-gray-900">Item ini gratis</label>
            </div>
            <div v-if="!form.isFree" class="mt-4">
                <label for="price" class="block text-sm font-medium text-gray-700">Harga</label>
                <input v-model.number="form.price" id="price" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
        </fieldset>

        <div class="mt-8 flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Batal</button>
          <button type="submit" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">Simpan Item</button>
        </div>
      </form>
    </div>
  </div>
</template>