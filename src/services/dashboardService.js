// src/services/dashboardService.js

const dashboardService = {
  // Fungsi untuk summary cards
  async getSummary() {
    console.log("Fetching dashboard summary data (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalBookings: 78,
      pendingSessions: 12,
      monthlyRevenue: 12550000,
    };
  },

  // Fungsi untuk data grafik
  async getRevenueChartData() {
    console.log("Fetching chart data (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulasi data pendapatan untuk 7 hari terakhir
    return {
      categories: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      series: [
        {
          name: 'Pendapatan',
          data: [350000, 500000, 450000, 750000, 600000, 1200000, 950000],
        },
      ],
    };
  },

  // Fungsi untuk riwayat pemesanan
  async getRecentBookings() {
    console.log("Fetching recent bookings (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay lebih cepat
    // Simulasi data 5 pemesanan terakhir
    return [
      { id: 'BK-001', clientName: 'Ahmad Subarjo', packageName: 'Self Foto Grup', date: '2025-07-10', status: 'Selesai' },
      { id: 'BK-002', clientName: 'Citra Lestari', packageName: 'Prewed Indoor', date: '2025-07-11', status: 'Tertunda' },
      { id: 'BK-003', clientName: 'Budi Santoso', packageName: 'Pas Foto Pra Nikah', date: '2025-07-11', status: 'Dikonfirmasi' },
      { id: 'BK-004', clientName: 'Dewi Anggraini', packageName: 'Paket Wisuda', date: '2025-07-12', status: 'Dikonfirmasi' },
      { id: 'BK-005', clientName: 'Eko Prasetyo', packageName: 'Self Foto Couple', date: '2025-07-12', status: 'Dibatalkan' },
    ];
  }
};

export default dashboardService;