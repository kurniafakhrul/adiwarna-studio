// src/stores/itemStore.js
import itemService from '@/services/itemService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('item', () => {
  const attributes = ref([])
  const items = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    isLoading.value = true
    error.value = null
    try {
      const [attrData, itemData] = await Promise.all([
        itemService.getAttributes(),
        itemService.getItems(),
      ])
      attributes.value = attrData
      items.value = itemData
    } catch (e) {
      error.value = 'Gagal mengambil data.'
    } finally {
      isLoading.value = false
    }
  }

  // --- Item Actions ---
  async function addItem(newItemData) {
    const newItem = await itemService.createItem(newItemData)
    items.value.push(newItem)
  }
  async function updateItem(itemId, updatedData) {
    const updatedItem = await itemService.updateItem(itemId, updatedData)
    const index = items.value.findIndex((p) => p.id === itemId)
    if (index !== -1) items.value[index] = updatedItem
  }
  async function deleteItem(itemId) {
    await itemService.deleteItem(itemId)
    items.value = items.value.filter((p) => p.id !== itemId)
  }

  // --- Attribute Actions ---
  async function addAttribute(attrData) {
    const newAttr = await itemService.createAttribute(attrData)
    attributes.value.push(newAttr)
  }
  async function updateAttribute(attrId, attrData) {
    const updatedAttr = await itemService.updateAttribute(attrId, attrData)
    const index = attributes.value.findIndex((c) => c.id === attrId)
    if (index !== -1) attributes.value[index] = updatedAttr
  }
  async function deleteAttribute(attrId) {
    await itemService.deleteAttribute(attrId)
    attributes.value = attributes.value.filter((c) => c.id !== attrId)
    items.value = items.value.filter((i) => i.attributeId !== attrId)
  }

  return {
    attributes,
    items,
    isLoading,
    error,
    fetchAll,
    addItem,
    updateItem,
    deleteItem,
    addAttribute,
    updateAttribute,
    deleteAttribute,
  }
})
