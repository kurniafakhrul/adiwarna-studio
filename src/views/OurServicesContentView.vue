<!-- src/views/OurServicesContentView.vue -->
<script setup>
import ImageUploader from '@/components/ui/ImageUploader.vue'
import { useOurServicesContentStore } from '@/stores/ourServicesContentStore'
import { computed, onMounted, ref, watch } from 'vue'

const store = useOurServicesContentStore()

const isModalOpen = ref(false)
const editingContent = ref(null)
const form = ref({})

const modalTitle = computed(() =>
  editingContent.value ? 'Edit Konten Layanan' : 'Tambah Konten Layanan',
)

onMounted(() => {
  store.fetchContent()
})

watch(editingContent, (newData) => {
  if (newData) {
    form.value = JSON.parse(JSON.stringify(newData)) // Deep copy
  } else {
    form.value = {
      title: '',
      description: '',
      notes: '',
      order: store.contents.length + 1,
      imageUrls: [null, null, null, null],
    }
  }
})

function openAddModal() {
  editingContent.value = null
  isModalOpen.value = true
}

function openEditModal(content) {
  editingContent.value = content
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingContent.value = null
}

async function handleSubmit() {
  if (editingContent.value) {
    await store.updateContent(editingContent.value.id, form.value)
  } else {
    await store.addContent(form.value)
  }
  closeModal()
}

async function handleDelete(content) {
  if (confirm(`Apakah Anda yakin ingin menghapus konten "${content.title}"?`)) {
    await store.deleteContent(content.id)
  }
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-brand-dark-blue">Konten "Our Services"</h1>
      <button
        @click="openAddModal"
        class="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90"
      >
        + Tambah Konten
      </button>
    </div>

    <div v-if="store.isLoading" class="mt-6 text-center text-gray-500">Loading...</div>
    <div v-else-if="store.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
      {{ store.error }}
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Urutan</th>
            <th scope="col" class="px-6 py-3">Gambar Utama</th>
            <th scope="col" class="px-6 py-3">Judul</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="content in store.contents"
            :key="content.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4 font-bold">{{ content.order }}</td>
            <td class="px-6 py-4">
              <img
                :src="content.imageUrls[0]"
                :alt="content.title"
                class="w-24 h-16 object-cover rounded-md bg-gray-100"
              />
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ content.title }}
            </th>
            <td class="px-6 py-4 text-right">
              <button
                @click="openEditModal(content)"
                class="font-medium text-brand-accent-gold hover:underline mr-4"
              >
                Edit
              </button>
              <button
                @click="handleDelete(content)"
                class="font-medium text-red-600 hover:underline"
              >
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
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
      <h2 class="text-2xl font-bold text-brand-dark-blue mb-6">{{ modalTitle }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label class="block text-sm font-medium">Urutan Tampil</label>
            <input
              v-model.number="form.order"
              type="number"
              required
              class="mt-1 w-full rounded-md border-gray-300"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">Deskripsi Singkat</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="mt-1 w-full rounded-md border-gray-300"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium">Catatan Internal (Tidak Tampil)</label>
          <textarea
            v-model="form.notes"
            rows="2"
            class="mt-1 w-full rounded-md border-gray-300"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium">Galeri Gambar (4 Foto)</label>
          <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImageUploader v-model="form.imageUrls[0]" />
            <ImageUploader v-model="form.imageUrls[1]" />
            <ImageUploader v-model="form.imageUrls[2]" />
            <ImageUploader v-model="form.imageUrls[3]" />
          </div>
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
