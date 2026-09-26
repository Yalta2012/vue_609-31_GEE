<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import CurrencyConverter from './components/CurrencyConverter.vue';
import AutoSaveNote from './components/AutoSaveNote.vue';
import CustomToggle from './components/CustomToggle.vue';
import { ref } from 'vue';
const val = ref(false)
function sw(value){
  val.value = value
}
</script>

<template>
  <!-- <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-[1080px] mb-25">

      <Header/>
    </div>
    <Footer/>
  </body> -->

  <CustomToggle v-model="val"/>
</template>

<style scoped>
</style>
