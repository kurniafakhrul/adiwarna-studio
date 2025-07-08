// src/services/packageService.js
let studiosDB = [
    { id: 'STUDIO-A', name: 'Studio A (White Cyc)' },
    { id: 'STUDIO-B', name: 'Studio B (Thematic)' },
];

let packagesDB = [
    { 
        id: 'PKG-001', name: 'Self Foto Couple', category: 'Self Foto', price: 30000, duration: 15, 
        studio: 'STUDIO-A', // ID studio yang digunakan
        includedAddons: 'Kacamata, Topi, Bando', // Add-ons gratis sebagai string
        optionalAddons: [ // Add-ons berbayar sebagai array objek
            { name: 'Kostum Sekolah', price: 15000 },
            { name: 'Kostum Vintage', price: 20000 }
        ],
        description: 'Sesi foto untuk 2 orang.' 
    },
    { 
        id: 'PKG-004', name: 'Prewed Outdoor', category: 'Pre-wedding', price: 200000, duration: 120, 
        studio: null, // Null menandakan outdoor
        includedAddons: 'Asisten lighting',
        optionalAddons: [],
        description: 'Sesi foto pre-wedding di lokasi outdoor pilihan klien.' 
    },
];

const packageService = {
  async getPackages() {
    console.log("Fetching packages data (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...packagesDB];
  },

  // Fungsi baru untuk mengambil data studio
  async getStudios() {
    console.log("Fetching studios data (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...studiosDB];
  },

  async createPackage(newPackageData) {
    console.log("Creating package (simulation)...");
    await new Promise(resolve => setTimeout(resolve, 300));
    const newPackage = { id: `PKG-${Date.now()}`, ...newPackageData };
    packagesDB.push(newPackage);
    return newPackage;
  },

  async updatePackage(packageId, updatedData) {
    console.log(`Updating package ${packageId} (simulation)...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = packagesDB.findIndex(p => p.id === packageId);
    if (index !== -1) {
      packagesDB[index] = { ...packagesDB[index], ...updatedData };
      return packagesDB[index];
    }
    throw new Error("Package not found");
  },

  async deletePackage(packageId) {
    console.log(`Deleting package ${packageId} (simulation)...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    packagesDB = packagesDB.filter(p => p.id !== packageId);
    return { success: true };
  }
};

export default packageService;