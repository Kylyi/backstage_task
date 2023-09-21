<script setup>
defineEmits(["close"]);
</script>

<template>
  <UModal >
    <div class="bg-gray-900 space-y-4 p-8 flex flex-col items-center">
      <h1 class="text-4xl text-center">Delete Product</h1>
      <h2>Are you sure you want to delete the product?</h2>
      <div class="flex justify-between w-full">
        <UButton
          @click="
            $emit('deleteProduct');
            isOpen = false;
          "
          class="w-max"
          color="red"
          variant="solid"
        >
          Delete
        </UButton>
        <UButton
          @click="$emit('close')"
          class="w-max"
          color="gray"
          variant="solid"
        >
          Cancel
        </UButton>
      </div>
    </div>
  </UModal>
</template>
