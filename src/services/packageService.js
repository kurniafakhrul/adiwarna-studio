// src/services/packageService.js
let packagesDB = [
    {
        id: 'SF-001',
        category: 'Self Foto', // <-- Field baru
        name: 'Self Foto Couple',
        basePrice: 30000,
        baseCapacity: 2,
        pricePerExtraPerson: 0,
        pricePerExtraMinute: 5000,
        duration: 15,
        includedAddonIds: ['ITEM-01', 'ITEM-02'],
        optionalAddonIds: ['ITEM-04'],
        notes: 'Soft file via Google Drive.',
        imageUrls: ['https://placehold.co/600x400/cfaa3b/FFFFFF?text=Couple+1']
    },
    {
        id: 'PF-001',
        category: 'Pas Foto', // <-- Field baru
        name: 'Pas Foto Pra Nikah',
        basePrice: 25000,
        baseCapacity: 2,
        pricePerExtraPerson: 0,
        pricePerExtraMinute: 0,
        duration: 10,
        includedAddonIds: ['ITEM-05'],
        optionalAddonIds: [],
        notes: 'Include cetak 3x4 (9 foto).',
        imageUrls: ['https://placehold.co/600x400/2a9d8f/FFFFFF?text=Pas+Foto']
    }
];

const packageService = {
    // ... (Semua fungsi get, create, update, delete tetap sama)
    async getPackages() { /* ... */ },
    async createPackage(newPackageData) { /* ... */ },
    async updatePackage(packageId, updatedData) { /* ... */ },
    async deletePackage(packageId) { /* ... */ }
};

export default packageService;