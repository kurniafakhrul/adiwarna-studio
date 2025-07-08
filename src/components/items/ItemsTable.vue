<!-- src/components/items/ItemsTable.vue -->
<script setup>
defineProps({
  items: { type: Array, required: true },
});
const emit = defineEmits(['edit', 'delete']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Gambar</th>
            <th scope="col" class="px-6 py-3">Nama Item</th>
            <th scope="col" class="px-6 py-3">Tipe</th>
            <th scope="col" class="px-6 py-3">Harga</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="bg-white border-b hover:bg-gray-50">
            <td class="px-6 py-4">
              <img :src="item.imageUrl" :alt="item.name" class="w-12 h-12 object-cover rounded-md" onerror="this.onerror=null;this.src='https://placehold.co/100x100/cccccc/FFFFFF?text=Error';">
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.name }}</th>
            <td class="px-6 py-4">
              <span :class="item.isFree ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'" class="px-2 py-1 font-semibold leading-tight rounded-full text-xs">
                {{ item.isFree ? 'Gratis' : 'Berbayar' }}
              </span>
            </td>
            <td class="px-6 py-4">{{ item.isFree ? '-' : formatCurrency(item.price) }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="$emit('edit', item)" class="font-medium text-brand-gold hover:underline mr-4">Edit</button>
              <button @click="$emit('delete', item)" class="font-medium text-red-600 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
