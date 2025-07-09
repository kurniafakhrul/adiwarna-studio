<!-- src/views/CalendarView.vue -->
<script setup>
import { computed, onMounted, ref } from 'vue'

// External Libraries
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/vue3'

// Pinia Stores
import { useBookingStore } from '@/stores/bookingStore'
import { useItemStore } from '@/stores/itemStore'
import { usePackageStore } from '@/stores/packageStore'

// Local Components
import BookingDetailPanel from '@/components/bookings/BookingDetailPanel.vue'
import BookingFormModal from '@/components/bookings/BookingFormModal.vue'
import StatusUpdateModal from '@/components/bookings/StatusUpdateModal.vue'

const bookingStore = useBookingStore()
const packageStore = usePackageStore()
const itemStore = useItemStore()

// State untuk Modals dan Panel
const isDetailPanelOpen = ref(false)
const isFormModalOpen = ref(false)
const isStatusModalOpen = ref(false)
const selectedBooking = ref(null)

onMounted(() => {
  if (bookingStore.bookings.length === 0) bookingStore.fetchBookings()
  if (packageStore.packages.length === 0) packageStore.fetchPackages()
  if (itemStore.items.length === 0) itemStore.fetchAll()
})

const calendarEvents = computed(() => {
  return bookingStore.bookings.map((booking) => {
    const pkg = packageStore.packages.find((p) => p.id === booking.serviceId)
    const statusColors = {
      DIPROSES: '#FBBF24',
      SELESAI: '#10B981',
      DIBATALKAN: '#EF4444',
    }
    return {
      id: booking.id,
      title: `${booking.clientName} - (${booking.location})`,
      start: booking.scheduledAt,
      backgroundColor: statusColors[booking.status] || '#6B7280',
      borderColor: statusColors[booking.status] || '#6B7280',
    }
  })
})

// --- Fungsi untuk menangani interaksi ---
function handleEventClick(clickInfo) {
  const bookingId = clickInfo.event.id
  const bookingData = bookingStore.bookings.find((b) => b.id === bookingId)

  if (bookingData) {
    selectedBooking.value = bookingData
    isDetailPanelOpen.value = true
  }
}

function openEditModal(booking) {
  selectedBooking.value = booking
  isDetailPanelOpen.value = false
  isFormModalOpen.value = true
}

function openStatusModal() {
  isDetailPanelOpen.value = false
  isStatusModalOpen.value = true
}

function closeModal() {
  isDetailPanelOpen.value = false
  isFormModalOpen.value = false
  isStatusModalOpen.value = false
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

async function handleStatusUpdate(newStatus) {
  if (selectedBooking.value) {
    await bookingStore.updateBooking(selectedBooking.value.id, {
      ...selectedBooking.value,
      status: newStatus,
    })
  }
  closeModal()
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek',
  },
  weekends: true,
  events: calendarEvents.value,
  eventClick: handleEventClick,
}))
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark-blue">Kalender Pesanan</h1>
    </div>

    <div
      v-if="bookingStore.isLoading || packageStore.isLoading"
      class="mt-6 text-center text-gray-500"
    >
      Loading calendar...
    </div>
    <div v-else-if="bookingStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ bookingStore.error }}
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- Menggunakan Panel Detail yang sudah ada -->
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

    <!-- Modal lain yang dibutuhkan oleh panel -->
    <BookingFormModal
      v-if="isFormModalOpen"
      :is-open="isFormModalOpen"
      :booking-data="selectedBooking"
      :packages="packageStore.packages"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
    <StatusUpdateModal
      v-if="selectedBooking && isStatusModalOpen"
      :is-open="isStatusModalOpen"
      :current-status="selectedBooking.status"
      @close="closeModal"
      @submit="handleStatusUpdate"
    />
  </div>
</template>
