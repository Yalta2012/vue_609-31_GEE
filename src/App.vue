<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const val = ref(false)
function sw(value) {
  val.value = value
}

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
</script>

<template>
  <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-[1440px] mb-25">

      <Header />
      <main class="pt-10">
        <h1 class="text-[40px] font-bold mb-5">Каталог</h1>
        <ProductList :items="items"/>
      </main>
    </div>
    <Footer />
  </body>

</template>

<style scoped></style>
