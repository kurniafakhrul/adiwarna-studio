<!-- src/views/ProjectsView.vue -->
<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const projectStore = useProjectStore();
const router = useRouter();

onMounted(() => {
    projectStore.fetchProjects();
});

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
</script>
<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-brand-dark-blue">Our Projects</h1>
            <router-link to="/projects/add" class="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90">
                + Project
            </router-link>
        </div>

        <div v-if="projectStore.isLoading" class="mt-6 text-center text-gray-500">Loading projects...</div>
        <div v-else-if="projectStore.error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{{ projectStore.error }}</div>

        <div v-else class="bg-white p-6 rounded-lg shadow-md">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Project</th>
                        <th scope="col" class="px-6 py-3">Klien</th>
                        <th scope="col" class="px-6 py-3">Tanggal</th>
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="project in projectStore.projects" :key="project.id" class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ project.title }}</th>
                        <td class="px-6 py-4">{{ project.client }}</td>
                        <td class="px-6 py-4">{{ formatDate(project.date) }}</td>
                        <td class="px-6 py-4 text-right">
                            <router-link :to="`/projects/edit/${project.id}`" class="font-medium text-brand-accent-gold hover:underline">Edit</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>