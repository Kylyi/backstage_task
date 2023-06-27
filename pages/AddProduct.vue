<template>
    <div class="flex item-center justify-center min-h-screen mx-auto bg-gray-300">
        <div class="w-3/6 h-3/6 p-5 rounded-lg shadow-md my-auto bg-gray-400">
            <h1 class="text-center">Přidání obrázku</h1>
            <form class="block mt-3" >
                <label for="title">Titulek</label>
                <input  
                    v-model="form.title"
                    id="title" 
                    class="block mx-auto w-full mt-1 mb-4 rounded-md border-2" 
                    type="text">
                <label for="description">Popis</label>
                <textarea 
                    v-model="form.description"
                    id="description" 
                    class="block w-full h-20 mt-1 rounded-lg border-2"/>
                <p class="mb-4 text-right"> {{ form.description.length }}</p>

                <label for="image">Obrázek</label>
                <input
                    ref="fileInput" 
                    @change="handleFileChange"
                    id="image" 
                    class="block file:bg-white file:font-semibold file:rounded-md file:w-full file:h-20 file:border-none file:cursor-pointer w-full h-20 mb-4 rounded-md border-2" 
                    type="file"
                    accept=".jpeg, .jpg, .png, .svg" >
                <label for="price">Cena</label>
                <input v-model="form.price" id="price" class="block mt-1 mb-5 rounded-md border-2" type="number">
                <div class="flex item-center justify-center">
                    <button
                        @click="submitForm"
                        class="px-5 py-2 rounded-md bg-slate-800 text-white font-semibold">Odeslat</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    const form = ref({
        title:"",
        description:"",
        image:"",
        price: Number
    })
    const fileInput = ref()

    const handleFileChange = () =>{
        // Uložení obrázku 
        form.image.value = '// file path'
    }

    const  submitForm = async () =>{
        try{
            const validation = validateForm(form);

            if (validation !== true) {
                console.log(validation) 
            return;
            }
           const response = await $fetch('url',{
            method:'POST',
            body:{
                ...form
            }
        }) 
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

 const validateForm = (form) => {
  const errors = {};

  if (!form.title) {
    errors.name = "Název je povinný";
  }
  if (!form.description) {
    errors.description = "Popis je povinný";
  }
  if(!form.price){
    errors.price = "Cena je povinná"
  }

  return Object.keys(errors).length > 0 ? errors : true;
};
</script>