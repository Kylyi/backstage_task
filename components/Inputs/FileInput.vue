<script setup lang="ts">
const emits = defineEmits<{
  (e: "file-converted", value: string): void;
}>();

// Layout
const base64 = ref("");
const { files, open, onChange } = useFileDialog({ multiple: false });

onChange(async (files) => {
  if (files) {
    const file = files[0];
    const sizeInMB = file.size / (1024 * 1024);

    if (sizeInMB <= 1) {
      const fileAsBase64 = await convertToBase64(file);
      base64.value = fileAsBase64 as string;
      emits("file-converted", base64.value);
    }
  }
});

const convertToBase64 = (file: File) => {
  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB <= 1) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        resolve(null);
      };

      reader.readAsDataURL(file);
    });
  } else {
    console.log("file bigger than 1mb");
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <UButton type="button" color="violet" @click="open()">Choose file</UButton>

    <img v-if="base64" :src="base64" alt="Image Preview" />
    <p v-for="file in files" :key="file.name">
      {{ file.name }}
    </p>
  </div>
</template>
