<script setup lang="ts">
import type { ProductForm } from "~/types/product";

const router = useRouter();
const toast = useToast();

async function onCreateProduct(product: ProductForm): Promise<void> {
  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("price", product.price.toString());
  if (product.image?.length) {
    formData.append("image", product.image[0]);
  }

  const { error } = await useFetch("http://localhost:3000/api/products", {
    method: "POST",
    body: formData,
  });
  if (error.value) {
    toast.add({
      title: "There was an error creating product",
      color: "red",
    });
  } else {
    toast.add({
      title: "You have successfuly created a product",
    });
    router.push("/products");
  }
}
</script>
<template>
  <div class="create-product">
    <div class="text-center flex flex-col justify-center">
      <NuxtLink to="/">Back Home</NuxtLink>
      <h1>Create Product</h1>
    </div>
    <ProductForm
      class="md:w-1/2 lg:w-1/3"
      @update-product="onCreateProduct"
    ></ProductForm>
  </div>
</template>

<style scoped>
.create-product {
  @apply w-full h-full flex flex-col justify-center items-center;
}
</style>
