<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { ref } from 'vue';
const val = ref(false)
function sw(value) {
  val.value = value
}


</script>

<template>
  <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-[1440px] mb-25">
      <Header />
       <RouterView/>
    </div>
    <Footer />
  </body>

</template>

<style scoped></style>
