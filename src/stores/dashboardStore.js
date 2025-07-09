// src/stores/dashboardStore.js
import dashboardService from '@/services/dashboardService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref(null)
  const todaysSchedule = ref([])
  const chartData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchAllDashboardData() {
    isLoading.value = true
    error.value = null
    try {
      const [statsData, scheduleData, revenueChartData] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getTodaysSchedule(),
        dashboardService.getRevenueChartData(),
      ])
      stats.value = statsData
      todaysSchedule.value = scheduleData
      chartData.value = revenueChartData
    } catch (e) {
      error.value = 'Gagal memuat data dashboard.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { stats, todaysSchedule, chartData, isLoading, error, fetchAllDashboardData }
})
