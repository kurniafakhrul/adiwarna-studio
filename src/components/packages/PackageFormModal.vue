<!-- src/components/packages/PackageFormModal.vue -->
<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  packageData: Object,
  studios: Array, // Terima daftar studio sebagai prop
});

const emit = defineEmits(['close', 'submit']);

const form = ref({
    name: '',
    category: '',
    price: 0,
    duration: 0,
    studio: null,
    includedAddons: '',
    optionalAddons: [],
    description: ''
});

const modalTitle = computed(() => props.packageData ? 'Edit Paket' : 'Tambah Paket Baru');

watch(() => props.packageData, (newData) => {
  if (newData) {
    form.value = { ...newData, optionalAddons: [...(newData.optionalAddons || [])] };
  } else {
    // Reset form untuk mode tambah
    form.value = { name: '', category: '', price: 0, duration: 0, studio: null, includedAddons: '', optionalAddons: [], description: '' };
  }
}, { immediate: true, deep: true });

function addOptionalAddon() {
  form.value.optionalAddons.push({ name: '', price: 0 });
}

function removeOptionalAddon(index) {
  form.value.optionalAddons.splice(index, 1);
}

function handleSubmit() {
  emit('submit', form.value);
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="$emit('close')"></div>

  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-brand-dark mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <!-- Form fields -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama Paket</label>
            <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm" />
          </div>

          <!-- Pilihan Studio -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Studio (Opsional)</label>
            <select v-model="form.studio" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm">
                <option :value="null">Outdoor / Tidak Spesifik</option>
                <option v-for="studio in studios" :key="studio.id" :value="studio.id">{{ studio.name }}</option>
            </select>
          </div>

          <!-- Add-ons Gratis -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Item Gratis Termasuk</label>
            <input v-model="form.includedAddons" type="text" placeholder="Contoh: Kacamata, Topi, Bando" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-gold focus:ring-brand-gold sm:text-sm" />
          </div>

          <!-- Add-ons Berbayar (Dinamis) -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Item Tambahan Berbayar</label>
            <div v-for="(addon, index) in form.optionalAddons" :key="index" class="flex items-center space-x-2 mt-2">
                <input v-model="addon.name" type="text" placeholder="Nama Item" class="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                <input v-model.number="addon.price" type="number" placeholder="Harga" class="block w-1/3 rounded-md border-gray-300 shadow-sm sm:text-sm" />
                <button type="button" @click="removeOptionalAddon(index)" class="text-red-500 hover:text-red-700">&times;</button>
            </div>
            <button type="button" @click="addOptionalAddon" class="mt-2 text-sm text-brand-gold font-semibold hover:underline">+ Tambah Item</button>
          </div>

          <!-- Fields lainnya -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Harga</label>
              <input v-model.number="form.price" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Durasi (Menit)</label>
              <input v-model.number="form.duration" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea v-model="form.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"></textarea>
          </div>
        </div>
        <div class="mt-8 flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Batal</button>
          <button type="submit" class="px-4 py-2 text-sm font-bold text-brand-dark bg-brand-gold rounded-md hover:opacity-90">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>
