<script setup lang="ts">
type IProps = {
  modelValue: FileList | null;
};

const props = defineProps<IProps>();
const emits = defineEmits<{
  (e: "update:modelValue", value: FileList | null): void;
}>();

// Layout
const model = useVModel(props, "modelValue", emits);
const { files, open, onChange } = useFileDialog({
  multiple: false,
  accept: ".jpg, .jpeg, .png",
});

onChange((files) => {
  const maxSize = 1024 * 1024;
  const isSizeValid = files[0].size < maxSize;
  if (!isSizeValid) {
    alert("File size is too big");
  } else {
    model.value = files;
    console.log(files);
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <UButton type="button" @click="open()">Choose image</UButton>

    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>
