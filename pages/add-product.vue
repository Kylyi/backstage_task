<template>
    <div class="container pt-4 md:pt-10">
        <main class="flex justify-center align-center flex-wrap gap-5 md:gap-10 pb-4 md:pb-10">
            <form @submit.prevent="submitForm" class="flex flex-col gap-4 w-80">
                <UFormGroup v-for="(value, key, index) in product" :key="`product-form-input-${index}`" :name="key" :label="capitalizeFirstLetter(key)">
                    <UInput label="Title" :placeholder="`Fill in your product ${key} here`" v-model="product[key]"></UInput>
                </UFormGroup>
                <UButton class="w-32 mt-4" block :loading="submitButtonLoading" label="Add Product" type="submit" />
            </form>
        </main>
    </div>
</template>

<script setup lang="ts">

type Product = {
  title: string,
  description: string,
  image: string,
  price: string | number,
}

const product = ref<Product>({
  title: '',
  description: '',
  image: '',
  price: '',
});

let submitButtonLoading = ref(false)

const submitForm = async (): Promise<void> => {
  // Handle the form submission logic here
  submitButtonLoading.value = true
  product.value.price = Number(product.value.price).toFixed(2)
  await setTimeout(() => {
    console.log(product.value);
    submitButtonLoading.value = false
  }, 100);
};

const capitalizeFirstLetter = (input: string): string => {
    return input.replace(/^\w/, char => char.toUpperCase())
}
</script>

<style>
.container {
  @apply max-w-1440 px-4 md:px-10 m-auto;
}
</style>