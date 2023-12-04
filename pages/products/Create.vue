<script setup lang="ts">
import type { ProductForm } from "~/types/product";

const toast = useToast();
const products = useProducts();

async function onCreateProduct(product: ProductForm): Promise<void> {
  try {
    await products.createProduct(product);
    toast.add({
      title: "You have successfuly created a product",
    });
    navigateTo("/products");
  } catch (error) {
    toast.add({
      title: "There was an error creating product",
      color: "red",
    });
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
