// src/stores/bookingStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import bookingService from '@/services/bookingService'

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchBookings() {
    isLoading.value = true
    error.value = null
    try {
      bookings.value = await bookingService.getBookings()
    } catch (e) {
      error.value = 'Gagal mengambil data pesanan.'
    } finally {
      isLoading.value = false
    }
  }

  async function addBooking(bookingData) {
    const newBooking = await bookingService.createBooking(bookingData)
    bookings.value.unshift(newBooking)
  }

  async function updateBooking(bookingId, updatedData) {
    const updatedBooking = await bookingService.updateBooking(bookingId, updatedData)
    const index = bookings.value.findIndex((b) => b.id === bookingId)
    if (index !== -1) {
      bookings.value[index] = updatedBooking
    }
  }

  return { bookings, isLoading, error, fetchBookings, addBooking, updateBooking }
})
