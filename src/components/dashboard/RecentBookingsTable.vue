<!-- src/components/dashboard/RecentBookingsTable.vue -->
<script setup>

const props = defineProps({
  bookings: {
    type: Array,
    required: true,
  },
});

// Fungsi untuk menentukan warna badge berdasarkan status
const getStatusClass = (status) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-800';
    case 'Dikonfirmasi':
      return 'bg-blue-100 text-blue-800';
    case 'Tertunda':
      return 'bg-yellow-100 text-yellow-800';
    case 'Dibatalkan':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-bold text-brand-dark">Pemesanan Terakhir</h3>
    <div class="mt-4 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID Pesanan</th>
            <th scope="col" class="px-6 py-3">Klien</th>
            <th scope="col" class="px-6 py-3">Paket</th>
            <th scope="col" class="px-6 py-3">Tanggal</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id" class="bg-white border-b hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ booking.id }}
            </th>
            <td class="px-6 py-4">{{ booking.clientName }}</td>
            <td class="px-6 py-4">{{ booking.packageName }}</td>
            <td class="px-6 py-4">{{ booking.date }}</td>
            <td class="px-6 py-4">
              <span :class="getStatusClass(booking.status)" class="px-2 py-1 font-semibold leading-tight rounded-full text-xs">
                {{ booking.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>