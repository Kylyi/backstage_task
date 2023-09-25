<script setup lang="ts">
import { Product } from "@prisma/client";

const isOpen = ref(false);

defineProps<{
  product: Product;
}>();

defineEmits(["deleteProduct"]);
</script>

<template>
  <div class="items-card">
    <UCard class="w-[350px] h-[400px] flex flex-col items-center relative">
      <template #header>
        <span class="absolute right-7 top-6 bg-gray-800 p-1 px-2 rounded-full"
          >{{ product.price }} $</span
        >
        <img
        :src="product.image ?? 'https://placehold.co/600x400?text=Image+Not+Found'"
        class="rounded-t-md object-cover object-center h-[220px]"
        :alt="product.title"
        />
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
      @deleteProduct="$emit('deleteProduct'), isOpen = false"
      @close="isOpen = false"
    />
  </div>
</template>
