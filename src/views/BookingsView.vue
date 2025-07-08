<!-- src/views/BookingsView.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { usePackageStore } from '@/stores/packageStore'
import { useItemStore } from '@/stores/itemStore'
import BookingsTable from '@/components/bookings/BookingsTable.vue'
import BookingDetailPanel from '@/components/bookings/BookingDetailPanel.vue'
import BookingFormModal from '@/components/bookings/BookingFormModal.vue'
import StatusUpdateModal from '@/components/bookings/StatusUpdateModal.vue' // <-- 1. Impor modal baru

const bookingStore = useBookingStore()
const packageStore = usePackageStore()
const itemStore = useItemStore()

const isDetailPanelOpen = ref(false)
const isFormModalOpen = ref(false)
const isStatusModalOpen = ref(false) // <-- 2. State untuk modal status
const selectedBooking = ref(null)

onMounted(() => {
  bookingStore.fetchBookings()
  packageStore.fetchPackages()
  itemStore.fetchAll()
})

function viewDetails(booking) {
  selectedBooking.value = booking
  isDetailPanelOpen.value = true
}

function openAddModal() {
  selectedBooking.value = null
  isFormModalOpen.value = true
}

function openEditModal(booking) {
  selectedBooking.value = booking
  isDetailPanelOpen.value = false
  isFormModalOpen.value = true
}

// 3. Fungsi untuk membuka modal status
function openStatusModal() {
  isDetailPanelOpen.value = false // Tutup panel detail agar tidak tumpang tindih
  isStatusModalOpen.value = true
}

function closeModal() {
  isDetailPanelOpen.value = false
  isFormModalOpen.value = false
  isStatusModalOpen.value = false // <-- Reset state modal status
  selectedBooking.value = null
}

async function handleFormSubmit(formData) {
  if (selectedBooking.value) {
    await bookingStore.updateBooking(selectedBooking.value.id, formData)
  } else {
    await bookingStore.addBooking(formData)
  }
  closeModal()
}

// 4. Fungsi ini sekarang dipanggil oleh modal status
async function handleStatusUpdate(newStatus) {
  if (selectedBooking.value) {
    await bookingStore.updateBooking(selectedBooking.value.id, {
      ...selectedBooking.value,
      status: newStatus,
    })
  }
  closeModal()
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark-blue">Pesanan</h1>
      <button
        @click="openAddModal"
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
      v-if="selectedBooking && isDetailPanelOpen"
      :is-open="isDetailPanelOpen"
      :booking="selectedBooking"
      :packages="packageStore.packages"
      :items="itemStore.items"
      @close="closeModal"
      @edit="openEditModal(selectedBooking)"
      @open-status-modal="openStatusModal"
    />

    <BookingFormModal
      v-if="isFormModalOpen"
      :is-open="isFormModalOpen"
      :booking-data="selectedBooking"
      :packages="packageStore.packages"
      @close="closeModal"
      @submit="handleFormSubmit"
    />

    <!-- 5. Render modal status baru -->
    <StatusUpdateModal
      v-if="selectedBooking && isStatusModalOpen"
      :is-open="isStatusModalOpen"
      :current-status="selectedBooking.status"
      @close="closeModal"
      @submit="handleStatusUpdate"
    />
  </div>
</template>
