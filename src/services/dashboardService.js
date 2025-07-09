// src/services/dashboardService.js
import { bookingsDB } from '@/services/bookingService.js'
import { packagesDB } from '@/services/packageService.js'
import { projectsDB } from '@/services/projectService.js'

const dashboardService = {
  // Fungsi untuk mengambil data KPI utama
  async getStats() {
    await new Promise((r) => setTimeout(r, 300))

    const today = new Date('2025-07-09') // Set tanggal statis untuk konsistensi demo
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const totalBookingsThisMonth = bookingsDB.filter((b) => {
      const bookingDate = new Date(b.scheduledAt)
      return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear
    }).length

    const revenueThisMonth = bookingsDB
      .filter((b) => {
        const bookingDate = new Date(b.scheduledAt)
        return (
          b.status === 'SELESAI' &&
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        )
      })
      .reduce((acc, booking) => acc + booking.totalPrice, 0)

    return {
      totalBookings: totalBookingsThisMonth,
      totalRevenue: revenueThisMonth,
      totalProjects: projectsDB.length,
      totalServices: packagesDB.length,
    }
  },

  // Fungsi untuk mengambil jadwal khusus hari ini
  async getTodaysSchedule() {
    await new Promise((r) => setTimeout(r, 500))
    const today = new Date('2025-07-09') // Set tanggal statis untuk konsistensi demo
    return bookingsDB
      .filter((b) => new Date(b.scheduledAt).toDateString() === today.toDateString())
      .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
  },

  // Fungsi untuk data grafik
  async getRevenueChartData() {
    await new Promise((r) => setTimeout(r, 800))
    return {
      categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      series: [
        {
          name: 'Pendapatan',
          data: [350000, 500000, 450000, 750000, 600000, 1200000, 950000],
        },
      ],
    }
  },
}

export default dashboardService
