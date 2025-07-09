// src/services/heroService.js
let heroesDB = [
  {
    id: 'HERO-001',
    title: 'Abadikan Momen Sempurna Anda',
    description:
      'Studio kami menyediakan ruang dan peralatan profesional untuk mewujudkan visi kreatif Anda. Pesan sesi Anda sekarang.',
    date: '2025-07-10',
    imageUrl: 'https://placehold.co/1920x1080/1C274C/FFFFFF?text=Hero+Image+1',
  },
  {
    id: 'HERO-002',
    title: 'Diskon 20% untuk Sesi Pre-wedding',
    description:
      'Promo terbatas! Dapatkan potongan harga spesial untuk semua paket pre-wedding selama bulan Agustus.',
    date: '2025-07-08',
    imageUrl: 'https://placehold.co/1920x1080/CFAA3B/FFFFFF?text=Promo+Prewed',
  },
]

const heroService = {
  async getHeroes() {
    await new Promise((r) => setTimeout(r, 400))
    return [...heroesDB]
  },
  async createHero(heroData) {
    await new Promise((r) => setTimeout(r, 300))
    const newHero = { id: `HERO-${Date.now()}`, ...heroData }
    heroesDB.unshift(newHero)
    return newHero
  },
  async updateHero(heroId, updatedData) {
    await new Promise((r) => setTimeout(r, 300))
    const index = heroesDB.findIndex((h) => h.id === heroId)
    if (index !== -1) {
      heroesDB[index] = { ...heroesDB[index], ...updatedData }
      return heroesDB[index]
    }
    throw new Error('Hero not found')
  },
  async deleteHero(heroId) {
    await new Promise((r) => setTimeout(r, 300))
    heroesDB = heroesDB.filter((h) => h.id !== heroId)
    return { success: true }
  },
}

export default heroService
