// src/services/itemService.js
let attributesDB = [
    { id: 'ATTR-01', name: 'Background Foto', imageUrl: 'https://placehold.co/100x100/A9A9A9/FFFFFF?text=BG' },
    { id: 'ATTR-02', name: 'Kostum', imageUrl: 'https://placehold.co/100x100/2a9d8f/FFFFFF?text=Kostum' },
    { id: 'ATTR-03', name: 'Aksesoris', imageUrl: 'https://placehold.co/100x100/e76f51/FFFFFF?text=Aksesoris' },
];

let itemsDB = [
    { 
        id: 'ITEM-01', attributeId: 'ATTR-01', name: 'Kain Biru', 
        imageUrl: 'https://placehold.co/100x100/3a86ff/FFFFFF?text=Biru',
        trackQuantity: false, quantity: 0, isFree: true, price: 0 
    },
    { 
        id: 'ITEM-02', attributeId: 'ATTR-01', name: 'Kain Merah', 
        imageUrl: 'https://placehold.co/100x100/d62828/FFFFFF?text=Merah',
        trackQuantity: false, quantity: 0, isFree: true, price: 0 
    },
    { 
        id: 'ITEM-03', attributeId: 'ATTR-02', name: 'Baju Sekolah', 
        imageUrl: 'https://placehold.co/100x100/2a9d8f/FFFFFF?text=Sekolah',
        trackQuantity: true, quantity: 3, isFree: false, price: 15000 
    },
];

const itemService = {
    // --- Attribute Functions ---
    async getAttributes() {
        await new Promise(r => setTimeout(r, 200));
        return [...attributesDB];
    },
    async createAttribute(attrData) {
        await new Promise(r => setTimeout(r, 200));
        const newAttr = { id: `ATTR-${Date.now()}`, ...attrData };
        attributesDB.push(newAttr);
        return newAttr;
    },
    async updateAttribute(attrId, attrData) {
        await new Promise(r => setTimeout(r, 200));
        const index = attributesDB.findIndex(c => c.id === attrId);
        if (index !== -1) {
            attributesDB[index] = { ...attributesDB[index], ...attrData };
            return attributesDB[index];
        }
        throw new Error("Attribute not found");
    },
    async deleteAttribute(attrId) {
        await new Promise(r => setTimeout(r, 200));
        // Hapus juga semua item yang terkait dengan atribut ini
        itemsDB = itemsDB.filter(i => i.attributeId !== attrId);
        attributesDB = attributesDB.filter(c => c.id !== attrId);
        return { success: true };
    },

    // --- Item Functions ---
    async getItems() {
        await new Promise(r => setTimeout(r, 300));
        return [...itemsDB];
    },
    async createItem(newItemData) {
        await new Promise(r => setTimeout(r, 300));
        const newItem = { id: `ITEM-${Date.now()}`, ...newItemData };
        itemsDB.push(newItem);
        return newItem;
    },
    async updateItem(itemId, updatedData) {
        await new Promise(r => setTimeout(r, 300));
        const index = itemsDB.findIndex(p => p.id === itemId);
        if (index !== -1) {
            itemsDB[index] = { ...itemsDB[index], ...updatedData };
            return itemsDB[index];
        }
        throw new Error("Item not found");
    },
    async deleteItem(itemId) {
        await new Promise(r => setTimeout(r, 300));
        itemsDB = itemsDB.filter(p => p.id !== itemId);
        return { success: true };
    }
};

export default itemService;
