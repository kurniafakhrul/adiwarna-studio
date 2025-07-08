<!-- src/components/self-foto/SelfFotoFormModal.vue -->
<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  packageData: Object,
  allItems: { type: Array, required: true }, // Menerima daftar semua item
});

const emit = defineEmits(['close', 'submit']);

const form = ref({});
const modalTitle = computed(() => props.packageData ? 'Edit Paket Self Foto' : 'Tambah Paket Self Foto');

// Pisahkan item gratis dan berbayar untuk ditampilkan di form
const freeItems = computed(() => props.allItems.filter(item => item.isFree));
const paidItems = computed(() => props.allItems.filter(item => !item.isFree));

watch(() => props.packageData, (newData) => {
  if (newData) {
    // Saat mode edit, isi form dengan data yang ada
    form.value = { 
      ...newData,
      includedAddonIds: [...(newData.includedAddonIds || [])],
      optionalAddonIds: [...(newData.optionalAddonIds || [])],
    };
  } else {
    // Reset form untuk mode tambah
    form.value = {
      name: '', basePrice: 0, baseCapacity: 2, pricePerExtraPerson: 10000,
      pricePerExtraMinute: 5000, // Nilai default untuk field baru
      duration: 15, notes: 'Soft file via Google Drive (Max 1 Bulan).',
      includedAddonIds: [], // Dimulai dengan array kosong
      optionalAddonIds: [], // Dimulai dengan array kosong
    };
  }
}, { immediate: true, deep: true });

function handleSubmit() {
  emit('submit', form.value);
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>

  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-brand-dark mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          <!-- Field Nama, Harga, Durasi, dll -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama Paket</label>
            <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Harga Dasar</label>
              <input v-model.number="form.basePrice" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Durasi (Menit)</label>
              <input v-model.number="form.duration" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Kapasitas Dasar</label>
              <input v-model.number="form.baseCapacity" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Harga / Org Tambahan</label>
              <input v-model.number="form.pricePerExtraPerson" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Harga / Menit Tambahan</label>
              <input v-model.number="form.pricePerExtraMinute" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>

          <!-- Bagian Item Gratis -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Pilih Item Gratis Termasuk</label>
            <div class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-md">
              <div v-for="item in freeItems" :key="item.id" class="flex items-center">
                <input :id="`free-${item.id}`" :value="item.id" v-model="form.includedAddonIds" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold">
                <label :for="`free-${item.id}`" class="ml-2 text-sm text-gray-600">{{ item.name }}</label>
              </div>
            </div>
          </div>

          <!-- Bagian Item Berbayar -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Pilih Item Opsional Berbayar</label>
             <div class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-md">
              <div v-for="item in paidItems" :key="item.id" class="flex items-center">
                <input :id="`paid-${item.id}`" :value="item.id" v-model="form.optionalAddonIds" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold">
                <label :for="`paid-${item.id}`" class="ml-2 text-sm text-gray-600">{{ item.name }}</label>
              </div>
            </div>
          </div>

          <!-- Field Catatan -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Catatan</label>
            <textarea v-model="form.notes" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
          </div>

        </div>
        <div class="mt-8 flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Batal</button>
          <button type="submit" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">Simpan Paket</button>
        </div>
      </form>
    </div>
  </div>
</template>
