<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { ref } from 'vue';
import LoginModal from './components/modals/LoginModal.vue';
import { useAuthStore } from './stores/auth.js';
import RegisterModal from './components/modals/RegisterModal.vue';
const val = ref(false)
function sw(value) {
  val.value = value
}

const authStore = useAuthStore();
</script>

<template>

  <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-full max-w-[1440px] mb-25 px-4 ">
      <Header />
      <RouterView />
      <LoginModal :isOpen="authStore.activeModal === 'login'" @close="authStore.activeModal = null"
        @switch-to-register="authStore.activeModal = 'register'" />

     <RegisterModal :isOpen="authStore.activeModal === 'register'" @close="authStore.activeModal = null"
        @switch-to-login="authStore.activeModal = 'login'" />
    </div>
    <Footer />
  </body>

</template>

<style scoped></style>
