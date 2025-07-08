// src/services/selfFotoService.js
let selfFotoPackagesDB = [
    {
        id: 'SF-001',
        name: 'Self Foto Couple',
        basePrice: 30000,
        baseCapacity: 2,
        pricePerExtraPerson: 0,
        pricePerExtraMinute: 5000,
        duration: 15,
        includedAddonIds: ['ITEM-01', 'ITEM-02', 'ITEM-03'], 
        optionalAddonIds: ['ITEM-04'], 
        notes: 'Soft file via Google Drive (Max 1 Bulan).',
        imageUrls: [ // <-- Field baru untuk galeri gambar
            'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Couple+1',
            'https://placehold.co/600x400/1a1a1a/FFFFFF?text=Couple+2',
        ]
    },
    {
        id: 'SF-002',
        name: 'Self Foto Grup',
        basePrice: 40000,
        baseCapacity: 4,
        pricePerExtraPerson: 10000,
        pricePerExtraMinute: 5000,
        duration: 15,
        includedAddonIds: ['ITEM-01', 'ITEM-02', 'ITEM-03'], 
        optionalAddonIds: ['ITEM-04'], 
        notes: 'Soft file via Google Drive (Max 1 Bulan).',
        imageUrls: [
            'https://placehold.co/600x400/cfaa3b/FFFFFF?text=Grup+1'
        ]
    },
];

const selfFotoService = {
    async getPackages() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...selfFotoPackagesDB];
    },
    async createPackage(newPackageData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newPackage = { id: `SF-${Date.now()}`, ...newPackageData };
        selfFotoPackagesDB.push(newPackage);
        return newPackage;
    },
    async updatePackage(packageId, updatedData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = selfFotoPackagesDB.findIndex(p => p.id === packageId);
        if (index !== -1) {
            selfFotoPackagesDB[index] = { ...selfFotoPackagesDB[index], ...updatedData };
            return selfFotoPackagesDB[index];
        }
        throw new Error("Package not found");
    },
    async deletePackage(packageId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        selfFotoPackagesDB = selfFotoPackagesDB.filter(p => p.id !== packageId);
        return { success: true };
    }
};

export default selfFotoService;
