<!-- src/components/ui/ImageUploader.vue -->
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
});
const emit = defineEmits(['update:modelValue']);

const imagePreview = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  imagePreview.value = newVal;
});

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      emit('update:modelValue', e.target.result);
    };
    reader.readAsDataURL(file);
  }
}
</script>
<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div class="space-y-1 text-center">
        <img v-if="imagePreview" :src="imagePreview" class="mx-auto h-24 w-auto rounded-md">
        <svg v-else class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="flex text-sm text-gray-600">
          <label class="relative cursor-pointer bg-white rounded-md font-medium text-brand-dark-blue hover:text-blue-700">
            <span>Pilih File</span>
            <input type="file" @change="handleFileChange" accept="image/*" class="sr-only">
          </label>
          <p class="pl-1">atau drag and drop</p>
        </div>
      </div>
    </div>
  </div>
</template>
