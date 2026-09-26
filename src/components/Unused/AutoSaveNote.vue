<script setup>
import { reactive, watch, ref } from 'vue';


const note = reactive({title:"",content:""})
const saveStatus = ref("Все изменения сохранены")


const watcher = watch(note, (oldValue, newValue)=>{
    saveStatus.value = 'Сохранение...';
    console.log(newValue);
    setTimeout(() => {
        saveStatus.value = "Все изменения сохранены";
    }, 2000)
}, {deep:true})
</script>

<template>
    <div >
        <p>Статус: {{saveStatus }}</p>
        <input v-model="note.title" type="text" name="" id="" style="border-color: black; border-width: 1px;">
        <textarea v-model="note.content" style="border-color: black;border-width: 1px;"></textarea>
    </div>
</template>