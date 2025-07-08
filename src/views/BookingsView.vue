<!-- src/views/BookingsView.vue -->
<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { usePackageStore } from '@/stores/packageStore'
import { useItemStore } from '@/stores/itemStore'
import BookingsTable from '@/components/bookings/BookingsTable.vue'
import BookingDetailPanel from '@/components/bookings/BookingDetailPanel.vue'
import BookingFormModal from '@/components/bookings/BookingFormModal.vue'
import StatusUpdateModal from '@/components/bookings/StatusUpdateModal.vue'
import Pagination from '@/components/ui/Pagination.vue'

// Stores
const bookingStore = useBookingStore()
const packageStore = usePackageStore()
const itemStore = useItemStore()

// State untuk Modals
const isDetailPanelOpen = ref(false)
const isFormModalOpen = ref(false)
const isStatusModalOpen = ref(false)
const selectedBooking = ref(null)

// State untuk Filter & Paginasi
const searchQuery = ref('')
const statusFilter = ref('SEMUA')
const dateRange = ref({ start: '', end: '' })
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed Property untuk memfilter dan memaginasi data
const filteredBookings = computed(() => {
  let bookings = bookingStore.bookings

  // Filter berdasarkan pencarian nama atau email
  if (searchQuery.value) {
    bookings = bookings.filter(
      (b) =>
        b.clientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        b.clientEmail?.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Filter berdasarkan status
  if (statusFilter.value !== 'SEMUA') {
    bookings = bookings.filter((b) => b.status === statusFilter.value)
  }

  return bookings
})

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage.value))

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBookings.value.slice(start, end)
})

// Lifecycle & Functions
onMounted(() => {
  bookingStore.fetchBookings()
  packageStore.fetchPackages()
  itemStore.fetchAll()
})

function handlePageChange(page) {
  currentPage.value = page
}

function downloadReport() {
  let dataToExport = bookingStore.bookings

  // Filter berdasarkan tanggal jika ada
  if (dateRange.value.start && dateRange.value.end) {
    const startDate = new Date(dateRange.value.start).getTime()
    const endDate = new Date(dateRange.value.end).getTime()
    dataToExport = dataToExport.filter((b) => {
      const bookingDate = new Date(b.scheduledAt).getTime()
      return bookingDate >= startDate && bookingDate <= endDate
    })
  }

  if (dataToExport.length === 0) {
    alert('Tidak ada data untuk diekspor pada rentang tanggal yang dipilih.')
    return
  }

  // Konversi ke CSV
  const headers = 'ID Pesanan,Nama Klien,Kontak,Email,Layanan,Jadwal,Status,Total Harga\n'
  const csvContent = dataToExport
    .map((b) => {
      const serviceName = packageStore.packages.find((p) => p.id === b.serviceId)?.name || 'N/A'
      return `"${b.id}","${b.clientName}","${b.clientContact}","${b.clientEmail || ''}","${serviceName}","${new Date(b.scheduledAt).toLocaleString('id-ID')}","${b.status}","${b.totalPrice}"`
    })
    .join('\n')

  const csv = headers + csvContent
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `laporan_pesanan_${new Date().toISOString().slice(0, 10)}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

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

    <!-- Bagian Filter dan Laporan -->
    <div
      class="mb-6 p-4 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
      <!-- Filter Pencarian -->
      <div>
        <label class="text-xs font-semibold">Cari Nama/Email</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari..."
          class="mt-1 w-full text-sm rounded-md border-gray-300"
        />
      </div>
      <!-- Filter Status -->
      <div>
        <label class="text-xs font-semibold">Status</label>
        <select v-model="statusFilter" class="mt-1 w-full text-sm rounded-md border-gray-300">
          <option>SEMUA</option>
          <option>DIPROSES</option>
          <option>SELESAI</option>
          <option>DIBATALKAN</option>
        </select>
      </div>
      <!-- Filter Tanggal & Download -->
      <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label class="text-xs font-semibold">Dari Tanggal</label>
          <input
            v-model="dateRange.start"
            type="date"
            class="mt-1 w-full text-sm rounded-md border-gray-300"
          />
        </div>
        <div>
          <label class="text-xs font-semibold">Sampai Tanggal</label>
          <input
            v-model="dateRange.end"
            type="date"
            class="mt-1 w-full text-sm rounded-md border-gray-300"
          />
        </div>
        <button
          @click="downloadReport"
          class="h-10 inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Unduh Laporan
        </button>
      </div>
    </div>

    <div v-if="bookingStore.isLoading" class="mt-6 text-center text-gray-500">
      Loading pesanan...
    </div>
    <div v-else-if="bookingStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ bookingStore.error }}
    </div>
    <div v-else>
      <BookingsTable
        :bookings="paginatedBookings"
        :packages="packageStore.packages"
        @view-details="viewDetails"
      />
      <div v-if="totalPages > 1" class="mt-6">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredBookings.length"
          :items-per-page="itemsPerPage"
          @page-change="handlePageChange"
        />
      </div>
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
