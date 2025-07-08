<!-- src/components/bookings/BookingsTable.vue -->
<script setup>
defineProps({
  bookings: { type: Array, required: true },
  packages: { type: Array, required: true },
});
const emit = defineEmits(['view-details']);

const getPackageName = (serviceId, allPackages) => {
    const pkg = allPackages.find(p => p.id === serviceId);
    return pkg ? pkg.name : 'Layanan Dihapus';
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const getStatusClass = (status) => {
  const classes = {
    'DIPROSES': 'bg-yellow-100 text-yellow-800',
    'SELESAI': 'bg-green-100 text-green-800',
    'DIBATALKAN': 'bg-red-100 text-red-800',
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID Pesanan</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Jenis Pesanan</th>
            <th scope="col" class="px-6 py-3">Waktu & Tanggal</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id" class="bg-white border-b hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">#{{ booking.id }}</td>
            <td class="px-6 py-4">{{ booking.clientName }}</td>
            <td class="px-6 py-4">{{ getPackageName(booking.serviceId, packages) }}</td>
            <td class="px-6 py-4">{{ formatDate(booking.scheduledAt) }}</td>
            <td class="px-6 py-4">
              <span :class="getStatusClass(booking.status)" class="px-2 py-1 font-semibold leading-tight rounded-full text-xs">
                {{ booking.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="$emit('view-details', booking)" class="font-medium">
                &#8942; <!-- Vertical ellipsis icon -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>