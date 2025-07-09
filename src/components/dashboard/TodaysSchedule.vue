<script setup>
defineProps({
  schedule: Array,
})
const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="font-bold text-brand-dark-blue mb-4">Jadwal Hari Ini</h3>
    <ul class="space-y-4">
      <li v-for="booking in schedule" :key="booking.id" class="flex items-center">
        <div
          class="w-12 h-12 bg-brand-light-blue text-brand-dark-blue flex flex-col items-center justify-center rounded-lg mr-4"
        >
          <span class="text-sm font-bold">{{ formatTime(booking.scheduledAt) }}</span>
        </div>
        <div>
          <p class="font-semibold text-sm">{{ booking.clientName }}</p>
          <p class="text-xs text-gray-500">{{ booking.location }}</p>
        </div>
      </li>
      <li v-if="schedule.length === 0" class="text-center text-sm text-gray-400 py-4">
        Tidak ada jadwal hari ini.
      </li>
    </ul>
  </div>
</template>
