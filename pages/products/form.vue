<script setup lang="ts">
interface IProduct {
  title: string;
  description: string;
  price: number;
  image: string | null;
}
const data: IProduct = reactive({
  title: "",
  description: "",
  price: 0,
  image: null,
});
const imageData = ref<FileList | null>(null);

const createProduct = async () => {
  data.price = parseFloat(data.price.toString());
  const res = await $fetch("/api/products", {
    method: "POST",
    body: data,
  });
  
  console.log(res);
  data.title = "";
  data.description = "";
  data.price = 0;
  data.image = null;
  imageData.value = null;
};
const isValidate = computed(() => {
  return data.title != "" && data.description != "" && data.price > 0;
});

watch(
  () => imageData.value,
  (value) => {
    const file = value?.[0];
    if (!file) return;
    const { base64 } = useBase64(file);
    setTimeout(() => {
        data.image = base64.value;
    }, 100);
  }
);
</script>

<template>
  <div class="flex items-center justify-center">
    <form
      @submit.prevent="createProduct"
      class="flex flex-col mt-4 p-8 border border-gray-800 rounded-md items-center"
    >
      <h1 class="mb-4">Product Form</h1>
      <div class="w-full space-y-4">
        <UFormGroup label="Title" name="title">
          <UInput
            v-model="data.title"
            placeholder="title"
            color="primary"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea
            v-model="data.description"
            placeholder="description"
            color="primary"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup label="Price $" name="price">
          <UInput
            v-model="data.price"
            type="number"
            placeholder="price"
            color="primary"
            variant="outline"
            min="0"
            step="0.1"
          />
        </UFormGroup>
        <UFormGroup label="Image (max 1 MB)" name="image">
          <FileInput
            class="w-max"
            v-model="imageData"
            :accept="'image/*'"
            :maxFileSize="1024 * 1024"
          />
        </UFormGroup>

      </div>
      <footer class="flex justify-between w-full mt-4">
        <NuxtLink to="/">
          <UButton class="" color="gray" variant="solid">Back</UButton>
        </NuxtLink>
        <UButton :disabled="!isValidate" class="w-max" type="submit">
          Submit
        </UButton>
      </footer>
    </form>
  </div>
</template>
