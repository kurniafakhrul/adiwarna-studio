<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  series: { type: Array, required: true },
  categories: { type: Array, required: true },
});

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: ['#cfaa3b'], // Gunakan warna brand-gold
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: props.categories,
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return "Rp " + value.toLocaleString('id-ID');
      }
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
}));
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-bold text-brand-dark">Ringkasan Pendapatan Mingguan</h3>
    <VueApexCharts
      type="area"
      height="350"
      :options="chartOptions"
      :series="props.series"
    />
  </div>
</template>