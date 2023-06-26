<script setup lang="ts">
// 
</script>

<template>
  <div class="banner">
    <div class="text-3xl">
      <span class="font-bold">B</span>ack
      <span class="font-bold">S</span>tage
    </div>

    <NuxtLink to="/task">
      Go to task
    </NuxtLink>
    <NuxtLink to="/products">
      See products
    </NuxtLink>
  </div>
</template>

<style>
.banner {
  @apply flex flex-col gap-y-2 w-full h-full items-center justify-center;
}
</style>
