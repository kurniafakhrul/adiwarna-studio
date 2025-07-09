<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  series: { type: Array, required: true },
  categories: { type: Array, required: true },
})

const chartOptions = computed(() => ({
  chart: { type: 'area', height: 350, toolbar: { show: false } },
  colors: ['#1C274C'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  xaxis: { categories: props.categories },
  yaxis: { labels: { formatter: (value) => `Rp${value / 1000}k` } },
  tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
}))
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md h-full">
    <h3 class="font-bold text-brand-dark-blue">Grafik Pendapatan Mingguan</h3>
    <VueApexCharts type="area" height="320" :options="chartOptions" :series="props.series" />
  </div>
</template>
