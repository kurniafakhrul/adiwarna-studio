<!-- src/components/packages/PackageFormModal.vue -->
<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  packageData: Object,
  allAttributes: { type: Array, required: true },
})

const emit = defineEmits(['close', 'submit'])
const form = ref({})
const modalTitle = computed(() => (props.packageData ? 'Edit Layanan' : 'Tambah Layanan Baru'))

watch(
  () => props.packageData,
  (newData) => {
    if (newData) {
      form.value = {
        ...newData,
        attributeIds: [...(newData.attributeIds || [])],
        imageUrls: [...(newData.imageUrls || [])],
      }
    } else {
      form.value = {
        category: 'Self Foto',
        name: '',
        locationType: 'Studio 1',
        basePrice: 0,
        duration: 15,
        notes: '',
        imageUrls: [],
        attributeIds: [],
      }
    }
  },
  { immediate: true, deep: true },
)

// ... (fungsi handleFileChange, removeImage, handleSubmit tetap sama)
function handleSubmit() {
  emit('submit', form.value)
}
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="$emit('close')"
  ></div>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-brand-dark-blue mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          <!-- Input Gambar -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Galeri Gambar (Maks. 4)</label>
            <div class="mt-2 p-4 border-2 border-dashed rounded-md">
              <div class="grid grid-cols-4 gap-4 mb-4">
                <div v-for="(url, index) in form.imageUrls" :key="index" class="relative">
                  <img :src="url" class="w-full h-24 object-cover rounded-md" />
                  <button
                    @click="removeImage(index)"
                    type="button"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <input
                type="file"
                multiple
                @change="handleFileChange"
                accept="image/*"
                :disabled="(form.imageUrls?.length || 0) >= 4"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90 disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Input Kategori -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Kategori Layanan</label>
            <select
              v-model="form.category"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>Self Foto</option>
              <option>Pas Foto</option>
              <option>Pre-wedding</option>
              <option>Maternity</option>
              <option>Graduation</option>
              <option>Family</option>
            </select>
          </div>

          <!-- Input Nama -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nama Layanan</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <!-- Input Harga & Durasi -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Harga Dasar</label>
              <input
                v-model.number="form.basePrice"
                type="number"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Durasi (Menit)</label>
              <input
                v-model.number="form.duration"
                type="number"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Lokasi Pelaksanaan</label>
            <div class="mt-2 flex space-x-4 border p-4 rounded-md">
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="form.locationType"
                  value="Studio 1"
                  class="text-brand-dark-blue focus:ring-brand-dark-blue"
                />
                <span class="ml-2 text-sm">Studio 1</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="form.locationType"
                  value="Studio 2"
                  class="text-brand-dark-blue focus:ring-brand-dark-blue"
                />
                <span class="ml-2 text-sm">Studio 2</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="form.locationType"
                  value="Outdoor"
                  class="text-brand-dark-blue focus:ring-brand-dark-blue"
                />
                <span class="ml-2 text-sm">Outdoor</span>
              </label>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Nomor WhatsApp Layanan</label>
            <input
              v-model="form.contactWhatsapp"
              type="text"
              placeholder="Contoh: 081234567890"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <!-- Bagian Memilih Atribut -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Atribut yang Termasuk</label>
            <p class="text-xs text-gray-500 mb-2">
              Pilih atribut mana saja yang akan menjadi bagian dari layanan ini.
            </p>
            <div class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 border p-4 rounded-md">
              <div v-for="attr in allAttributes" :key="attr.id" class="flex items-center">
                <input
                  :id="`attr-${attr.id}`"
                  :value="attr.id"
                  v-model="form.attributeIds"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                />
                <label :for="`attr-${attr.id}`" class="ml-2 text-sm text-gray-600">{{
                  attr.name
                }}</label>
              </div>
            </div>
          </div>

          <!-- Input Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Catatan</label>
            <textarea
              v-model="form.notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>
        </div>
        <div class="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
          >
            Simpan Layanan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
