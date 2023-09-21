<script setup lang="ts">
import { Product } from "@prisma/client";

const isOpen = ref(false);

defineProps<{
  product: Product;
}>();

defineEmits(["deleteProduct"]);
</script>

<template>
  <div class="block items-card">
    <UCard class="w-[350px] h-[400px] flex flex-col items-center relative">
      <template #header>
        <span class="absolute right-7 top-6 bg-gray-800 p-1 px-2 rounded-full"
          >{{ product.price }} $</span
        >

        <img
          v-if="product.image"
          :src="product.image"
          class="rounded-t-md object-cover object-center"
          :alt="product.title"
        />
        <div
          v-else
          class="rounded-md h-[100px] px-10 mt-20 flex items-center justify-center border"
        >
          No image
        </div>
        <h2 class="text-center mt-2 text-2xl">{{ product.title }}</h2>
      </template>
      <div class="h-[60px] overflow-auto mb-4">
        <p class="">{{ product.description }}</p>
      </div>

      <UButton
        @click="isOpen = true"
        class="absolute right-1 bottom-1 opacity-80"
        color="white"
        variant="solid"
        >X</UButton
      >
    </UCard>
    <ProductModal
      v-model="isOpen"
      @deleteProduct="$emit('deleteProduct')"
      @close="isOpen = false"
    />
  </div>
</template>
<style scoped>
.card {
  height: 180px;
  overflow: hidden;
}
.card :hover {
  background-color: #ebebeb;
  cursor: pointer;
}
.card-body {
  padding-right: 0.25rem;
}

.card-text {
  font: 14px;
  max-height: 80px;
  overflow: auto;
}
</style>
