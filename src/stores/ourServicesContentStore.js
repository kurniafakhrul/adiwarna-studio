// src/stores/ourServicesContentStore.js
import ourServicesContentService from '@/services/ourServicesContentService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOurServicesContentStore = defineStore('ourServicesContent', () => {
  const contents = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchContent() {
    isLoading.value = true
    error.value = null
    try {
      contents.value = await ourServicesContentService.getContent()
    } catch (e) {
      error.value = 'Gagal mengambil data konten Our Services.'
    } finally {
      isLoading.value = false
    }
  }

  async function addContent(data) {
    await ourServicesContentService.createContent(data)
    await fetchContent() // Fetch ulang untuk mendapatkan data yang terurut
  }

  async function updateContent(id, data) {
    await ourServicesContentService.updateContent(id, data)
    await fetchContent()
  }

  async function deleteContent(id) {
    await ourServicesContentService.deleteContent(id)
    contents.value = contents.value.filter((h) => h.id !== id)
  }

  return { contents, isLoading, error, fetchContent, addContent, updateContent, deleteContent }
})
