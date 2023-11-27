<script setup lang="ts">
import type { ProductForm } from "~/types/product";

const emit = defineEmits<{
  (e: "updateProduct", productForm: ProductForm): void;
}>();
const productForm = ref<ProductForm>({
  title: "",
  description: "",
  price: "",
  image: null,
});
const submitDisabled = computed(
  () =>
    !productForm.value.title ||
    !productForm.value.description ||
    !productForm.value.price
);

function saveProduct(): void {
  emit("updateProduct", productForm.value);
}
</script>
<template>
  <form class="product-form" @submit.prevent="saveProduct">
    <UFormGroup label="Title" class="w-full p-2" required>
      <UInput v-model="productForm.title" />
    </UFormGroup>
    <UFormGroup label="Decription" class="w-full p-2" required>
      <UTextarea v-model="productForm.description" />
    </UFormGroup>
    <UFormGroup label="Price" class="w-full p-2" required>
      <UInput v-model="productForm.price" type="number" />
    </UFormGroup>
    <UFormGroup label="Image" class="w-full p-2">
      <FileInput v-model="productForm.image" />
    </UFormGroup>

    <UButton
      label="Submit"
      color="primary"
      class="w-1/3 justify-center"
      variant="outline"
      type="submit"
      :disabled="submitDisabled"
    />
  </form>
</template>

<style scoped>
.product-form {
  @apply flex flex-col justify-center items-center;
}
</style>
