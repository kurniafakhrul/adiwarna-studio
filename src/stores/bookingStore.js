// src/stores/bookingStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import bookingService from '@/services/bookingService';

export const useBookingStore = defineStore('booking', () => {
    const bookings = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchBookings() {
        isLoading.value = true;
        error.value = null;
        try {
            bookings.value = await bookingService.getBookings();
        } catch (e) {
            error.value = 'Gagal mengambil data pesanan.';
        } finally {
            isLoading.value = false;
        }
    }

    // Nanti kita akan tambahkan action untuk create, update, delete

    return { bookings, isLoading, error, fetchBookings };
});
