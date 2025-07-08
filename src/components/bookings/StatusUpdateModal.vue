<!-- src/components/bookings/StatusUpdateModal.vue -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  currentStatus: String,
})
const emit = defineEmits(['close', 'submit'])

const selectedStatus = ref('')

watch(
  () => props.isOpen,
  (isNowOpen) => {
    if (isNowOpen) {
      selectedStatus.value = props.currentStatus
    }
  },
)

function handleSubmit() {
  emit('submit', selectedStatus.value)
}
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50"
    @click="$emit('close')"
  ></div>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-xl font-bold text-brand-dark-blue mb-6">Ubah Status Pesanan</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <p class="text-sm text-gray-600">Pilih status baru untuk pesanan ini.</p>
        <div class="space-y-2">
          <label class="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="DIPROSES"
              class="text-brand-dark-blue focus:ring-brand-dark-blue"
            />
            <span class="ml-3 font-medium">Diproses</span>
          </label>
          <label class="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="SELESAI"
              class="text-brand-dark-blue focus:ring-brand-dark-blue"
            />
            <span class="ml-3 font-medium">Selesai</span>
          </label>
          <label class="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              v-model="selectedStatus"
              value="DIBATALKAN"
              class="text-brand-dark-blue focus:ring-brand-dark-blue"
            />
            <span class="ml-3 font-medium">Dibatalkan</span>
          </label>
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
            Simpan Status
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
