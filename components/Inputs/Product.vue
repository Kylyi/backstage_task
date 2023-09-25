<template>
    <div class="rounded-xl bg-gray-200 m-4 shadow-lg">
        <div class="p-5 flex flex-col">
            <div>
                <img :src="product.image" :alt="product.title">
            </div>
            <h2 class="font-semibold text-2xl md:text-3xl" >{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p class="font-semibold">{{ product.price }} $</p>
        </div>
    </div>
</template>
   
<script setup>
   const props = defineProps({
    product: Object
   })
</script>