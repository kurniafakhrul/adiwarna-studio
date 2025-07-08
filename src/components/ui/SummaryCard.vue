<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  }
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
    <h2 class="text-xl font-semibold text-gray-600">{{ title }}</h2>
    <!-- Menggunakan warna emas untuk nilai statistik -->
    <p class="text-3xl font-bold mt-2 text-brand-gold">{{ value }}</p>
  </div>
</template>
