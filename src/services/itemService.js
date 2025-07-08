// src/services/itemService.js
let itemsDB = [
    { id: 'ITEM-01', name: 'Kacamata Hitam', isFree: true, price: 0, imageUrl: 'https://placehold.co/100x100/000000/FFFFFF?text=Kacamata' },
    { id: 'ITEM-02', name: 'Topi Pantai', isFree: true, price: 0, imageUrl: 'https://placehold.co/100x100/f4a261/FFFFFF?text=Topi' },
    { id: 'ITEM-03', name: 'Bando Lucu', isFree: true, price: 0, imageUrl: 'https://placehold.co/100x100/e76f51/FFFFFF?text=Bando' },
    { id: 'ITEM-04', name: 'Baju Kostum Sekolah', isFree: false, price: 15000, imageUrl: 'https://placehold.co/100x100/2a9d8f/FFFFFF?text=Kostum' },
    { id: 'ITEM-05', name: 'Cetak Foto 4R (per lembar)', isFree: false, price: 2500, imageUrl: 'https://placehold.co/100x100/264653/FFFFFF?text=Cetak' },
];

const itemService = {
    async getItems() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...itemsDB];
    },
    async createItem(newItemData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newItem = { id: `ITEM-${Date.now()}`, ...newItemData };
        if (newItem.isFree) {
            newItem.price = 0;
        }
        itemsDB.push(newItem);
        return newItem;
    },
    async updateItem(itemId, updatedData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = itemsDB.findIndex(p => p.id === itemId);
        if (index !== -1) {
            itemsDB[index] = { ...itemsDB[index], ...updatedData };
            if (itemsDB[index].isFree) {
                itemsDB[index].price = 0;
            }
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
