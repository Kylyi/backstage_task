<script setup lang="ts">
type IProps = {
  modelValue: FileList | null
  accept?: string
  maxFileSize?: number
}

const props = defineProps<IProps>()
const emits= defineEmits<{
  (e: 'update:modelValue', value: FileList | null): void
}>()

// Layout
const model = useVModel(props, 'modelValue', emits)
const { files, open, onChange, reset } = useFileDialog({ 
  accept: props.accept,
  multiple: false })

onChange(files => {
  if(!files) return
  if(props.maxFileSize && files[0].size > props.maxFileSize) {
    alert('File is too big!')
    reset()
    return
  }
  model.value = files
})

watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    reset()
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <UButton type="button" @click="open()">Choose file</UButton>
    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>