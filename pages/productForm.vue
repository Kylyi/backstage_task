<script setup lang="ts">
interface IProduct {
  title: string;
  description: string;
  price: number;
  image: FileList | null;
}
const data: IProduct = reactive({
  title: "",
  description: "",
  price: 0.0,
  image: null,
});

const createProduct = async () => {
  data.price = parseFloat(data.price);
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  console.log(result);
  data.title = "";
  data.description = "";
  data.price = 0.0;
  data.image = null;
};
const isValidate = computed(() => {
  return data.title != "" && data.description != "" && data.price > 0;
});
const handlePriceInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  if (value) {
    data.price = parseFloat(value);
  }
};
</script>

<template>
  <div class="flex items-center justify-center">
    <form
      @submit.prevent="createProduct"
      class="flex flex-col mt-4 p-8 border border-gray-800 rounded-md items-center"
    >
      <h1 class="mb-4">Product Form</h1>
      <div class="w-full space-y-4">
        <UFormGroup label="Title" name="title">
          <UInput
            v-model="data.title"
            placeholder="title"
            color="primary"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea
            v-model="data.description"
            placeholder="description"
            color="primary"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup label="Price $" name="price">
          <UInput
            v-model="data.price"
            @input="handlePriceInput"
            placeholder="price"
            color="primary"
            variant="outline"
          />
        </UFormGroup>
        <!-- <UFormGroup label="Image" name="image">
        <FileInput class="w-max" v-model="data.image" />
      </UFormGroup> -->
      </div>
      <footer class="flex justify-between w-full mt-4">
        <NuxtLink to="/">
          <UButton class="" color="gray" variant="solid">Back</UButton>
        </NuxtLink>
        <UButton :disabled="!isValidate" class="w-max" type="submit">
          Submit
        </UButton>
      </footer>
    </form>
  </div>
</template>
