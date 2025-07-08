// src/stores/dashboardStore.js
import dashboardService from '@/services/dashboardService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDashboardStore = defineStore('dashboard', () => {
  // State yang sudah ada
  const summaryData = ref(null);
  const isLoadingSummary = ref(false);
  const chartData = ref(null);
  const isLoadingChart = ref(false);
  const error = ref(null);

  // STATE BARU UNTUK RIWAYAT PEMESANAN
  const recentBookings = ref([]);
  const isLoadingBookings = ref(false);

  // ACTIONS
  async function fetchDashboardData() {
    isLoadingSummary.value = true;
    isLoadingChart.value = true;
    isLoadingBookings.value = true; // <-- Aktifkan loading
    error.value = null;

    try {
      // Jalankan semua pengambilan data secara paralel
      const [summary, chart, bookings] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getRevenueChartData(),
        dashboardService.getRecentBookings() // <-- Panggil service baru
      ]);
      summaryData.value = summary;
      chartData.value = chart;
      recentBookings.value = bookings; // <-- Simpan data pemesanan
    } catch (e) {
      error.value = 'Gagal mengambil data dashboard.';
    } finally {
      isLoadingSummary.value = false;
      isLoadingChart.value = false;
      isLoadingBookings.value = false; // <-- Matikan loading
    }
  }

  return { 
    summaryData, isLoadingSummary,
    chartData, isLoadingChart,
    recentBookings, isLoadingBookings, // <-- Ekspor state baru
    error,
    fetchDashboardData
  };
});
