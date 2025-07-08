<!-- src/views/BookingsView.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { usePackageStore } from '@/stores/packageStore'
import { useItemStore } from '@/stores/itemStore'
import BookingsTable from '@/components/bookings/BookingsTable.vue'
import BookingDetailPanel from '@/components/bookings/BookingDetailPanel.vue'

const bookingStore = useBookingStore()
const packageStore = usePackageStore()
const itemStore = useItemStore()

const isDetailPanelOpen = ref(false)
const selectedBooking = ref(null)

onMounted(() => {
  // Ambil semua data yang dibutuhkan oleh halaman ini dan panel detailnya
  bookingStore.fetchBookings()
  packageStore.fetchPackages()
  itemStore.fetchAll()
})

function viewDetails(booking) {
  selectedBooking.value = booking
  isDetailPanelOpen.value = true
}

function closePanel() {
  isDetailPanelOpen.value = false
  selectedBooking.value = null
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark-blue">Pesanan</h1>
      <button
        class="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
      >
        + Pesanan Manual
      </button>
    </div>

    <div v-if="bookingStore.isLoading" class="mt-6 text-center text-gray-500">
      Loading pesanan...
    </div>
    <div v-else-if="bookingStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ bookingStore.error }}
    </div>
    <div v-else>
      <BookingsTable
        :bookings="bookingStore.bookings"
        :packages="packageStore.packages"
        @view-details="viewDetails"
      />
    </div>

    <BookingDetailPanel
      v-if="selectedBooking"
      :is-open="isDetailPanelOpen"
      :booking="selectedBooking"
      :packages="packageStore.packages"
      :items="itemStore.items"
      @close="closePanel"
    />
  </div>
</template>
