// src/services/projectService.js

// Database proyek (mock)
export let projectsDB = [
  {
    id: 'PROJ-001',
    title: 'Playful Threads Kidswear',
    client: 'Playful Threads Inc.',
    date: '2025-06-25',
    location: 'Studio A (White Cyc)',
    coverImageUrl: 'https://placehold.co/800x600/3498db/FFFFFF?text=Sampul',
    descriptionImageUrl: 'https://placehold.co/800x600/2ecc71/FFFFFF?text=Deskripsi',
    momentImageUrls: [
      'https://placehold.co/400x400/e74c3c/FFFFFF?text=Momen+1',
      'https://placehold.co/400x400/9b59b6/FFFFFF?text=Momen+2',
      'https://placehold.co/400x400/f1c40f/FFFFFF?text=Momen+3',
      'https://placehold.co/400x400/1abc9c/FFFFFF?text=Momen+4',
    ],
    description: 'Sesi foto katalog untuk koleksi musim panas pakaian anak-anak.',
    testimonialImageUrl: 'https://placehold.co/100x100/34495e/FFFFFF?text=Klien',
    testimonialText: 'Prosesnya sangat menyenangkan dan hasilnya luar biasa!',
  },
]

// Service object untuk simulasi operasi proyek
const projectService = {
  /**
   * Ambil semua proyek
   */
  async getProjects() {
    await new Promise((r) => setTimeout(r, 400))
    return [...projectsDB]
  },

  /**
   * Ambil detail proyek berdasarkan ID
   */
  async getProjectById(id) {
    await new Promise((r) => setTimeout(r, 200))
    const found = projectsDB.find((p) => p.id === id)
    if (!found) throw new Error('Project not found')
    return found
  },

  /**
   * Tambahkan proyek baru
   */
  async createProject(projectData) {
    await new Promise((r) => setTimeout(r, 300))
    const newProject = {
      id: `PROJ-${Date.now()}`,
      ...projectData,
    }
    projectsDB.unshift(newProject)
    return newProject
  },

  /**
   * Update proyek berdasarkan ID
   */
  async updateProject(projectId, updatedData) {
    await new Promise((r) => setTimeout(r, 300))
    const index = projectsDB.findIndex((p) => p.id === projectId)
    if (index !== -1) {
      projectsDB[index] = { ...projectsDB[index], ...updatedData }
      return projectsDB[index]
    }
    throw new Error('Project not found')
  },

  /**
   * Hapus proyek berdasarkan ID
   */
  async deleteProject(projectId) {
    await new Promise((r) => setTimeout(r, 300))
    const index = projectsDB.findIndex((p) => p.id === projectId)
    if (index !== -1) {
      projectsDB.splice(index, 1)
      return { success: true }
    }
    throw new Error('Project not found')
  },
}

export default projectService
