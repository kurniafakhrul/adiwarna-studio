// src/services/bookingService.js
let bookingsDB = [
  {
    id: '250707010',
    clientName: 'Guy Hawkins',
    clientContact: '081234567890',
    clientEmail: 'guy.hawkins@example.com',
    serviceId: 'PKG-002', // Prewed Indoor
    scheduledAt: '2025-03-15T14:30:00Z',
    location: 'Studio A (White Cyc)',
    status: 'DIPROSES', // DIBUAT, DIPROSES, SELESAI, DIBATALKAN
    downPaymentUrl: 'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Bukti+DP',
    downPaymentAmount: 100000,
    additions: {
      extraMinutes: 15,
      extraPeople: 1,
      items: [{ itemId: 'ITEM-03', quantity: 1, price: 15000 }],
    },
    totalPrice: 250000,
    notes: 'Klien minta properti bunga tambahan jika ada.',
  },
  {
    id: '250707009',
    clientName: 'Albert Flores',
    clientContact: '081234567891',
    clientEmail: 'albert.flores@example.com',
    serviceId: 'PKG-001', // Self Foto Couple
    scheduledAt: '2025-01-30T18:00:00Z',
    location: 'Studio B (Thematic)',
    status: 'SELESAI',
    downPaymentUrl: null,
    downPaymentAmount: 30000,
    additions: null,
    totalPrice: 30000,
    notes: '',
  },
  {
    id: '250707008',
    clientName: 'Bessie Cooper',
    clientContact: '081234567892',
    clientEmail: 'bessie.cooper@example.com',
    serviceId: 'PKG-001',
    scheduledAt: '2025-07-22T15:45:00Z',
    location: 'Studio A (White Cyc)',
    status: 'DIBATALKAN',
    downPaymentUrl: null,
    downPaymentAmount: 0,
    additions: null,
    totalPrice: 30000,
    notes: 'Klien membatalkan via WhatsApp karena tempat terlalu jauh.',
  },
]

const bookingService = {
  async getBookings() {
    await new Promise((r) => setTimeout(r, 500))
    return [...bookingsDB]
  },
  // ... (Fungsi create, update, delete akan kita buat di iterasi selanjutnya)
}

export default bookingService
