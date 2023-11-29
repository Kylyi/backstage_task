<script lang="ts" setup>
import { RequestStatus } from "~/types/request-status";

const { products, loadingStatus, setProducts } = useProducts();

if (loadingStatus.value === RequestStatus.IDLE) {
  setProducts();
}
</script>

<template>
  <div>
    <div class="text-center flex flex-col justify-center">
      <NuxtLink to="/">Back Home</NuxtLink>
      <h1>Product List</h1>
    </div>
    <div class="flex flex-wrap">
      <div
        class="sm:w-1/2 md:w-1/3 xl:w-1/4 p-3"
        v-for="product in products"
        :key="product.id"
      >
        <UCard>
          <template #header>
            <h3>{{ product.title }}</h3>
          </template>

          <div class="card-container">
            <img class="h-48" :src="product.image" :alt="product.title" />
          </div>

          <template #footer>
            <p>{{ product.description }}</p>
            <p>Price: {{ product.price }}</p>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  @apply flex flex-col justify-center items-center;
}
</style>
