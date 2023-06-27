<template>
    <div class="flex item-center justify-center min-h-screen container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Product v-for="item in data" :key="item.id" :product="item"/>
        </div>
    </div>
</template>

<script setup>
const { data } = await useFetch('/api/products')
</script>

<style lang="scss" scoped>

</style>