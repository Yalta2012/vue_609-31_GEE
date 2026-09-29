<script setup>
import VProduct from './VProduct.vue';
import axios from 'axios';

import { ref, onMounted } from 'vue';
const items = ref([]);
const fetchItems = async () => {
  try{
    const { data } = await axios.get(
      "https://47277a7b1760e158.mokky.dev/items"
    );
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false
    })

    );
  }
  catch(e){
    console.log(e)
  }
};

onMounted(async() =>{
  await fetchItems();
});

const searchQuery = ref("")
const sortBy = ref("default")

const filteredProducts = computed(() =>{
    let result = [...items.value];
    
    if(searchQuery.value.trim() !== ""){
        const query = searchQuery.value.toLowerCase();
        result = result.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
    }

    switch(sortBy.value){
        case "price-asc":
            result.sort((a,b) => a.price - b.price);
            break;
        case "price-desc":
            result.sort((a,b) => b.price - a.price);
            break;
        case "name-asc":
            result.sort((a,b)=>
            a.title.localeCompare(b.title, ["ru", "en"], {
                sensitivity: "base",
            }));
            break;
            

    }
    if(sortBy.value === "price-asc"){
    } else if (sortBy.value === "price-desc"){
    } else if (sortBy.value === )
}

);
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-[40px] font-bold mb-5">Каталог</h1>
        <div class="flex items-center gap-3 mb-4">
            <div 
                class="flex items-center border px-3 gap-2 bg-wite border-grat-500/30 h-[52px] rounded-md">
                <svg>ИКОНКА</svg>
                <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск товаров"
                class="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm">
                <button
                    v-if="searchQuery"
                    class="cursor-pointer"
                    @click="searchQuery"
                    &items
                >
                </button>
            </div>
            <select v-model="sortBy" 
            class="flex items-center border pl-3 gap-2 bg-white border-gray-500/30 h-[52px]">
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевые</option>
                <option value="price-desc">Сначала лорогие</option>
                <option value="name-asc">Название (А-Я)</option>
                <option value="desc">Название (Я-А)</option>
            </select>
        </div>

    </div>
    <main class="pt-10">
        <div class="grid grid-cols-5 gap-5">
        <v-product
            v-for="item in items"
            :key="item.id"
            :img-url="item.imageUrl"
            :title="item.title"
            :price="item.price.toLocaleString('ru-Ru')"
            ></v-product>
        </div>
    </main>
</template>