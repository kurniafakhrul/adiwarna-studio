// src/services/projectService.js
let projectsDB = [
    {
        id: 'PROJ-001', title: 'Playful Threads Kidswear', client: 'Playful Threads Inc.', date: '2025-06-25',
        location: 'Studio A (White Cyc)', coverImageUrl: 'https://placehold.co/800x600/3498db/FFFFFF?text=Sampul',
        descriptionImageUrl: 'https://placehold.co/800x600/2ecc71/FFFFFF?text=Deskripsi',
        momentImageUrls: [
            'https://placehold.co/400x400/e74c3c/FFFFFF?text=Momen+1', 'https://placehold.co/400x400/9b59b6/FFFFFF?text=Momen+2',
            'https://placehold.co/400x400/f1c40f/FFFFFF?text=Momen+3', 'https://placehold.co/400x400/1abc9c/FFFFFF?text=Momen+4',
        ],
        description: 'Sesi foto katalog untuk koleksi musim panas pakaian anak-anak.',
        testimonialImageUrl: 'https://placehold.co/100x100/34495e/FFFFFF?text=Klien',
        testimonialText: 'Prosesnya sangat menyenangkan dan hasilnya luar biasa!'
    },
];

const projectService = {
    async getProjects() { await new Promise(r => setTimeout(r, 400)); return [...projectsDB]; },
    async getProjectById(id) { await new Promise(r => setTimeout(r, 200)); return projectsDB.find(p => p.id === id); },
    async createProject(projectData) { await new Promise(r => setTimeout(r, 300)); const newProject = { id: `PROJ-${Date.now()}`, ...projectData }; projectsDB.unshift(newProject); return newProject; },
    async updateProject(projectId, updatedData) { await new Promise(r => setTimeout(r, 300)); const index = projectsDB.findIndex(p => p.id === projectId); if (index !== -1) { projectsDB[index] = { ...projectsDB[index], ...updatedData }; return projectsDB[index]; } throw new Error("Project not found"); },
    async deleteProject(projectId) { await new Promise(r => setTimeout(r, 300)); projectsDB = projectsDB.filter(p => p.id !== projectId); return { success: true }; }
};

export default projectService;