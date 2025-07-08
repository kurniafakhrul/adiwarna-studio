<!-- src/components/ui/Pagination.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
})

const emit = defineEmits(['page-change'])

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))

function changePage(page) {
  if (page > 0 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>
<template>
  <div class="flex items-center justify-between text-sm text-gray-600">
    <p>
      Menampilkan <span class="font-semibold">{{ startItem }}</span
      >-<span class="font-semibold">{{ endItem }}</span> dari
      <span class="font-semibold">{{ totalItems }}</span> hasil
    </p>
    <div class="flex items-center space-x-1">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &larr; Sebelumnya
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="currentPage === page ? 'bg-brand-dark-blue text-white' : 'hover:bg-gray-100'"
        class="w-8 h-8 rounded-md"
      >
        {{ page }}
      </button>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Berikutnya &rarr;
      </button>
    </div>
  </div>
</template>
