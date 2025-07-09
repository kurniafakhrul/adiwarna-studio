// src/services/packageService.js
export let packagesDB = [
  {
    id: 'PKG-001',
    category: 'Self Foto',
    name: 'Self Foto Couple',
    locationType: 'Studio 1', // <-- Field baru
    basePrice: 30000,
    duration: 15,
    notes: 'Sesi foto standar untuk 2 orang.',
    imageUrls: ['https://placehold.co/600x400/cfaa3b/FFFFFF?text=Couple+1'],
    attributeIds: ['ATTR-01', 'ATTR-03'],
  },
  {
    id: 'PKG-002',
    category: 'Pre-wedding',
    name: 'Prewed Outdoor',
    locationType: 'Outdoor', // <-- Field baru
    basePrice: 200000,
    duration: 60,
    notes: 'Sesi foto pre-wedding dengan kostum.',
    imageUrls: ['https://placehold.co/600x400/2a9d8f/FFFFFF?text=Prewed'],
    attributeIds: ['ATTR-01', 'ATTR-02'],
  },
]

const packageService = {
  async getPackages() {
    await new Promise((r) => setTimeout(r, 300))
    return [...packagesDB]
  },
  async createPackage(newPackageData) {
    await new Promise((r) => setTimeout(r, 300))
    const newPackage = { id: `PKG-${Date.now()}`, ...newPackageData }
    packagesDB.push(newPackage)
    return newPackage
  },
  async updatePackage(packageId, updatedData) {
    await new Promise((r) => setTimeout(r, 300))
    const index = packagesDB.findIndex((p) => p.id === packageId)
    if (index !== -1) {
      packagesDB[index] = { ...packagesDB[index], ...updatedData }
      return packagesDB[index]
    }
    throw new Error('Package not found')
  },
  async deletePackage(packageId) {
    await new Promise((r) => setTimeout(r, 300))
    packagesDB = packagesDB.filter((p) => p.id !== packageId)
    return { success: true }
  },
}

export default packageService
