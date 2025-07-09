<!-- src/views/HomeView.vue -->
<script setup>
import RevenueChart from '@/components/dashboard/RevenueChart.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import TodaysSchedule from '@/components/dashboard/TodaysSchedule.vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import { onMounted } from 'vue'

const dashboardStore = useDashboardStore()

onMounted(() => {
  dashboardStore.fetchAllDashboardData()
})

const formatCurrency = (value) => `Rp ${value?.toLocaleString('id-ID') || 0}`
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold text-brand-dark-blue mb-6">Dashboard</h1>

    <div v-if="dashboardStore.isLoading" class="text-center p-10">Loading dashboard...</div>
    <div v-else-if="dashboardStore.error" class="p-4 bg-red-100 text-red-700 rounded-lg">
      {{ dashboardStore.error }}
    </div>

    <div v-else class="space-y-8">
      <!-- Bagian Kartu Statistik -->
      <div v-if="dashboardStore.stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pesanan Bulan Ini"
          :value="dashboardStore.stats.totalBookings"
          icon-bg-color="bg-blue-100"
        >
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </StatCard>
        <StatCard
          title="Pendapatan Bulan Ini"
          :value="formatCurrency(dashboardStore.stats.totalRevenue)"
          icon-bg-color="bg-green-100"
        >
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
            />
          </svg>
        </StatCard>
        <StatCard
          title="Total Proyek"
          :value="dashboardStore.stats.totalProjects"
          icon-bg-color="bg-indigo-100"
        >
          <svg
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </StatCard>
        <StatCard
          title="Total Layanan"
          :value="dashboardStore.stats.totalServices"
          icon-bg-color="bg-pink-100"
        >
          <svg class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </StatCard>
      </div>

      <!-- Bagian Jadwal & Grafik -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <RevenueChart
            v-if="dashboardStore.chartData"
            :series="dashboardStore.chartData.series"
            :categories="dashboardStore.chartData.categories"
          />
        </div>
        <div class="lg:col-span-1">
          <TodaysSchedule :schedule="dashboardStore.todaysSchedule" />
        </div>
      </div>
    </div>
  </div>
</template>
