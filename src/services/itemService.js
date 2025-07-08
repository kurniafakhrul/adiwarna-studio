// src/services/itemService.js
let itemsDB = [
    { 
        id: 'ITEM-01', name: 'Kacamata Hitam', imageUrl: 'https://placehold.co/100x100/000000/FFFFFF?text=Kacamata',
        isFree: true, price: 0, 
        trackQuantity: false, // <-- Field baru: tidak perlu lacak stok
        quantity: 0 
    },
    { 
        id: 'ITEM-04', name: 'Baju Kostum Sekolah', imageUrl: 'https://placehold.co/100x100/2a9d8f/FFFFFF?text=Kostum',
        isFree: false, price: 15000, 
        trackQuantity: true, // <-- Field baru: lacak stok
        quantity: 3 // <-- Jumlah stok yang tersedia
    },
    { 
        id: 'ITEM-05', name: 'Cetak Foto 4R', imageUrl: 'https://placehold.co/100x100/264653/FFFFFF?text=Cetak',
        isFree: false, price: 2500, 
        trackQuantity: false, // Ini adalah layanan, bukan barang fisik
        quantity: 0 
    },
];

const itemService = {
    async getItems() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...itemsDB];
    },
    async createItem(newItemData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newItem = { id: `ITEM-${Date.now()}`, ...newItemData };
        itemsDB.push(newItem);
        return newItem;
    },
    async updateItem(itemId, updatedData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = itemsDB.findIndex(p => p.id === itemId);
        if (index !== -1) {
            itemsDB[index] = { ...itemsDB[index], ...updatedData };
            return itemsDB[index];
        }
        throw new Error("Item not found");
    },
    async deleteItem(itemId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        itemsDB = itemsDB.filter(p => p.id !== itemId);
        return { success: true };
    }
};

export default itemService;
