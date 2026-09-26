<script setup>
    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])
    function press(){
        emit('update:modelValue', !props.modelValue)
    }
</script>

<template>
    <button @click="press">{{ props.modelValue === true ? "Вкл" : "Выкл" }}</button>
</template>