// src/stores/projectStore.js
import projectService from '@/services/projectService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
    const projects = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchProjects() {
        isLoading.value = true;
        error.value = null;
        try {
            projects.value = await projectService.getProjects();
        } catch (e) {
            error.value = 'Gagal mengambil data proyek.';
        } finally {
            isLoading.value = false;
        }
    }

    async function addProject(projectData) {
        const newProject = await projectService.createProject(projectData);
        projects.value.unshift(newProject);
    }

    async function updateProject(projectId, updatedData) {
        const updatedProject = await projectService.updateProject(projectId, updatedData);
        const index = projects.value.findIndex(p => p.id === projectId);
        if (index !== -1) projects.value[index] = updatedProject;
    }

    async function deleteProject(projectId) {
        await projectService.deleteProject(projectId);
        projects.value = projects.value.filter(p => p.id !== projectId);
    }

    return { projects, isLoading, error, fetchProjects, addProject, updateProject, deleteProject };
});
