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
const { files, open, reset, onChange } = useFileDialog({ multiple: false });

watch(
  () => props.modelValue,
  (value: FileList | null): void => {
    if (!value) {
      reset();
    }
  }
);

onChange((files: FileList) => {
  model.value = files;
});
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <UButton variant="outline" type="button" @click="open()"
      >Choose file</UButton
    >
    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>
