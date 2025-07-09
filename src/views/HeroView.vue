<!-- src/views/HeroView.vue -->
<script setup>
import ImageUploader from '@/components/ui/ImageUploader.vue'
import { useHeroStore } from '@/stores/heroStore'
import { computed, onMounted, ref, watch } from 'vue'

const heroStore = useHeroStore()

const isModalOpen = ref(false)
const editingHero = ref(null)
const form = ref({})

const modalTitle = computed(() => (editingHero.value ? 'Edit Hero' : 'Tambah Hero Baru'))

onMounted(() => {
  heroStore.fetchHeroes()
})

watch(editingHero, (newData) => {
  if (newData) {
    form.value = { ...newData }
  } else {
    form.value = {
      title: '',
      description: '',
      date: new Date().toISOString().slice(0, 10),
      imageUrl: null,
    }
  }
})

function openAddModal() {
  editingHero.value = null
  isModalOpen.value = true
}

function openEditModal(hero) {
  editingHero.value = { ...hero }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingHero.value = null
}

async function handleSubmit() {
  if (editingHero.value) {
    await heroStore.updateHero(editingHero.value.id, form.value)
  } else {
    await heroStore.addHero(form.value)
  }
  closeModal()
}

async function handleDelete(hero) {
  if (confirm(`Apakah Anda yakin ingin menghapus hero "${hero.title}"?`)) {
    await heroStore.deleteHero(hero.id)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark-blue">Hero Section</h1>
      <button
        @click="openAddModal"
        class="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
      >
        + Tambah Hero
      </button>
    </div>

    <div v-if="heroStore.isLoading" class="mt-6 text-center text-gray-500">Loading...</div>
    <div v-else-if="heroStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ heroStore.error }}
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Gambar</th>
            <th scope="col" class="px-6 py-3">Judul</th>
            <th scope="col" class="px-6 py-3">Tanggal</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="hero in heroStore.heroes"
            :key="hero.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <img
                :src="hero.imageUrl"
                :alt="hero.title"
                class="w-24 h-12 object-cover rounded-md"
              />
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ hero.title }}
            </th>
            <td class="px-6 py-4">{{ formatDate(hero.date) }}</td>
            <td class="px-6 py-4 text-right">
              <button
                @click="openEditModal(hero)"
                class="font-medium text-brand-accent-gold hover:underline mr-4"
              >
                Edit
              </button>
              <button @click="handleDelete(hero)" class="font-medium text-red-600 hover:underline">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal Form -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="closeModal"
  ></div>
  <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-brand-dark-blue mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <ImageUploader label="Gambar Hero" v-model="form.imageUrl" />
        <div>
          <label class="block text-sm font-medium">Judul</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="mt-1 w-full rounded-md border-gray-300"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Deskripsi</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="mt-1 w-full rounded-md border-gray-300"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium">Tanggal Tampil</label>
          <input
            v-model="form.date"
            type="date"
            required
            class="mt-1 w-full rounded-md border-gray-300"
          />
        </div>
        <div class="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-6 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
