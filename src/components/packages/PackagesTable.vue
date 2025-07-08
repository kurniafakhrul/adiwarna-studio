<script setup>
defineProps({
  packages: { type: Array, required: true },
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
            <th scope="col" class="px-6 py-3">Kategori</th>
            <th scope="col" class="px-6 py-3">Nama Paket</th>
            <th scope="col" class="px-6 py-3">Harga Dasar</th>
            <th scope="col" class="px-6 py-3">Kapasitas</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pkg in packages" :key="pkg.id" class="bg-white border-b hover:bg-gray-50">
           <td class="px-6 py-4">
    <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full text-xs">
        {{ pkg.category }}
    </span>
</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ pkg.name }}</th>
            <td class="px-6 py-4">{{ formatCurrency(pkg.basePrice) }}</td>
            <td class="px-6 py-4">{{ pkg.baseCapacity }} orang</td>
            <td class="px-6 py-4 text-right">
              <button @click="$emit('edit', pkg)" class="font-medium text-brand-gold hover:underline mr-4">Edit</button>
              <button @click="$emit('delete', pkg)" class="font-medium text-red-600 hover:underline">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
