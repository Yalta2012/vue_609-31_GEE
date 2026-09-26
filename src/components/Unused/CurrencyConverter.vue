<script setup>
import { ref, computed } from 'vue'

const rate = 84.15
const rubles = ref(0)
const dollars = computed(()=>{
  return rubles.value/rate
})

</script>

<template>
  <div>
    <input v-model="rubles" type="number">
    <p>={{ dollars }}$</p>
    <p>type:{{typeof( rubles) }}</p>
  </div>
</template>