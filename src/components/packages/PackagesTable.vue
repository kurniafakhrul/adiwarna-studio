<!-- src/components/packages/PackagesTable.vue -->
<script setup>
defineProps({
  packages: { type: Array, required: true },
  attributes: { type: Array, required: true }, // Terima daftar atribut
});
const emit = defineEmits(['edit', 'delete']);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

// Fungsi untuk mendapatkan nama atribut dari ID-nya
const getAttributeNames = (attributeIds, allAttributes) => {
    if (!attributeIds || attributeIds.length === 0) return 'Tidak ada';
    return attributeIds.map(id => {
        const attr = allAttributes.find(a => a.id === id);
        return attr ? attr.name : '';
    }).join(', ');
};
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Nama Layanan</th>
            <th scope="col" class="px-6 py-3">Kategori</th>
            <th scope="col" class="px-6 py-3">Atribut Termasuk</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pkg in packages" :key="pkg.id" class="bg-white border-b hover:bg-gray-50">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ pkg.name }}</th>
            <td class="px-6 py-4">{{ pkg.category }}</td>
            <td class="px-6 py-4 text-xs">{{ getAttributeNames(pkg.attributeIds, attributes) }}</td>
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
