// src/services/bookingService.js
let bookingsDB = [
  {
    id: '250707010',
    clientName: 'Guy Hawkins',
    clientContact: '081234567890',
    clientEmail: 'guy.hawkins@example.com',
    serviceId: 'PKG-002', // Prewed Indoor
    scheduledAt: '2025-08-15T14:30:00Z',
    duration: 60,
    location: 'Studio A (White Cyc)',
    status: 'DIPROSES',
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
    clientEmail: null,
    serviceId: 'PKG-001', // Self Foto Couple
    scheduledAt: '2025-08-10T18:00:00Z',
    duration: 15,
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
    scheduledAt: '2025-08-11T15:45:00Z',
    duration: 15,
    location: 'Studio A (White Cyc)',
    status: 'DIBATALKAN',
    downPaymentUrl: null,
    downPaymentAmount: 0,
    additions: null,
    totalPrice: 30000,
    notes: 'Klien membatalkan via WhatsApp karena tempat terlalu jauh.',
  },
  {
    id: '250707007',
    clientName: 'Ronald Richards',
    clientContact: '081234567893',
    clientEmail: 'ronald.richards@example.com',
    serviceId: 'PKG-002',
    scheduledAt: '2025-08-18T10:00:00Z',
    duration: 60,
    location: 'Outdoor - Taman Bungkul',
    status: 'DIPROSES',
    downPaymentUrl: 'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Bukti+DP',
    downPaymentAmount: 100000,
    additions: null,
    totalPrice: 200000,
    notes: '',
  },
  {
    id: '250707006',
    clientName: 'Robert Fox',
    clientContact: '081234567894',
    clientEmail: 'robert.fox@example.com',
    serviceId: 'PKG-001',
    scheduledAt: '2025-07-28T11:00:00Z',
    duration: 15,
    location: 'Studio A (White Cyc)',
    status: 'SELESAI',
    downPaymentUrl: null,
    downPaymentAmount: 40000,
    additions: null,
    totalPrice: 40000,
    notes: '',
  },
  {
    id: '250707005',
    clientName: 'Devon Lane',
    clientContact: '081234567895',
    clientEmail: null,
    serviceId: 'PKG-001',
    scheduledAt: '2025-08-20T16:00:00Z',
    duration: 15,
    location: 'Studio B (Thematic)',
    status: 'DIPROSES',
    downPaymentUrl: null,
    downPaymentAmount: 0,
    additions: null,
    totalPrice: 15000,
    notes: 'Booking via telepon.',
  },
  {
    id: '250707004',
    clientName: 'Jane Cooper',
    clientContact: '081234567896',
    clientEmail: 'jane.cooper@example.com',
    serviceId: 'PKG-001',
    scheduledAt: '2025-07-25T13:00:00Z',
    duration: 15,
    location: 'Studio A (White Cyc)',
    status: 'SELESAI',
    downPaymentUrl: null,
    downPaymentAmount: 30000,
    additions: null,
    totalPrice: 30000,
    notes: '',
  },
  {
    id: '250707003',
    clientName: 'Wade Warren',
    clientContact: '081234567897',
    clientEmail: 'wade.warren@example.com',
    serviceId: 'PKG-002',
    scheduledAt: '2025-08-14T09:00:00Z',
    duration: 60,
    location: 'Outdoor - Kenjeran',
    status: 'DIBATALKAN',
    downPaymentUrl: null,
    downPaymentAmount: 0,
    additions: null,
    totalPrice: 200000,
    notes: 'Jadwal bentrok.',
  },
]

const bookingService = {
  async getBookings() {
    await new Promise((r) => setTimeout(r, 500))
    return [...bookingsDB]
  },
  async createBooking(bookingData) {
    await new Promise((r) => setTimeout(r, 300))
    const newBooking = { id: `${Date.now()}`.slice(-9), ...bookingData }
    bookingsDB.unshift(newBooking) // Tambahkan ke awal array
    return newBooking
  },
  async updateBooking(bookingId, updatedData) {
    await new Promise((r) => setTimeout(r, 300))
    const index = bookingsDB.findIndex((b) => b.id === bookingId)
    if (index !== -1) {
      bookingsDB[index] = { ...bookingsDB[index], ...updatedData }
      return bookingsDB[index]
    }
    throw new Error('Booking not found')
  },
}

export default bookingService
