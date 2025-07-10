// src/services/ourServicesContentService.js
let contentDB = [
  {
    id: 'OSC-01',
    title: 'Wedding Photography',
    description:
      'Abadikan momen sakral pernikahan Anda dengan sentuhan sinematik dari tim profesional kami.',
    notes: 'Paket ini mencakup sesi foto pre-wedding dan liputan hari H.',
    order: 1,
    imageUrls: [
      'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Wedding+1',
      'https://placehold.co/600x400/1C274C/FFFFFF?text=Wedding+2',
      'https://placehold.co/600x400/ECEFFD/000000?text=Wedding+3',
      'https://placehold.co/600x400/F4F6FF/000000?text=Wedding+4',
    ],
  },
  {
    id: 'OSC-02',
    title: 'Self-Photo Studio',
    description:
      'Ekspresikan diri Anda tanpa batas di studio pribadi kami. Ciptakan kenangan seru bersama teman dan pasangan.',
    notes: 'Tersedia berbagai properti dan kostum unik.',
    order: 2,
    imageUrls: [
      'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Self-Photo+1',
      'https://placehold.co/600x400/1C274C/FFFFFF?text=Self-Photo+2',
      null,
      null,
    ],
  },
]

const ourServicesContentService = {
  async getContent() {
    await new Promise((r) => setTimeout(r, 400))
    return [...contentDB].sort((a, b) => a.order - b.order)
  },
  async createContent(data) {
    await new Promise((r) => setTimeout(r, 300))
    const newContent = { id: `OSC-${Date.now()}`, ...data }
    contentDB.push(newContent)
    return newContent
  },
  async updateContent(id, data) {
    await new Promise((r) => setTimeout(r, 300))
    const index = contentDB.findIndex((h) => h.id === id)
    if (index !== -1) {
      contentDB[index] = { ...contentDB[index], ...data }
      return contentDB[index]
    }
    throw new Error('Content not found')
  },
  async deleteContent(id) {
    await new Promise((r) => setTimeout(r, 300))
    contentDB = contentDB.filter((h) => h.id !== id)
    return { success: true }
  },
}

export default ourServicesContentService
