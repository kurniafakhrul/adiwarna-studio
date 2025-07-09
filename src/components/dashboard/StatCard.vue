<script setup>
defineProps({
  title: String,
  value: [String, Number],
  iconBgColor: String,
})
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div :class="iconBgColor" class="w-12 h-12 rounded-full flex items-center justify-center mr-4">
      <slot></slot>
      <!-- Untuk ikon SVG -->
    </div>
    <div>
      <p class="text-sm text-gray-500">{{ title }}</p>
      <p class="text-2xl font-bold text-brand-dark-blue">{{ value }}</p>
    </div>
  </div>
</template>
