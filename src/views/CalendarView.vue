<!-- src/views/CalendarView.vue -->
<script setup>
import { useBookingStore } from '@/stores/bookingStore'
import { usePackageStore } from '@/stores/packageStore'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/vue3'
import { computed, onMounted, ref } from 'vue'

const bookingStore = useBookingStore()
const packageStore = usePackageStore()
const calendarComponent = ref(null) // Referensi ke komponen FullCalendar

onMounted(() => {
  if (bookingStore.bookings.length === 0) {
    bookingStore.fetchBookings()
  }
  if (packageStore.packages.length === 0) {
    packageStore.fetchPackages()
  }
})

// Konversi data bookings menjadi events untuk FullCalendar
const calendarEvents = computed(() => {
  return bookingStore.bookings.map((booking) => {
    const pkg = packageStore.packages.find((p) => p.id === booking.serviceId)
    const statusColors = {
      DIPROSES: '#FBBF24', // Amber 400
      SELESAI: '#10B981', // Emerald 500
      DIBATALKAN: '#EF4444', // Red 500
    }

    return {
      id: booking.id,
      title: `${booking.clientName} - (${booking.location})`,
      start: booking.scheduledAt, // pastikan ini ISO string atau Date object
      backgroundColor: statusColors[booking.status] || '#6B7280',
      borderColor: statusColors[booking.status] || '#6B7280',
      extendedProps: {
        packageName: pkg?.name || 'Layanan Tidak Ditemukan',
        status: booking.status,
      },
    }
  })
})

// Jadikan calendarOptions reaktif agar ikut berubah saat event berubah
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek',
  },
  weekends: true,
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
  },
  events: calendarEvents.value, // penting!
  // eventClick: handleEventClick,
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
      <FullCalendar ref="calendarComponent" :options="calendarOptions" />
    </div>
  </div>
</template>

<style>
/* Styling kustom untuk FullCalendar agar cocok dengan tema */
.fc .fc-button-primary {
  background-color: #1c274c !important; /* brand-dark-blue */
  border-color: #1c274c !important;
  text-transform: capitalize;
}
.fc .fc-button-primary:hover {
  background-color: #2d3d6e !important;
}
.fc .fc-daygrid-day.fc-day-today {
  background-color: #eceffd !important; /* brand-light-blue */
}
.fc-event {
  cursor: pointer;
  padding: 3px 6px;
  font-size: 0.8rem;
}
</style>
