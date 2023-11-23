<template>
  <div class="add-product">
    <div class="add-product--header">Add product</div>

    <form class="add-product--form">
      <div class="add-product--form__item add-product--form__item--file">
        <file-input @file-converted="onFileConverted"></file-input>
      </div>
      <div class="add-product--form__item">
        <label for="title">Title:</label>
        <UInput v-model="title" />
      </div>
      <div class="add-product--form__item">
        <label for="description">Description:</label>
        <UTextarea v-model="description" />
      </div>
      <div class="add-product--form__item">
        <label for="price">Price:</label>
        <UInput v-model="price" type="number" />
      </div>
      <div class="add-product--form__item">
        <UButton
          type="button"
          color="primary"
          variant="solid"
          @click="addProduct"
          >Add Product</UButton
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
let title = "";
let description = "";
let price = 0;
let base64 = "";

const onFileConverted = (event: string) => {
  base64 = event;
};

const addProduct = async () => {
  if (!title || !description || !price || !base64) {
    console.log("All fields required");
    return;
  }
  const request = {
    title,
    description,
    price,
    base64,
  };
  // request for api
  console.log("request", request);
};
</script>

<style lang="scss" scoped>
.add-product {
  padding: 20px 100px;
  max-width: 800px;
  margin: 0 auto;

  @media screen and (max-width: 820px) {
    padding: 20px;
  }

  &--header {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 70px;
    text-align: center;
  }

  &--form {
    &__item {
      margin-top: 30px;

      &--file {
        max-width: 100px;
      }
    }
  }
}
</style>
