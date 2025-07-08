<!-- src/components/bookings/BookingFormModal.vue -->
<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  bookingData: Object,
  packages: { type: Array, required: true },
})
const emit = defineEmits(['close', 'submit'])
const form = ref({})
const modalTitle = computed(() => (props.bookingData ? 'Edit Pesanan' : 'Buat Pesanan Manual'))

watch(
  () => props.bookingData,
  (newData) => {
    if (newData) {
      // Deep copy untuk mode edit agar tidak mengubah data asli secara langsung
      form.value = JSON.parse(JSON.stringify(newData))
    } else {
      // Reset form untuk mode tambah dengan semua field yang diperlukan
      form.value = {
        clientName: '',
        clientContact: '',
        clientEmail: '',
        serviceId: null,
        scheduledAt: '',
        duration: 0,
        location: '',
        status: 'DIPROSES',
        notes: '',
        downPaymentAmount: 0,
        totalPrice: 0,
      }
    }
  },
  { immediate: true },
)

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
      <form @submit.prevent="handleSubmit" class="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <fieldset class="border p-4 rounded-md">
          <legend class="text-sm font-medium px-1">Informasi Klien</legend>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label class="block text-xs">Nama Klien</label>
              <input
                v-model="form.clientName"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">Nomor Kontak (WA)</label>
              <input
                v-model="form.clientContact"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">Email (Opsional)</label>
              <input
                v-model="form.clientEmail"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </fieldset>

        <fieldset class="border p-4 rounded-md">
          <legend class="text-sm font-medium px-1">Detail Sesi</legend>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label class="block text-xs">Pilih Layanan</label>
              <select
                v-model="form.serviceId"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option disabled :value="null">Pilih...</option>
                <option v-for="pkg in packages" :key="pkg.id" :value="pkg.id">
                  {{ pkg.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-xs">Tanggal & Waktu</label>
              <input
                v-model="form.scheduledAt"
                type="datetime-local"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">Durasi (Menit)</label>
              <input
                v-model.number="form.duration"
                type="number"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">Lokasi</label>
              <input
                v-model="form.location"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Contoh: Studio A / Outdoor"
              />
            </div>
          </div>
        </fieldset>

        <fieldset class="border p-4 rounded-md">
          <legend class="text-sm font-medium px-1">Pembayaran & Status</legend>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label class="block text-xs">Total Harga</label>
              <input
                v-model.number="form.totalPrice"
                type="number"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">DP Dibayarkan</label>
              <input
                v-model.number="form.downPaymentAmount"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-xs">Status Pesanan</label>
              <select
                v-model="form.status"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option>DIPROSES</option>
                <option>SELESAI</option>
                <option>DIBATALKAN</option>
              </select>
            </div>
          </div>
        </fieldset>

        <div>
          <label class="block text-xs">Catatan (Opsional)</label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
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
            Simpan Pesanan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
