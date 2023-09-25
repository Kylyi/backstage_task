<script setup lang="ts">
import { Product } from "@prisma/client";
const { data, pending} = await useFetch("/api/products") 

const products = ref<Product[]>(data);

const deleteProduct = async (id: Number) => {
  const res = await $fetch('/api/products', {
    method: "DELETE",
    body: id ,
  });
  console.log(res);
  products.value = products.value.filter((p: Product) => p.id !== id);
};
</script>

<template>
  <UCard class="h-screen p-9 flex flex-col items-center justify-center">
    <template #header>
      <h5 class="text-4xl">Products</h5>

      <NuxtLink to="/">
        <UButton
          class="absolute left-0 md:left-40 top-10"
          color="gray"
          variant="solid"
          >Back</UButton
        >
      </NuxtLink>
    </template>
    <div
      class="w-[1500px] h-[800px] bg-gray-800 p-4 overflow-auto flex flex-col items-center rounded-md"
      >
      <div v-if="pending">
        <span class="">Loading...</span>
      </div>
      <div v-else-if="products.length === 0">
        <span>No products</span>
    </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        <TransitionGroup name="items">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @deleteProduct="deleteProduct(product.id)"
          />
        </TransitionGroup>
      </div>
    </div>
  </UCard>
</template>
<style scoped>
.items-card {
  transition: all 0.5s ease-in-out;
}
.items-enter-from {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.items-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.items-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
