<script setup>
import ImageUploader from '@/components/ui/ImageUploader.vue';
import { useProjectStore } from '@/stores/projectStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();

const form = ref({
    title: '', client: '', date: '', location: '',
    coverImageUrl: null, descriptionImageUrl: null,
    momentImageUrls: [null, null, null, null],
    description: '',
    testimonialImageUrl: null, testimonialText: ''
});

const isEditMode = computed(() => !!route.params.id);

onMounted(async () => {
    if (isEditMode.value) {
        if (projectStore.projects.length === 0) {
            await projectStore.fetchProjects();
        }
        const projectToEdit = projectStore.projects.find(p => p.id === route.params.id);
        if (projectToEdit) {
            form.value = { ...projectToEdit };
            if (!form.value.momentImageUrls) form.value.momentImageUrls = [];
            while(form.value.momentImageUrls.length < 4) {
                form.value.momentImageUrls.push(null);
            }
        }
    }
});

async function handleSubmit() {
    if (isEditMode.value) {
        await projectStore.updateProject(route.params.id, form.value);
    } else {
        await projectStore.addProject(form.value);
    }
    router.push('/projects');
}

async function handleDelete() {
    if (isEditMode.value && confirm(`Apakah Anda yakin ingin menghapus proyek "${form.value.title}"?`)) {
        await projectStore.deleteProject(route.params.id);
        router.push('/projects');
    }
}
</script>
<template>
    <div>
        <div class="flex items-center mb-6">
            <button @click="router.push('/projects')" class="mr-4 p-2 bg-brand-light-blue text-brand-dark-blue rounded-lg hover:bg-opacity-70 transition">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
</button>
            <div>
                <h1 class="text-3xl font-bold text-brand-dark-blue">{{ isEditMode ? 'Ubah Project' : 'Tambah Project' }}</h1>
                <p class="text-sm text-gray-500">Website / Our Projects / {{ isEditMode ? 'Edit' : 'Add' }}</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 bg-white rounded-lg shadow-md space-y-8">
            
            <!-- BAGIAN ATAS: FOTO SAMPUL & INFO UTAMA -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ImageUploader label="Foto Sampul" v-model="form.coverImageUrl" />
                <div class="space-y-4">
                    <div>
                       <label class="block text-sm font-medium">Judul Project</label>
                       <input v-model="form.title" type="text" required class="mt-1 w-full rounded-md border-gray-300">
                    </div>
                    <div>
                       <label class="block text-sm font-medium">Klien</label>
                       <input v-model="form.client" type="text" required class="mt-1 w-full rounded-md border-gray-300">
                    </div>
                    <div>
                       <label class="block text-sm font-medium">Lokasi</label>
                       <input v-model="form.location" type="text" class="mt-1 w-full rounded-md border-gray-300">
                    </div>
                    <div>
                       <label class="block text-sm font-medium">Tanggal</label>
                       <input v-model="form.date" type="date" required class="mt-1 w-full rounded-md border-gray-300">
                    </div>
                </div>
            </div>

            <!-- BAGIAN TENGAH: DESKRIPSI & FOTO DESKRIPSI -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                 <div>
                    <label class="block text-sm font-medium">Deskripsi</label>
                    <textarea v-model="form.description" rows="12" class="mt-1 w-full rounded-md border-gray-300"></textarea>
                </div>
                <ImageUploader label="Foto Deskripsi" v-model="form.descriptionImageUrl" />
            </div>

            <!-- BAGIAN GALERI MOMEN -->
            <div>
                <label class="block text-sm font-medium">Momen</label>
                <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ImageUploader v-model="form.momentImageUrls[0]" />
                    <ImageUploader v-model="form.momentImageUrls[1]" />
                    <ImageUploader v-model="form.momentImageUrls[2]" />
                    <ImageUploader v-model="form.momentImageUrls[3]" />
                </div>
            </div>

            <!-- BAGIAN TESTIMONI -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                    <label class="block text-sm font-medium">Kata Mereka</label>
                    <textarea v-model="form.testimonialText" rows="12" class="mt-1 w-full rounded-md border-gray-300"></textarea>
                </div>
                <ImageUploader label="Foto Kata Mereka" v-model="form.testimonialImageUrl" />
            </div>

            <!-- BAGIAN TOMBOL AKSI -->
            <div class="flex justify-between items-center pt-6 border-t">
                <div>
                    <button v-if="isEditMode" @click="handleDelete" type="button" class="px-6 py-2 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700">
                        Hapus Project
                    </button>
                </div>
                <button type="submit" class="px-6 py-2 text-sm font-bold text-white bg-brand-dark-blue rounded-md hover:opacity-90">
                    {{ isEditMode ? 'Simpan Perubahan' : 'Simpan Project' }}
                </button>
            </div>
        </form>
    </div>
</template>
