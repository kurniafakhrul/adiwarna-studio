// src/stores/heroStore.js
import heroService from '@/services/heroService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeroStore = defineStore('hero', () => {
  const heroes = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchHeroes() {
    isLoading.value = true
    error.value = null
    try {
      heroes.value = await heroService.getHeroes()
    } catch (e) {
      error.value = 'Gagal mengambil data hero.'
    } finally {
      isLoading.value = false
    }
  }

  async function addHero(heroData) {
    const newHero = await heroService.createHero(heroData)
    heroes.value.unshift(newHero)
  }

  async function updateHero(heroId, updatedData) {
    const updatedHero = await heroService.updateHero(heroId, updatedData)
    const index = heroes.value.findIndex((h) => h.id === heroId)
    if (index !== -1) heroes.value[index] = updatedHero
  }

  async function deleteHero(heroId) {
    await heroService.deleteHero(heroId)
    heroes.value = heroes.value.filter((h) => h.id !== heroId)
  }

  return { heroes, isLoading, error, fetchHeroes, addHero, updateHero, deleteHero }
})
