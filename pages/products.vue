<template>
  <div class="products">
    <div class="products--header">Products list</div>
    <div class="products--list" v-if="data && data.length">
      <ProductComponent
        v-for="product in data"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/products");
</script>

<style lang="scss">
.products {
  padding: 20px 100px;

  @media screen and (max-width: 820px) {
    padding: 20px;
  }

  &--header {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 70px;
    text-align: center;
  }
  &--list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 20px;
  }
}
</style>
