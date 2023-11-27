<script setup lang="ts">
  const {data: products, pending} = await useFetch('/api/products', {
    transform: (data) => data.map((p) => ({
      ...p,
      price: p.price.toFixed(2)
    })),
  })
</script>

<template>
  <div class="mb-4 flex justify-between">
    <NuxtLink to="/" class="inline-block px-4 py-2 text-white">&#8592; Back</NuxtLink>
    <NuxtLink to="/products/new" class="inline-block px-4 py-2 bg-white rounded-md text-gray-700">Add new</NuxtLink>
  </div>
  <div v-if="pending" class="text-xl font-bold">Loading...</div>
  <div v-else-if="!products.length" class="text-xl font-bold">No products!</div>
  <div v-else class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
    <div class="mb-4" v-for="(product, index) in products" :key="index">
      <UCard>
        <template #header>
          <div class="text-xl font-bold">
            {{ product.title }}
          </div>
        </template>

        <div class="text-center">
          <img :src="product.image || 'https://placehold.co/543x321?text=No+Image'" :alt="product.title">
        </div>

        <div class="mt-2">
          {{ product.description }}
        </div>

        <template #footer>
          <div class="text-right">{{ product.price }}</div>
        </template>
      </UCard>
    </div>
  </div>
</template>
