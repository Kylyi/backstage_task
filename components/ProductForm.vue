<script setup lang="ts">
import type { ProductForm } from "~/types/product";
import { required } from "@vuelidate/validators";
import type { FormError } from "@nuxthq/ui/dist/runtime/types";
import { useVuelidate } from "@vuelidate/core";

const emit = defineEmits<{
  (e: "updateProduct", productForm: ProductForm): void;
}>();

const productForm = ref<ProductForm>({
  title: "",
  description: "",
  price: "",
  image: null,
});

const rules = {
  title: { required, $message: "Title is required" },
  description: { required },
  price: { required },
};

const v$ = useVuelidate<ProductForm>(rules, productForm);
const fileSizeError = ref("");

const submitDisabled = computed(
  () =>
    !productForm.value.title ||
    !productForm.value.description ||
    !productForm.value.price ||
    fileSizeError.value
);

watch(
  () => productForm.value.image,
  (value: FileList | null): void => {
    validate(productForm.value);
  }
);

async function validate(state: ProductForm): Promise<FormError[]> {
  v$.value.$touch();
  await v$.value.$validate();
  const errors = [];
  if (!state.title) {
    errors.push({ path: "title", message: "Title is required" });
  }
  if (!state.description) {
    errors.push({ path: "description", message: "Description is required" });
  }
  if (!state.price) {
    errors.push({ path: "price", message: "Price is required" });
  }
  if (state.image?.length && state.image[0].size > 1048576) {
    errors.push({ path: "image", message: "Image size must be less than 1MB" });
    fileSizeError.value = "Image size must be less than 1MB";
  } else {
    fileSizeError.value = "";
  }
  return errors;
}

function saveProduct(): void {
  emit("updateProduct", productForm.value);
}
</script>
<template>
  <UForm
    :validate="validate"
    :state="productForm"
    class="product-form space-y-4"
    @submit.prevent="saveProduct"
  >
    <UFormGroup class="w-full" label="Title" name="title">
      <UInput v-model="productForm.title" />
    </UFormGroup>

    <UFormGroup class="w-full" label="Description" name="description">
      <UInput v-model="productForm.description" />
    </UFormGroup>

    <UFormGroup class="w-full" label="Price" name="price">
      <UInput v-model="productForm.price" type="number" />
    </UFormGroup>
    <UFormGroup
      class="w-full"
      label="Image"
      name="image"
      :error="fileSizeError"
    >
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
  </UForm>
</template>

<style scoped>
.product-form {
  @apply flex flex-col justify-center items-center;
}
</style>
