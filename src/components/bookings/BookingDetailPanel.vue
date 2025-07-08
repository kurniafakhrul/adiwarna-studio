<!-- src/components/bookings/BookingDetailPanel.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  booking: { type: Object, required: true },
  isOpen: Boolean,
  packages: { type: Array, required: true },
  items: { type: Array, required: true },
})
const emit = defineEmits(['close', 'open-status-modal', 'edit'])

const formatCurrency = (value) => `Rp ${value?.toLocaleString('id-ID') || 0}`
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

const currentPackage = computed(() => {
  return props.packages.find((p) => p.id === props.booking.serviceId) || {}
})

const getStatusStep = (status) => {
  const steps = { DIBUAT: 1, DIPROSES: 2, SELESAI: 3, DIBATALKAN: 0 }
  return steps[status] || 0
}
const currentStep = computed(() => getStatusStep(props.booking.status))
</script>
<template>
  <div
    @click="$emit('close')"
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
  ></div>
  <div
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    class="fixed top-0 right-0 w-full max-w-lg h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
  >
    <div class="p-6 flex flex-col h-full">
      <div class="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 class="text-xl font-bold text-brand-dark-blue">#{{ booking.id }}</h2>
          <p class="text-sm text-gray-500">Detail pesanan</p>
        </div>
        <button @click="$emit('close')" class="p-2 rounded-full hover:bg-gray-200">&times;</button>
      </div>
      <div class="overflow-y-auto flex-1 space-y-6 pr-2">
        <!-- Status Timeline -->
        <div
          class="flex justify-between items-center text-center text-xs font-semibold text-gray-500"
        >
          <div
            class="flex flex-col items-center"
            :class="{ 'text-brand-dark-blue': currentStep >= 1 }"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border-2"
              :class="
                currentStep >= 1
                  ? 'bg-brand-dark-blue border-brand-dark-blue text-white'
                  : 'bg-white'
              "
            >
              &#10003;
            </div>
            <p class="mt-1">Dibuat</p>
          </div>
          <div
            class="flex-1 h-0.5"
            :class="currentStep >= 2 ? 'bg-brand-dark-blue' : 'bg-gray-300'"
          ></div>
          <div
            class="flex flex-col items-center"
            :class="{ 'text-brand-dark-blue': currentStep >= 2 }"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border-2"
              :class="
                currentStep >= 2
                  ? 'bg-brand-dark-blue border-brand-dark-blue text-white'
                  : 'bg-white'
              "
            >
              &#10003;
            </div>
            <p class="mt-1">Diproses</p>
          </div>
          <div
            class="flex-1 h-0.5"
            :class="currentStep >= 3 ? 'bg-brand-dark-blue' : 'bg-gray-300'"
          ></div>
          <div
            class="flex flex-col items-center"
            :class="{ 'text-brand-dark-blue': currentStep >= 3 }"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border-2"
              :class="
                currentStep >= 3
                  ? 'bg-brand-dark-blue border-brand-dark-blue text-white'
                  : 'bg-white'
              "
            >
              &#10003;
            </div>
            <p class="mt-1">Selesai</p>
          </div>
        </div>

        <!-- Detail Status -->
        <div class="flex justify-between items-start border-b pb-4">
          <div>
            <p class="text-sm text-gray-500">Status</p>
            <p
              class="font-bold"
              :class="{
                'text-yellow-600': booking.status === 'DIPROSES',
                'text-green-600': booking.status === 'SELESAI',
                'text-red-600': booking.status === 'DIBATALKAN',
              }"
            >
              {{ booking.status }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Keterangan</p>
            <p class="font-medium">{{ booking.notes || '-' }}</p>
          </div>
          <!-- Tombol baru untuk membuka modal -->
          <button
            @click="$emit('open-status-modal')"
            class="text-sm text-blue-600 hover:underline self-end"
          >
            Ubah Status
          </button>
        </div>

        <!-- Rincian Pesanan -->
        <div v-if="currentPackage" class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2 text-brand-dark-blue">Paket Pesanan</h3>
            <div class="border p-4 rounded-md space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Nama Paket</span>
                <span
                  class="font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                  >{{ currentPackage.category?.toUpperCase() }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Detail Paket</span>
                <span class="font-medium">{{ currentPackage.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Harga</span>
                <span class="font-medium">{{ formatCurrency(currentPackage.basePrice) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">Yang sudah dibayarkan</span>
                <div class="flex items-center space-x-3">
                  <span class="font-medium">{{ formatCurrency(booking.downPaymentAmount) }}</span>
                  <a
                    v-if="booking.downPaymentUrl"
                    :href="booking.downPaymentUrl"
                    target="_blank"
                    class="text-sm text-blue-600 hover:underline font-semibold"
                    >Lihat Bukti</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div v-if="booking.additions?.items?.length > 0">
            <h3 class="font-semibold mb-2 text-brand-dark-blue">Paket Tambahan</h3>
            <div class="border p-4 rounded-md space-y-2 text-sm">
              <div
                v-for="item in booking.additions.items"
                :key="item.itemId"
                class="flex justify-between"
              >
                <span class="text-gray-500">{{
                  items.find((i) => i.id === item.itemId)?.name || 'Item Tambahan'
                }}</span>
                <span class="font-medium">{{ formatCurrency(item.price) }}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2 text-brand-dark-blue">Waktu Pelaksanaan</h3>
            <div class="border p-4 rounded-md space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Tempat</span>
                <span class="font-medium">{{ booking.location }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Tanggal</span>
                <span class="font-medium">{{ formatDate(booking.scheduledAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Waktu</span>
                <span class="font-medium">{{ formatTime(booking.scheduledAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Durasi</span>
                <span class="font-medium">{{ booking.duration }} Menit</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2 text-brand-dark-blue">Informasi Pemesan</h3>
            <div class="border p-4 rounded-md space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Nama</span>
                <span class="font-medium">{{ booking.clientName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Nomor Handphone</span>
                <span class="font-medium">{{ booking.clientContact }}</span>
              </div>
              <div v-if="booking.clientEmail" class="flex justify-between">
                <span class="text-gray-500">Email</span>
                <span class="font-medium">{{ booking.clientEmail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Tombol Aksi di Bagian Bawah Panel -->
      <div class="mt-6 pt-4 border-t">
        <button
          @click="$emit('edit')"
          class="w-full px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
        >
          Edit Pesanan Ini
        </button>
      </div>
    </div>
  </div>
</template>
