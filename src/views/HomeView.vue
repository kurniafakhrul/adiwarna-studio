<!-- src/views/HomeView.vue -->
<script setup>
import RevenueChart from '@/components/charts/RevenueChart.vue';
import RecentBookingsTable from '@/components/dashboard/RecentBookingsTable.vue';
import SummaryCard from '@/components/ui/SummaryCard.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { onMounted } from 'vue';

const dashboardStore = useDashboardStore();

// Saat komponen pertama kali dimuat, panggil action untuk mengambil semua data dashboard
onMounted(() => {
  dashboardStore.fetchDashboardData();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-brand-dark">Dashboard</h1>

    <!-- Bagian Summary Cards -->
    <div v-if="dashboardStore.isLoadingSummary" class="mt-6 text-center text-gray-500">Loading summary...</div>
    <div v-else-if="dashboardStore.summaryData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <SummaryCard title="Total Pemesanan" :value="dashboardStore.summaryData.totalBookings" />
      <SummaryCard title="Sesi Tertunda" :value="dashboardStore.summaryData.pendingSessions" />
      <SummaryCard title="Pendapatan Bulan Ini" :value="`Rp ${dashboardStore.summaryData.monthlyRevenue.toLocaleString('id-ID')}`" />
    </div>

    <!-- Bagian Grafik -->
    <div class="mt-8">
      <div v-if="dashboardStore.isLoadingChart" class="mt-6 text-center text-gray-500">Loading chart...</div>
      <div v-else-if="dashboardStore.chartData">
        <RevenueChart 
          :series="dashboardStore.chartData.series" 
          :categories="dashboardStore.chartData.categories"
        />
      </div>
    </div>

    <!-- BAGIAN RIWAYAT PEMESANAN -->
    <div class="mt-8">
      <div v-if="dashboardStore.isLoadingBookings" class="mt-6 text-center text-gray-500">Loading recent bookings...</div>
      <div v-else-if="dashboardStore.recentBookings.length > 0">
        <RecentBookingsTable :bookings="dashboardStore.recentBookings" />
      </div>
    </div>

    <!-- Tampilkan pesan error umum jika ada -->
    <div v-if="dashboardStore.error && !dashboardStore.isLoadingSummary && !dashboardStore.isLoadingChart" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ dashboardStore.error }}
    </div>
  </div>
</template>
