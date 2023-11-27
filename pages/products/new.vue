<script setup lang="ts">
  import {validate} from "~/lib/validation";

  const router = useRouter()
  const product = reactive<ProductDTO>({
    title: '',
    description: '',
    image: '',
    price: '',
  });

  const image = ref('')

  const errors = ref([])

  const clearErrors = (path: string) => {
    errors.value = errors.value.filter(e => e.path !== path && e.path !== 'server')
  }

  async function onSubmit() {
    const validationErrors = validate(product)
    if (validationErrors.length) {
      errors.value = validationErrors
      return
    }

    const {error} = await useFetch('/api/products', {
      method: 'POST',
      body: product
    })

    if (error.value) {
      errors.value.push({path: 'server', message: error.value.data.statusMessage})
      return
    }

    router.push({ path: "/products" })
  }

  const uploadImage = (e) => {

    const image = e.target.files[0];
    if (image.size / 1024 / 1024 > 1) {
      alert('Image size should be less than 1MB')
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      image.value = e.target.result;
      product.image = image.value;
    };
  }
</script>

<template>

  <div class="flex items-center justify-center min-w-80">
    <div>
      <NuxtLink to="/products" class="inline-block px-4 py-2 text-white">&#8592; Back</NuxtLink>
      <p v-if="errors.find(e => e.path === 'server')" class="text-red-400">{{errors.find(e => e.path === 'server').message}}</p>
    <!-- TODO: Nuxtui package that is used here is deprecated, so docs validation doesn't work. Built a workaround -->
    <UForm :validate="validate" :state="product" class="space-y-4 w-96" @submit.stop.prevent="onSubmit">
      <UInput placeholder="Title" v-model="product.title" size="xl" @focus="clearErrors('title')"/>
      <p v-if="errors.find(e => e.path === 'title')" class="text-red-400">{{errors.find(e => e.path === 'title').message}}</p>
      <UTextarea placeholder="Description" v-model="product.description" size="xl" @focus="clearErrors('description')"/>
      <p v-if="errors.find(e => e.path === 'description')" class="text-red-400">{{errors.find(e => e.path === 'description').message}}</p>
      <UInput placeholder="Price" v-model="product.price" size="xl" @focus="clearErrors('price')"/>
      <p v-if="errors.find(e => e.path === 'price')" class="text-red-400">{{errors.find(e => e.path === 'price').message}}</p>
      <UInput placeholder="Image URL" v-model="product.image" size="xl" @focus="clearErrors('image')"/>
      <div>or</div>
      <input placeholder="Image URL" @focus="clearErrors('imageFile')" @change="uploadImage($event)" type="file" accept="image/*"/>
      <p v-if="errors.find(e => e.path === 'image')" class="text-red-400">{{errors.find(e => e.path === 'image').message}}</p>

      <div class="flex items-center justify-end">
        <UButton type="submit">
          Submit
        </UButton>
      </div>
    </UForm>
    </div>
  </div>
</template>
